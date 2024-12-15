import { describe, it, expect, vi } from 'vitest';
import { Client, GatewayIntentBits, Events } from 'discord.js';
import { DiscordClient } from '../../src/client/discordClient';
import sinon from 'sinon';

vi.mock('discord.js', () => {
	const Client = vi.fn().mockImplementation(() => {
		return {
			login: vi.fn(),
			once: vi.fn()
		};
	});
	const GatewayIntentBits = {
		Guilds: 1,
		GuildMessages: 2,
		MessageContent: 3
	};
	const Events = {
		ClientReady: 'ready'
	};
	return { Client, GatewayIntentBits, Events };
});

describe('DiscordClient', () => {
	it('should create a new client and login', () => {
		const token = 'fake-token';
		const clientReadyHandler = sinon.spy();
		const discordClient = new DiscordClient(token, clientReadyHandler);

		expect(discordClient.client.login).toHaveBeenCalledWith(token);
		expect(discordClient.client.once).toHaveBeenCalledWith(Events.ClientReady, clientReadyHandler);
	});

	it('should use default clientReadyHandler if not provided', () => {
		const token = 'fake-token';
		const discordClient = new DiscordClient(token);

		expect(discordClient.client.login).toHaveBeenCalledWith(token);
		expect(discordClient.client.once).toHaveBeenCalledWith(Events.ClientReady, expect.any(Function));
	});
});