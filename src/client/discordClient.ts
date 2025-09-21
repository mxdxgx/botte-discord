import { Client, Events, GatewayIntentBits } from 'discord.js';
import { CommandBase } from '../commands/commandBase';
import { RegisterCommands } from '../commands/register';
import { InteractionEventHandler } from '../events/interaction/interaction.event';

/**
 * The `DiscordClient` class is responsible for initializing the Discord client and registering event handlers.
 * 
 * @remarks
 * This class performs the following actions during initialization:
 * 1. Initializes a new Discord client with the provided token and commands.
 * 2. Registers event handlers for interactions.
 * 
 * @example
 * ```typescript
 * const client = new DiscordClient(token, commands);
 * ```
 */
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