import { Client } from "discord.js";
import { RegisterCommands } from "../../commands/register";
import { DiscordClient } from "../discordClient";

export class Start {
    client: DiscordClient;
    constructor() {
        require('dotenv').config();
        const commands = new RegisterCommands();
        this.client = new DiscordClient(process.env.DISCORD_TOKEN as string, commands, (client: Client) => {
            if (!!client && !!client.user) {
                commands.registerCommands().then(() => console.log("Commands registered"));
                console.log(`Logged in as ${client.user.tag}`);
            }
        });
    }
}

