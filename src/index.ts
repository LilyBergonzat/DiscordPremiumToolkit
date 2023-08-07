import { Bootstrap, BootstrapOptions } from '#root/setup/Bootstrap';
import { Routes } from 'discord.js';
import type { ChatInputCommandInteraction, ContextMenuCommandInteraction } from 'discord.js';
import { EntitlementManager } from '#structures/managers/EntitlementManager';

export function setupDiscordPremiumKit(data: BootstrapOptions) {
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
    export interface Client {
        entitlements: EntitlementManager;
    }
}
