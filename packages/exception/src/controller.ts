import { AppError, type Severity } from './app';

export class ControllerError {
    static validation(message: string, metadata?: Record<string, unknown>): AppError {
        return new AppError(message, {
            layer: 'CONTROLLER',
            type: 'VALIDATION',
            severity: 'LOW',
            metadata,
        });
    }

    static api(message: string, severity: Severity = 'MEDIUM', metadata?: Record<string, unknown>): AppError {
        return new AppError(message, {
            layer: 'CONTROLLER',
            type: 'API',
            severity,
            metadata,
        });
    }

    static system(message: string, cause?: unknown, metadata?: Record<string, unknown>): AppError {
        return new AppError(message, {
            layer: 'CONTROLLER',
            type: 'SYSTEM',
            severity: 'HIGH',
            cause,
            metadata,
        });
    }

    /**
     * Catch errors from Service or throw new
     */
    static catch(error: unknown, context?: string): AppError {
        if (error instanceof AppError) {
            return error;
        }

        const errorObj = error as any;
        const message = context ? `${context}: ${errorObj?.message || 'Request error'}` : errorObj?.message || 'Request error';

        return ControllerError.system(message, error);
    }
}