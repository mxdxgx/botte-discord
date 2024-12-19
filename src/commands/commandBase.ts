import { SlashCommandBuilder } from "discord.js";

/**
 * Abstract base class for defining a command.
 * 
 * @abstract
 */
export abstract class CommandBase {
    data: SlashCommandBuilder = new SlashCommandBuilder();
    async execute(interaction: any): Promise<void> { }
}