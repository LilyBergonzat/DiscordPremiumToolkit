import type Listener from '../Listener';
import type { Entitlement } from '#structures/Entitlement';

export default class EntitlementCreate implements Listener {
    public run(entitlement: Entitlement): void {
        entitlement.client.application?.entitlements.add(entitlement);
    }
}
