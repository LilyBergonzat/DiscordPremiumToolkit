# Discord Premium Toolkit

## Usage

When one of your Discord bots is public, it can also become paid, have premium features directly integrated into Discord. If you have a bot that has premium features, handling the data of who subscribed for what and what guild should have which level of features can be tricky.

Discord Premium Toolkit is there to make all of that a bit simpler. Just add the dependency to your bot project, and as soon as you get the "ready" event from the client, call the setupDiscordPremiumToolkit function as such:
```ts
setupDiscordPremiumToolkit({ client, botToken });
```
`client` is the instance of the Discord client, and `botToken` is the token of your bot.

DPT will then create an `entitlements` key in `client` to help you manage everything. Then, anywhere in your code, you can call `client.entitlements.isGuildSubscribed(guildId)` or `client.entitlements.isUserSubscribed(userId)`. Those methods return a boolean, making it very easy to handle different cases.

DPT also exposes a function called `replyWithPremiumCTA`. Again, it should be pretty straightforward to use. If the user triggers an interaction that should only be possible by subscribing to the premium version of the bot and they did *not* subscribe, you can simply call `replyWithPremiumCTA(interaction)`, `interaction` being the interaction object in question. The bot will then reply to the interaction with a call-to-action inviting the user to subscribe to the premium version of the bot if they want to perform that action.

## Installation

`npm install --save discordpremiumtoolkit`
