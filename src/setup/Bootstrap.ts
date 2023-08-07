import { Client } from 'discord.js';
import type { APIEntitlement } from 'discord.js';
import { REST } from '@discordjs/rest';
import Logger from '@lilywonhalf/pretty-logger';
import { EntitlementManager } from '#structures/managers/EntitlementManager';
import { Entitlement } from '#structures/Entitlement';
import Raw from '#structures/listeners/Raw';

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
        this.client.on('raw', new Raw().run);
    }

    private async fetchEntitlements() {
        const rest = new REST({ version: '10' }).setToken(this.botToken);

        this.client.entitlements = new EntitlementManager();

        rest.get(`/applications/${this.client.user!.id}/entitlements`)
            .then((data: unknown) => {
                if (Array.isArray(data)) {
                    Logger.info(`${data.length} entitlements found.`);

                    data.forEach((entitlementData: APIEntitlement) => {
                        this.client.entitlements.set(entitlementData.id, new Entitlement(entitlementData))
                    });
                }
            }).catch(console.error);
    }
}
