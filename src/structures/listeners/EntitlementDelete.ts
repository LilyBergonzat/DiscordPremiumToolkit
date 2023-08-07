import type { Client } from 'discord.js';
import type Listener from '../Listener';
import type { Entitlement } from '#structures/Entitlement';

export default class EntitlementDelete implements Listener {
    public run(client: Client, entitlement: Entitlement): void {
        client.entitlements.delete(entitlement.id);
    }
}
