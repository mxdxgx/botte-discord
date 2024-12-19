import { describe, it, expect, vi } from "vitest";
import { SlashCommandBuilder } from "discord.js";
import { CommandBase } from "../../src/commands/commandBase";

// Mock the interaction class
class MockInteraction {
    reply: any;
    constructor() {
        this.reply = vi.fn();
    }
}

describe("CommandBase", () => {
    it("should initialize with a SlashCommandBuilder instance", () => {
        class ConcreteCommand extends CommandBase {
            async execute(interaction: any) {
                // Implementation for the concrete class
            }
        }
        const commandBase = new ConcreteCommand();
        expect(commandBase.data).toBeInstanceOf(SlashCommandBuilder);
    });

    it("should have an abstract execute method that does nothing by default", async () => {
        class ConcreteCommand extends CommandBase {
            async execute(interaction: any) {
                // Implementation for the concrete class
            }
        }
        const commandBase = new ConcreteCommand();
        const mockInteraction = new MockInteraction();

        await expect(commandBase.execute(mockInteraction)).resolves.toBeUndefined();
        expect(mockInteraction.reply).not.toHaveBeenCalled();
    });
});
