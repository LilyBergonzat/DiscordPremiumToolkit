import { Routes as DJSRoutes } from 'discord.js'
import type { Snowflake } from 'discord.js'

export const Routes: typeof DJSRoutes & {
    applicationEntitlements(applicationId: Snowflake): `/applications/${string}/entitlements`;
    applicationEntitlement(applicationId: Snowflake, entitlementId: Snowflake): `/applications/${string}/entitlements/${string}`;
} = {
    ...DJSRoutes,
    applicationEntitlements: (applicationId: Snowflake) => `/applications/${applicationId}/entitlements`,
    applicationEntitlement: (applicationId: Snowflake, entitlementId: Snowflake) => `/applications/${applicationId}/entitlements/${entitlementId}`,
}
