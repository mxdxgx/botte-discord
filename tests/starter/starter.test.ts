// Import necessary testing utilities from Vitest
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Start } from '../../src/client/starter/start';

// Mocking 'dotenv' as a dependency
vi.mock('dotenv', () => ({
    config: vi.fn()
}));

// Mocking 'discord.js' to handle the Discord REST and Client constructor
vi.mock('discord.js', async (importOriginal) => {
    const original = await importOriginal();
    return {
        ...original,
        REST: vi.fn().mockImplementation(() => ({
            setToken: vi.fn().mockReturnThis(),
            put: vi.fn().mockResolvedValue(true)
        }))
    };
});

// Mocking the DiscordClient class
vi.mock('../../src/client/discordClient', () => {
    return {
        DiscordClient: vi.fn().mockImplementation((token, commands, clientReadyHandler) => {
            const mockClient = {
                user: { tag: 'testUser#1234' },
                login: vi.fn().mockResolvedValue(true),
                once: vi.fn((event, handler) => {
                    if (event === 'ready') {
                        handler(mockClient);
                    }
                }),
            };
            if (clientReadyHandler) {
                mockClient.once('ready', clientReadyHandler);
            }
            return { client: mockClient };
        }),
    };
});

// Describe the test suite
describe('Start', () => {
    let consoleLogSpy: ReturnType<typeof vi.spyOn>;

    // Setup before each test
    beforeEach(() => {
        consoleLogSpy = vi.spyOn(console, 'log');
        process.env.DISCORD_TOKEN = 'fake-token'; // Set environment variable
    });

    // Cleanup after each test
    afterEach(() => {
        consoleLogSpy.mockRestore();
        vi.resetAllMocks();
    });

    // Test case for initializing DiscordClient and login
    it('should initialize DiscordClient and log in', () => {
        const start = new Start();
        expect(consoleLogSpy).toHaveBeenCalledWith('Logged in as testUser#1234');
    });
});
