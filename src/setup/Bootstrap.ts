import { Client, Events } from 'discord.js';
import { REST } from '@discordjs/rest';
import Logger from '@lilywonhalf/pretty-logger';
import { ClientApplicationEntitlementManager } from '#structures/managers/ClientApplicationEntitlementManager';
import { Routes } from '#structures/Routes';
import Raw from '#structures/listeners/Raw';
import EntitlementCreate from '#structures/listeners/EntitlementCreate';
import EntitlementUpdate from '#structures/listeners/EntitlementUpdate';
import EntitlementDelete from '#structures/listeners/EntitlementDelete';

export type BootstrapOptions = {
    client: Client;
    botToken: string;
};

export class Bootstrap {
    private static instance: Bootstrap;

    private readonly client!: Client;
    private readonly botToken!: string;

    public constructor({ client, botToken }: BootstrapOptions) {
        if (Bootstrap.instance) {
            return Bootstrap.instance;
        }

        this.client = client;
        this.botToken = botToken;

        Bootstrap.instance = this;

        this.bindEvents();
        this.fetchEntitlements().catch(Logger.exception);
    }

    private bindEvents() {
        this.client.on(Events.Raw, new Raw().run);
        this.client.on(Events.EntitlementCreate, new EntitlementCreate().run);
        this.client.on(Events.EntitlementUpdate, new EntitlementUpdate().run);
        this.client.on(Events.EntitlementDelete, new EntitlementDelete().run);
    }

    private async fetchEntitlements() {
        const rest = new REST({ version: '10' }).setToken(this.botToken);
        const entitlementsData = await rest.get(
            Routes.applicationEntitlements(this.client.user!.id)
        ).catch(console.error);

        this.client.application!.entitlements = new ClientApplicationEntitlementManager(
            this.client,
            Array.isArray(entitlementsData) ? entitlementsData : []
        );
    }
}
