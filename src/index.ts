import { Bootstrap } from '#root/setup/Bootstrap';
import type { BootstrapOptions } from '#root/setup/Bootstrap';
import { Routes } from '#structures/Routes';
import type { ChatInputCommandInteraction, ContextMenuCommandInteraction } from 'discord.js';
import { ClientApplicationEntitlementManager } from '#structures/managers/ClientApplicationEntitlementManager';

export { BootstrapOptions };
export { Routes };

export function setupDiscordPremiumToolkit(data: BootstrapOptions) {
    new Bootstrap(data);
}

export async function replyWithPremiumCTA(interaction: ChatInputCommandInteraction | ContextMenuCommandInteraction) {
    await interaction.client.rest.post(Routes.interactionCallback(interaction.id, interaction.token), {
        body: {
            type: 10,
            data: {},
        },
        auth: false,
    });
}

declare module 'discord.js' {
    export interface ClientApplication {
        entitlements: ClientApplicationEntitlementManager;
    }

    export enum Events {
        EntitlementCreate = 'entitlementCreate',
        EntitlementUpdate = 'entitlementUpdate',
        EntitlementDelete = 'entitlementDelete'
    }
}
