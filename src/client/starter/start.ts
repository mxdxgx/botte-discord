import { Client } from "discord.js";
import { DiscordClient } from "../discordClient";
import { RegisterCommands } from "../../commands/register";

export class Start {
    client: DiscordClient;
    constructor() {
        require('dotenv').config();
        this.client = new DiscordClient(process.env.DISCORD_TOKEN as string, (client: Client) => {
            if (!!client && !!client.user) {
                console.log(`Logged in as ${client.user.tag}`);
                (new RegisterCommands()).registerCommands();
            }
        });
    }
}

