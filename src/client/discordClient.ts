import { Client, Events, GatewayIntentBits } from 'discord.js';
import { CommandBase } from '../commands/commandBase';
import { RegisterCommands } from '../commands/register';
import { InteractionEventHandler } from '../events/interaction/interaction.event';

export class DiscordClient {

    handlers: any[];
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

        this.handlers = [new InteractionEventHandler(this)]
    }
}