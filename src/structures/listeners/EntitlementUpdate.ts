import type Listener from '../Listener';
import type { Entitlement } from '#structures/Entitlement';
import Logger from '@lilywonhalf/pretty-logger';

export default class EntitlementCreate implements Listener {
    public run(entitlement: Entitlement): void {
        const { id, guildId, client } = entitlement;
        const guild = client.guilds.cache.get(guildId);

        Logger.info(`Received entitlement ${id} for ${guildId} (${guild?.name ?? 'Unknown guild'})`);
        client.application?.entitlements.add(entitlement);
    }
}
