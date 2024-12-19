import { SlashCommandBuilder } from "discord.js";

export abstract class CommandBase {
    data: SlashCommandBuilder = new SlashCommandBuilder();
    async execute(interaction: any): Promise<void> { }
}