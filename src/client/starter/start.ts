import { Client } from "discord.js";
import { DiscordClient } from "../discordClient";

export class Start {
    client: DiscordClient;
    constructor() {
        require('dotenv').config();
        this.client = new DiscordClient(process.env.DISCORD_TOKEN as string, (client: Client) => {
            if (!!client && !!client.user) {
                console.log(`Logged in as ${client.user.tag}`);
            }
        });
    }
}

