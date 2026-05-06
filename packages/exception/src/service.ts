// import { AppError, type Severity } from './index';

import { AppError, type Severity } from "./app";
export class ServiceError {
    static validation(message: string, metadata?: Record<string, unknown>): AppError {
        return new AppError(message, {
            layer: 'SERVICE',
            type: 'VALIDATION',
            severity: 'LOW',
            metadata,
        });
    }

    static business(message: string, severity: Severity = 'MEDIUM', metadata?: Record<string, unknown>): AppError {
        return new AppError(message, {
            layer: 'SERVICE',
            type: 'BUSINESS',
            severity,
            metadata,
        });
    }

    static authentication(message: string, metadata?: Record<string, unknown>): AppError {
        return new AppError(message, {
            layer: 'SERVICE',
            type: 'AUTHENTICATION',
            severity: 'MEDIUM',
            metadata,
        });
    }

    static authorization(message: string, metadata?: Record<string, unknown>): AppError {
        return new AppError(message, {
            layer: 'SERVICE',
            type: 'AUTHORIZATION',
            severity: 'MEDIUM',
            metadata,
        });
    }

    static system(message: string, cause?: unknown, metadata?: Record<string, unknown>): AppError {
        return new AppError(message, {
            layer: 'SERVICE',
            type: 'SYSTEM',
            severity: 'HIGH',
            cause,
            metadata,
        });
    }

    /**
     * Catch errors from DTO or throw new
     */
    static catch(error: unknown, context?: string): AppError {
        if (error instanceof AppError) {
            return error;
        }

        const errorObj = error as any;
        const message = context ? `${context}: ${errorObj?.message || 'Service error'}` : errorObj?.message || 'Service error';

        return ServiceError.system(message, error);
    }
}