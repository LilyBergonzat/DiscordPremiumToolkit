"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replyWithPremiumCTA = exports.setupDiscordPremiumKit = void 0;
const Bootstrap_1 = require("#root/setup/Bootstrap");
function setupDiscordPremiumKit(data) {
    new Bootstrap_1.Bootstrap(data);
}
exports.setupDiscordPremiumKit = setupDiscordPremiumKit;
async function replyWithPremiumCTA(interaction) {
    await interaction.client.rest.post(Routes.interactionCallback(interaction.id, interaction.token), {
        body: {
            type: 10,
            data: {},
        },
        auth: false,
    });
}
exports.replyWithPremiumCTA = replyWithPremiumCTA;
//# sourceMappingURL=index.js.map