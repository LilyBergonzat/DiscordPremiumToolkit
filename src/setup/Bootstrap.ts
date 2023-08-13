import { Client, Events } from 'discord.js';
import type { APIEntitlement } from '#structures/Entitlement';
import { REST } from '@discordjs/rest';
import Logger from '@lilywonhalf/pretty-logger';
import { ClientApplicationEntitlementManager } from '#structures/managers/ClientApplicationEntitlementManager';
import { Entitlement } from '#structures/Entitlement';
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
        const entitlements: Array<Entitlement> = [];
        const entitlementsData = await rest.get(
            Routes.applicationEntitlements(this.client.user!.id)
        ).catch(console.error);

        if (Array.isArray(entitlementsData)) {
            Logger.info(`${entitlementsData.length} entitlements found.`);

            entitlementsData.forEach((entitlementData: APIEntitlement) => {
                entitlements.push(new Entitlement(this.client, entitlementData))
            });
        }

        this.client.application!.entitlements = new ClientApplicationEntitlementManager(this.client, entitlements);
    }
}
