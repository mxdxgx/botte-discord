import { Events } from "discord.js";
import { DiscordClient } from "../../client/discordClient";

export class InteractionEventHandler {
    private client: DiscordClient;

    constructor(client: DiscordClient) {
        this.client = client;
        this.handleCreate();
    }

    public handleCreate() {
        this.client.client.on(Events.InteractionCreate, interaction => {
            console.log('InteractionCreate event received:', interaction);
            if (!interaction.isCommand()) return;
            this.client.commands.get(interaction.commandName).execute(interaction);
        });
    }
}