import { Events } from "discord.js";
import { DiscordClient } from "../../client/discordClient";

/**
 * Handles interaction events for the Discord client.
 */
export class InteractionEventHandler {
    private client: DiscordClient;

    /**
     * Creates an instance of InteractionEventHandler.
     * @param client - The Discord client instance.
     */
    constructor(client: DiscordClient) {
        this.client = client;
        this.handleCreate();
    }

    /**
     * Sets up the event listener for the InteractionCreate event.
     * Logs the received interaction and executes the corresponding command if the interaction is a command.
     */
    public handleCreate() {
        this.client.client.on(Events.InteractionCreate, interaction => {
            console.log('InteractionCreate event received:', interaction);
            if (!interaction.isCommand()) return;
            this.client.commands.get(interaction.commandName).execute(interaction);
        });
    }
}