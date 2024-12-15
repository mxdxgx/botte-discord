import sinon from 'sinon';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { DiscordClient } from '../../src/client/discordClient';
import { Start } from '../../src/client/starter/start';

vi.mock('dotenv', () => ({
    config: vi.fn()
}));

vi.mock('../../src/client/discordClient', () => {
    return {
        DiscordClient: vi.fn().mockImplementation((token, clientReadyHandler) => {
            const mockClient = {
                user: { tag: 'testUser#1234' },
                login: vi.fn().mockResolvedValue(true),
                once: vi.fn((event, handler) => {
                    if (event === 'ready') {
                        // Simulate the ready event after registration
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

describe('Start', () => {
    let consoleLogSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
        consoleLogSpy = vi.spyOn(console, 'log');
        process.env.DISCORD_TOKEN = 'fake-token';
    });

    afterEach(() => {
        consoleLogSpy.mockRestore();
        vi.resetAllMocks();
    });

    it('should initialize DiscordClient and log in', () => {
        const start = new Start();
        expect(consoleLogSpy).toHaveBeenCalledWith('Logged in as testUser#1234');
    });
});