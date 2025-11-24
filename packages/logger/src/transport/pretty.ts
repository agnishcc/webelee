import pinoPretty from 'pino-pretty';
import { transformTime } from '../utils';

export function createStdioTransport() {
	return pinoPretty({
		colorize: true,
		translateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss:mm'Z'",
		ignore: 'pid,hostname',
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
		singleLine: true,
		customColors: {
			trace: 'gray',
			debug: 'yellow',
			info: 'green',
			warn: 'yellow',
			error: 'red',
			fatal: 'red',
			security: 'red',
			req: 'gray',
			res: 'gray',
		},
		messageFormat(log, messageKey, _levelLabel, extras) {
			const message = log[messageKey];
			if (log.level === 80) {
				return extras.colors.white(`${extras.colors.greenBright(log.path as string)}`);
			}
			if (log.level === 90) {
				return extras.colors.white(
					`${extras.colors.yellowBright(transformTime(log.responseTime as never))}`,
				);
			}
			if (log.level === 10) {
				return extras.colors.gray(message as string);
			}
			if (log.level === 30) {
				return extras.colors.whiteBright(message as string);
			}
			if (log.level === 50) {
				return extras.colors.redBright(message as string);
			}
			if (log.level === 60) {
				return extras.colors.red(message as string);
			}
			if (log.level === 70) {
				return extras.colors.underline(extras.colors.yellow(message as string));
			}

			return extras.colors.white(message as string);
		},
		sync: true,
		customPrettifiers: {
			level(inputData, key, log, extras) {
				// console.log({ inputData, key, log });
				if (key === 'level' && Number(inputData) === 80) {
					//@ts-expect-error
					const method = log.method as string;
					switch (method) {
						case 'GET':
							return extras.colors.green(method);
						case 'POST':
							return extras.colors.cyanBright(method);
						case 'PUT':
							return extras.colors.blueBright(method);
						case 'DELETE':
							return extras.colors.red(method);
						case 'PATCH':
							return extras.colors.magenta(method);
						default:
							return extras.colors.gray(method);
					}
				}
				if (key === 'level' && Number(inputData) === 90) {
					//@ts-expect-error
					const status = log.status as number;
					if (status <= 300) {
						return extras.colors.green(status);
					}
					if (status >= 300 && status < 400) {
						return extras.colors.yellowBright(status);
					}
					return extras.colors.red(status);
				}
				return extras.labelColorized as never;
			},
		},
		colorizeObjects: true,
		useOnlyCustomProps: true,
	});
}
