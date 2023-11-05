import type { Snowflake, Client, BaseFetchOptions } from 'discord.js';
import { CachedManager } from 'discord.js';
import type { APIEntitlement } from '#structures/Entitlement';
import { Entitlement } from '#structures/Entitlement';
import { Collection } from '@discordjs/collection';
import { Routes } from '#structures/Routes';

export class ClientApplicationEntitlementManager
    extends CachedManager<Snowflake, Entitlement, EntitlementResolvable>
{
    constructor(client: Client, iterable?: Iterable<Entitlement>) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore Type declaration error with lib, waiting for deployment
        super(client, Entitlement, iterable);
    }

    public async fetch(options?: { entitlement: EntitlementResolvable } & FetchEntitlementOptions) {
        const { entitlement, cache, force } = options ?? { entitlement: null, cache: true, force: false };
        const entitlementId = entitlement ? this.resolveId(entitlement ?? options) : null;

        return entitlementId
            ? this.fetchSingle({ entitlementId, cache, force })
            : this.fetchMany({ cache, force });
    }

    public getByUserId(userId: Snowflake): Collection<Snowflake, Entitlement> {
        return this.cache.filter((entitlement: Entitlement) => entitlement.userId === userId);
    }

    public getByGuildId(guildId: Snowflake): Collection<Snowflake, Entitlement> {
        return this.cache.filter((entitlement: Entitlement) => entitlement.guildId === guildId);
    }

    public getValidEntitlementByUserId(userId: Snowflake): Entitlement | undefined {
        return this.getByUserId(userId).find(this.isEntitlementValid);
    }

    public getValidEntitlementByGuildId(guildId: Snowflake): Entitlement | undefined {
        return this.getByGuildId(guildId).find(this.isEntitlementValid);
    }

    public isUserSubscribed(userId: Snowflake): boolean {
        return !!this.getValidEntitlementByUserId(userId);
    }

    public isGuildSubscribed(guildId: Snowflake): boolean {
        return !!this.getValidEntitlementByGuildId(guildId);
    }

    public add(entitlement: Entitlement) {
        this['_add'](entitlement);

        return this;
    }

    public remove(entitlement: EntitlementResolvable) {
        this.cache.delete(this.resolveId(entitlement));

        return this;
    }

    private isEntitlementValid(entitlement?: Entitlement): boolean {
        const exists = !!entitlement;
        const deleted = exists && entitlement.deleted;
        const over = exists && !!entitlement.endsAt && entitlement.endsAt.getTime() <= Date.now();

        return exists && !deleted && !over;
    }

    private async fetchSingle(
        { entitlementId, cache, force = false }: { entitlementId: Snowflake } & FetchEntitlementOptions
    ) {
        if (!force) {
            const existing = this.cache.get(entitlementId);

            if (existing) {
                return existing;
            }
        }

        const data = await this.client.rest.get(Routes.applicationEntitlement(this.client.user!.id, entitlementId));

        return this['_add'](data, cache);
    }

    private async fetchMany(options: FetchEntitlementOptions) {
        const data = await this.client.rest.get(
            Routes.applicationEntitlements(this.client.user!.id)
        ) as Array<APIEntitlement>;

        return data.reduce((collection: Collection<Snowflake, Entitlement>, datum: APIEntitlement) => {
            collection.set(datum.id, this['_add'](new Entitlement(this.client, datum), options.cache));

            return collection;
        }, new Collection<Snowflake, Entitlement>());
    }
}

export type EntitlementResolvable = Entitlement | Snowflake;
export type FetchEntitlementOptions = BaseFetchOptions;
