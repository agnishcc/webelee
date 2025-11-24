import { type Level, pino } from 'pino';
import { createStdioTransport } from './transport/pretty';

/**
 * Create instance of logger
 * @param level
 * @returns
 */

export const createLogger = (level: Level = 'info') => {
	return pino(
		{
			customLevels: {
				trace: 10,
				debug: 20,
				info: 30,
				warn: 40,
				error: 50,
				fatal: 60,
				security: 70,
				req: 80,
				res: 90,
			},
			useOnlyCustomLevels: true,
			level: level,
			enabled: true,
		},
		createStdioTransport(),
	);
};

export type Logger = ReturnType<typeof createLogger>;
