import type { Client } from 'discord.js';
import type Listener from '../Listener';
import { Entitlement } from '#structures/Entitlement';
import type { APIEntitlement } from '#structures/Entitlement';
import { Events } from 'discord.js';

export default class Raw implements Listener {
    public run(client: Client, data: any): void {
        switch (data.t) {
            case 'ENTITLEMENT_CREATE':
                client.emit(Events.EntitlementCreate, new Entitlement(client, data.d as APIEntitlement));
                break;

            case 'ENTITLEMENT_UPDATE':
                client.emit(Events.EntitlementUpdate, new Entitlement(client, data.d as APIEntitlement));
                break;

            case 'ENTITLEMENT_DELETE':
                client.emit(Events.EntitlementDelete, new Entitlement(client, data.d as APIEntitlement));
                break;
        }
    }
}
