import { Client, Events, GatewayIntentBits } from 'discord.js';
export class DiscordClient {
    client: Client;
    constructor(token: string, clientReadyHandler?: (client: Client) => void) {

        this.client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildInvites,

            ]
        });
        this.client.login(token);
        this.client.once(Events.ClientReady, clientReadyHandler || (() => { }));
        this.client.on(Events.InteractionCreate, async interaction => {
            if (!interaction.isChatInputCommand()) return;

            if (interaction.commandName === 'ping') {
                await interaction.reply('Pong!');
            }
        });
    }
}