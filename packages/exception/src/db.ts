

import { DrizzleError, PostgresError } from "@repo/db";
import { AppError, type Severity } from "./app";

export class DTOError {
    static validation(message: string, metadata?: Record<string, unknown>): AppError {
        return new AppError(message, {
            layer: 'DTO',
            type: 'VALIDATION',
            severity: 'LOW',
            metadata,
        });
    }

    static database(message: string, options?: {
        cause?: unknown, metadata?: Record<string, unknown>, severity?: Severity
    }): AppError {
        return new AppError(message, {
            layer: 'DTO',
            type: 'DATABASE',
            severity: options?.severity || 'HIGH',
            cause: options?.cause,
            metadata: options?.metadata,
        });
    }

    static system(message: string, cause?: unknown, metadata?: Record<string, unknown>): AppError {
        return new AppError(message, {
            layer: 'DTO',
            type: 'SYSTEM',
            severity: 'MEDIUM',
            cause,
            metadata,
        });
    }

    /**
     * Catch and wrap Drizzle errors
     */
    static fromDrizzle(error: unknown, context?: string): AppError {
        const errorObj = error as any;
        const message = context ? `${context}: ${errorObj?.message || 'Database error'}` : errorObj?.message || 'Database error';

        // Drizzle/PostgreSQL specific errors
        if (errorObj?.code) {
            // PostgreSQL error codes
            switch (errorObj.code) {
                case '23505': // unique_violation
                    // return DTOError.validation('Duplicate entry found', { pgCode: errorObj.code });
                    return DTOError.validation('Duplicate entry found', { pgCode: errorObj.code });
                case '23503': // foreign_key_violation
                    return DTOError.validation('Referenced record not found', { pgCode: errorObj.code });
                case '23502': // not_null_violation
                    return DTOError.validation('Required field is missing', { pgCode: errorObj.code });
                default:
                    return DTOError.database(message, {
                        cause: error,
                        metadata: {
                            pgCode: errorObj.code,
                        },
                        severity: 'HIGH',
                    });
            }
        }
        return DTOError.database(message, {
            cause: error,
            severity: 'HIGH',
        });
    }

    /**
     * Catch any error in DTO layer
     */
    static catch(error: unknown, context?: string): AppError {
        if (error instanceof AppError) {
            return error;
        }

        if (error instanceof DrizzleError) {
            return DTOError.database(error.message, {
                cause: error,
                metadata: {
                    drizzleCode: error.name,
                },
                severity: 'HIGH',
            }
            )
        }

        if (error instanceof PostgresError)
            return DTOError.fromDrizzle(error, context);


        if (error && typeof error === 'object' && 'message' in error) {
            const errorObj = error as any;
            const message = context ? `${context}: ${errorObj?.message || 'Unknown error'}` : errorObj?.message || 'Unknown error';
            return DTOError.database(message, {
                cause: error,
                severity: 'HIGH',
            });
        }
        return DTOError.database('Unknown database error occurred', {
            cause: error,
            severity: 'HIGH',
        });
    }
}