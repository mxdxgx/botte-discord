import { REST, Routes } from 'discord.js';
import { Command } from './command';

export class RegisterCommands {
    private commands: Command[];

    private rest: REST;

    constructor() {
        this.rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
        this.commands = [
            {
                name: 'ping',
                description: 'Replies with Pong!',
            },
        ];
    }

    public registerCommands() {
        try {
            console.log('Started refreshing application (/) commands.');
            this.rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: this.commands }).then(() => {
                console.log('Successfully reloaded application (/) commands.');
            });
        } catch (error) {
            console.error(error);
        }
    }
}