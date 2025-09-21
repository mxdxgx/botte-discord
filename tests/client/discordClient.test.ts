import { EventEmitter } from 'events';
import sinon from 'sinon';
import { describe, expect, it, vi } from 'vitest';
import { DiscordClient } from '../../src/client/discordClient';
import { RegisterCommands } from '../../src/commands/register';

vi.mock('discord.js', () => {
	const Client = vi.fn().mockImplementation(() => {
		const clientInstance: any = new EventEmitter();
		clientInstance.login = vi.fn().mockResolvedValue(true);
		clientInstance.once = vi.fn();
		clientInstance.on = vi.fn();
		clientInstance.emit = vi.fn();

		return clientInstance;
	});

	const GatewayIntentBits = {
		Guilds: 1,
		GuildMessages: 2,
		MessageContent: 3,
		GuildInvites: 4
	};
	const Events = {
		ClientReady: 'ready',
		InteractionCreate: 'interactionCreate'
	};

	return { Client, GatewayIntentBits, Events };
});

vi.mock('../../src/commands/register', () => {
	return {
		RegisterCommands: vi.fn().mockImplementation(() => {
			const commands = new Map();
			commands.set('ping', {
				execute: sinon.spy()
			});
			return {
				getCommandsMap: vi.fn().mockReturnValue(commands)
			};
		})
	};
});

describe('DiscordClient', () => {
	it('should create a new client and login', () => {
		const token = 'fake-token';
		const clientReadyHandler = sinon.spy();
		const discordClient = new DiscordClient(token, new RegisterCommands(), clientReadyHandler);

		expect(discordClient.client.login).toHaveBeenCalledWith(token);
		expect(discordClient.client.once).toHaveBeenCalledWith('ready', clientReadyHandler);
	});

	it('should use default clientReadyHandler if not provided', () => {
		const token = 'fake-token';
		const discordClient = new DiscordClient(token, new RegisterCommands());

		expect(discordClient.client.login).toHaveBeenCalledWith(token);
		expect(discordClient.client.once).toHaveBeenCalledWith('ready', expect.any(Function));
	});
});
