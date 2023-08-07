import type { APIEntitlement, Client } from 'discord.js';
import type Listener from '../Listener';
import EntitlementCreate from '#structures/listeners/EntitlementCreate';
import { Entitlement } from '#structures/Entitlement';
import EntitlementDelete from '#structures/listeners/EntitlementDelete';

export default class Raw implements Listener {
    public run(client: Client, data: any): void {
        switch (data.t) {
            case 'ENTITLEMENT_CREATE':
            case 'ENTITLEMENT_UPDATE':
                new EntitlementCreate().run(client, new Entitlement(data.d as APIEntitlement));
                break;

            case 'ENTITLEMENT_DELETE':
                new EntitlementDelete().run(client, new Entitlement(data.d as APIEntitlement));
                break;
        }
    }
}
