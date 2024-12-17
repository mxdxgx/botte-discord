import { Client, Events, GatewayIntentBits } from 'discord.js';
import { CommandBase } from '../commands/commandBase';
import { RegisterCommands } from '../commands/register';

export class DiscordClient {
    commands: Map<string, CommandBase> = new Map();
    client: Client;
    constructor(token: string, commands: RegisterCommands, clientReadyHandler?: (client: Client) => void) {

        this.commands = commands.getCommandsMap();
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
        // @todo extract the events handling to a separate class
        this.client.on(Events.InteractionCreate, interaction => {
            console.log('InteractionCreate event received:', interaction);
            if (!interaction.isCommand()) return;
            this.commands.get(interaction.commandName).execute(interaction);
        });
    }
}