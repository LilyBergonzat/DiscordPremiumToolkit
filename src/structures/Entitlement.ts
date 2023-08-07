import type { Snowflake, APIEntitlement } from 'discord.js';

export class Entitlement {
    id: Snowflake;
    skuId: Snowflake;
    applicationId: Snowflake;
    userId: Snowflake;
    promotionId?: Snowflake;
    type: number;
    deleted: boolean;
    giftCodeFlags: number;
    consumed: boolean;
    startsAt?: Date;
    endsAt?: Date;
    guildId: Snowflake;
    subscriptionId?: Snowflake;

    constructor(data: APIEntitlement) {
        this.id = data.id;
        this.skuId = data.sku_id;
        this.applicationId = data.application_id;
        this.userId = data.user_id;
        this.promotionId = data.promotion_id;
        this.type = data.type;
        this.deleted = data.deleted;
        this.giftCodeFlags = data.gift_code_flags;
        this.consumed = data.consumed;
        this.startsAt = data.starts_at ? new Date(data.starts_at) : undefined;
        this.endsAt = data.ends_at ? new Date(data.ends_at) : undefined;
        this.guildId = data.guild_id;
        this.subscriptionId = data.subscription_id;
    }
}

declare module 'discord.js' {
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
}
