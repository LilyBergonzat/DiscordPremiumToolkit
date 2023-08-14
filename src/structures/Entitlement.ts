import type { Snowflake, Client } from 'discord.js';

export class Entitlement {
    id: Snowflake;
    client: Client;
    skuId!: Snowflake;
    applicationId!: Snowflake;
    userId!: Snowflake;
    promotionId?: Snowflake;
    type!: number;
    deleted!: boolean;
    giftCodeFlags!: number;
    consumed!: boolean;
    startsAt?: Date;
    endsAt?: Date;
    guildId?: Snowflake;
    subscriptionId?: Snowflake;

    constructor(client: Client, data: APIEntitlement) {
        this.id = data.id;
        this.client = client;

        this._patch(data);
    }

    protected _patch(data: APIEntitlement) {
        if ('sku_id' in data) {
            this.skuId = data.sku_id;
        }

        if ('application_id' in data) {
            this.applicationId = data.application_id;
        }

        if ('user_id' in data) {
            this.userId = data.user_id;
        }

        if ('promotion_id' in data) {
            this.promotionId = data.promotion_id;
        }

        if ('type' in data) {
            this.type = data.type;
        }

        if ('deleted' in data) {
            this.deleted = data.deleted;
        }

        if ('gift_code_flags' in data) {
            this.giftCodeFlags = data.gift_code_flags;
        }

        if ('consumed' in data) {
            this.consumed = data.consumed;
        }

        if ('guild_id' in data) {
            this.guildId = data.guild_id;
        }

        if ('subscription_id' in data) {
            this.subscriptionId = data.subscription_id;
        }

        if ('starts_at' in data) {
            this.startsAt = data.starts_at ? new Date(data.starts_at) : undefined;
        }

        if ('ends_at' in data) {
            this.endsAt = data.ends_at ? new Date(data.ends_at) : undefined;
        }
    }
}

export interface APIEntitlement {
    id: Snowflake;
    sku_id: Snowflake;
    application_id: Snowflake;
    user_id: Snowflake;
    promotion_id?: Snowflake;
    type: number;
    deleted: boolean;
    gift_code_flags: number;
    consumed: boolean;
    starts_at?: string;
    ends_at?: string;
    guild_id: Snowflake;
    subscription_id?: Snowflake;
}
