import { Client, GatewayIntentBits, Events } from 'discord.js';
export class DiscordClient {
    client: Client;
    constructor(token: string, clientReadyHandler?: (client: Client) => void) {
        this.client = new Client({ intents: [GatewayIntentBits.Guilds] });
        this.client.login(token);
        this.client.once(Events.ClientReady, clientReadyHandler || (() => { }));
    }
}