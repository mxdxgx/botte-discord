import { describe, it, expect, vi, beforeEach } from "vitest";
import { PingCommand } from "../../src/commands/ping.command";

// Mock the base command class
class MockInteraction {
    reply: any;
    constructor() {
        this.reply = vi.fn();
    }
}

describe("PingCommand", () => {
    let pingCommand;

    beforeEach(() => {
        pingCommand = new PingCommand("ping", "Responds with Pong!");
    });

    it("should initialize with the correct name and description", () => {
        expect(pingCommand.name).toBe("ping");
        expect(pingCommand.description).toBe("Responds with Pong!");
        expect(pingCommand.data.name).toBe("ping");
        expect(pingCommand.data.description).toBe("Responds with Pong!");
    });

    it("should reply with 'Pong!' when execute is called", async () => {
        const mockInteraction = new MockInteraction();

        await pingCommand.execute(mockInteraction);

        expect(mockInteraction.reply).toHaveBeenCalledWith("Pong!");
    });
});
