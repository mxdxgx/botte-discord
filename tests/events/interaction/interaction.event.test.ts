import { describe, it, expect, vi, beforeEach } from "vitest";
import { Events } from "discord.js";
import { InteractionEventHandler } from "../../../src/events/interaction/interaction.event";

// Mock the DiscordClient and its dependencies
class MockDiscordClient {
    client: any;
    commands: Map<any, any>;
    constructor() {
        this.client = {
            on: vi.fn(),
        };
        this.commands = new Map();
    }
}

describe("InteractionEventHandler", () => {
    let mockClient;
    let handler;

    beforeEach(() => {
        mockClient = new MockDiscordClient();
        handler = new InteractionEventHandler(mockClient);
    });

    it("should register an event listener for InteractionCreate", () => {
        expect(mockClient.client.on).toHaveBeenCalledWith(
            Events.InteractionCreate,
            expect.any(Function)
        );
    });

    it("should log the interaction and handle command execution when a command is received", () => {
        const mockInteraction = {
            isCommand: vi.fn(() => true),
            commandName: "testCommand",
        };
        const mockExecute = vi.fn();

        mockClient.commands.set("testCommand", { execute: mockExecute });

        const interactionHandler = mockClient.client.on.mock.calls.find(
            ([event]) => event === Events.InteractionCreate
        )[1];

        interactionHandler(mockInteraction);

        expect(mockInteraction.isCommand).toHaveBeenCalled();
        expect(mockExecute).toHaveBeenCalledWith(mockInteraction);
    });

    it("should do nothing if the interaction is not a command", () => {
        const mockInteraction = {
            isCommand: vi.fn(() => false),
        };

        const interactionHandler = mockClient.client.on.mock.calls.find(
            ([event]) => event === Events.InteractionCreate
        )[1];

        interactionHandler(mockInteraction);

        expect(mockInteraction.isCommand).toHaveBeenCalled();
        expect(mockClient.commands.size).toBe(0);
    });
});