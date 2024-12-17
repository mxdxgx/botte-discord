import { REST, Routes } from 'discord.js';
import { CommandBase } from './commandBase';
import { PingCommand } from './ping.command';

export class RegisterCommands {
    private commands: Map<string, CommandBase> = new Map();
    private rest: REST;

    constructor() {
        this.rest = new REST().setToken(process.env.DISCORD_TOKEN);
        this.commands.set('ping', new PingCommand('ping', 'Replies with Pong!'));
    }

    public async registerCommands() {
        try {
            console.log('Started refreshing application (/) commands.');
            this.rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: Array.from(this.commands.values()) }).then(() => {
                console.log('Successfully reloaded application (/) commands.');
            });
        } catch (error) {
            console.error(error);
        }
    }

    public getCommandsMap(): Map<string, CommandBase> {
        return this.commands;
    }
}
