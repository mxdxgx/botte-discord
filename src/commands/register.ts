import { REST, Routes } from 'discord.js';
import { CommandBase } from './commandBase';
import { PingCommand } from './ping.command';

/**
 * Class responsible for registering and managing Discord commands.
 */
export class RegisterCommands {
    private commands: Map<string, CommandBase> = new Map();
    private rest: REST;

    /**
     * Initializes a new instance of the RegisterCommands class.
     * Sets up the REST client with the Discord token and registers the initial commands.
     */
    constructor() {
        this.rest = new REST().setToken(process.env.DISCORD_TOKEN);
        this.commands.set('ping', new PingCommand('ping', 'Replies with Pong!'));
    }

    /**
     * Registers the commands with the Discord API.
     * Logs the start and success of the registration process.
     * 
     * @returns {Promise<void>} A promise that resolves when the commands have been registered.
     */
    public async registerCommands(): Promise<void> {
        console.log('Started refreshing application (/) commands.');
        this.rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: Array.from(this.commands.values()) }).then(() => {
            console.log('Successfully reloaded application (/) commands.');
        });
    }

    /**
     * Retrieves the map of registered commands.
     * 
     * @returns {Map<string, CommandBase>} A map of command names to command instances.
     */
    public getCommandsMap(): Map<string, CommandBase> {
        return this.commands;
    }
}
