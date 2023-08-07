import type { Snowflake } from 'discord.js';
import { Collection } from 'discord.js';
import type { Entitlement } from '#structures/Entitlement';

export class EntitlementManager extends Collection<Snowflake, Entitlement> {
    public set(key: Snowflake, entitlement: Entitlement): this {
        return super.set(key, entitlement);
    }

    public getByUserId(userId: Snowflake): Entitlement | undefined {
        return this.find(entitlement => entitlement.userId === userId);
    }

    public getByGuildId(guildId: Snowflake): Entitlement | undefined {
        return this.find(entitlement => entitlement.guildId === guildId);
    }

    public isGuildSubscribed(guildId: Snowflake): boolean {
        const entitlement = this.getByGuildId(guildId);
        const exists = !!entitlement;
        const deleted = exists && entitlement.deleted;
        const over = exists && !!entitlement.endsAt && entitlement.endsAt.getTime() <= Date.now();

        return exists && !deleted && !over;
    }
}
