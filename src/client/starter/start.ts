import { Client } from "discord.js";
import { RegisterCommands } from "../../commands/register";
import { DiscordClient } from "../discordClient";

/**
 * The `Start` class is responsible for initializing and starting the Discord client.
 * 
 * @remarks
 * This class performs the following actions during initialization:
 * 1. Loads environment variables from a `.env` file using the `dotenv` package.
 * 2. Creates an instance of `RegisterCommands`.
 * 3. Initializes a new `DiscordClient` with the provided Discord token, commands, and a callback function.
 * 
 * The callback function is executed once the client is ready and logged in. It registers the commands and logs the client's username.
 * 
 * @example
 * ```typescript
 * const start = new Start();
 * ```
 */
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

