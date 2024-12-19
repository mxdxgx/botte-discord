import sinon from 'sinon';
import { REST, Routes } from 'discord.js';
import { RegisterCommands } from '../../src/commands/register';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { PingCommand } from '../../src/commands/ping.command';

describe('RegisterCommands', () => {
    let registerCommands: RegisterCommands;
    let restPutStub: sinon.SinonStub;

    beforeEach(() => {
        registerCommands = new RegisterCommands();
        restPutStub = sinon.stub(REST.prototype, 'put').resolves();
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should initialize with a ping command', () => {
        const commandsMap = registerCommands.getCommandsMap();
        expect(commandsMap.size).toBe(1);
        expect(commandsMap.get('ping')).toBeInstanceOf(PingCommand);
    });

    it('should register commands successfully', async () => {
        await registerCommands.registerCommands();
        expect(restPutStub.calledOnce).toBe(true);
        expect(restPutStub.firstCall.args[0]).toBe(Routes.applicationCommands(process.env.CLIENT_ID));
        expect(restPutStub.firstCall.args[1].body.length).toBe(1);
    });
});
