import { Events as DJSEvents } from 'discord.js'

export const Events = {
    ...DJSEvents,
    EntitlementCreate: 'entitlementCreate',
    EntitlementUpdate: 'entitlementUpdate',
    EntitlementDelete: 'entitlementDelete',
}
