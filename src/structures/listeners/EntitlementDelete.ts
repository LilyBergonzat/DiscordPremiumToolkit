import type Listener from '../Listener';
import type { Entitlement } from '#structures/Entitlement';

export default class EntitlementDelete implements Listener {
    public run(entitlement: Entitlement): void {
        entitlement.client.application?.entitlements.remove(entitlement.id);
    }
}
