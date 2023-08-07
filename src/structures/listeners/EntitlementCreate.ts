import type { Client } from 'discord.js';
import type Listener from '../Listener';
import type { Entitlement } from '#structures/Entitlement';
import Logger from '@lilywonhalf/pretty-logger';

export default class EntitlementCreate implements Listener {
    public run(client: Client, entitlement: Entitlement): void {
        const { id, guildId } = entitlement;
        const guild = client.guilds.cache.get(guildId);

        Logger.info(`Received entitlement ${id} for ${guildId} (${guild?.name ?? 'Unknown guild'})`);
        client.entitlements.set(entitlement.id, entitlement);
    }
}