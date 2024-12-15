import { describe, it, beforeEach, afterEach, vi, expect } from 'vitest';
import { Start } from '../src/client/starter/start';

// Mock `Start` class
vi.mock('../src/client/starter/start', () => ({
    Start: vi.fn(),
}));

describe('app.ts', () => {
    let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
    let StartMock: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        // Spy on console.error
        consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
        StartMock = Start as ReturnType<typeof vi.fn>;
    });

    afterEach(() => {
        vi.resetAllMocks();
        consoleErrorSpy.mockRestore();
    });

    it('should instantiate Start without errors', async () => {
        // Dynamically import `app.ts` to execute its code
        await import('../src/app');

        // Assert that `Start` was instantiated
        expect(StartMock).toHaveBeenCalledTimes(1);

        // Assert no errors were logged
        expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it('should log an error if Start throws', async () => {
        // Make `Start` throw an error
        StartMock.mockImplementationOnce(() => {
            throw new Error('Initialization failed');
        });

        // Clear the module cache to ensure the module is re-imported
        vi.resetModules();

        // Dynamically import `app.ts` to execute its code
        await import('../src/app');

        // Assert the error was logged
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.objectContaining({ message: 'Initialization failed' }));
    });
});