/**
 * app-error.ts
 * Base error class and type definitions
 */

// Layer codes
export const LAYER_CODES = {
    DTO: 'D',
    SERVICE: 'S',
    CONTROLLER: 'C',
} as const;

// Error type codes
export const ERROR_TYPE_CODES = {
    VALIDATION: 'XV',
    API: 'YE',
    AUTHENTICATION: 'XA',
    AUTHORIZATION: 'XZ',
    BUSINESS: 'ZS',
    SYSTEM: 'ZC',
    DATABASE: 'ZD',
    NETWORK: 'ZN',
    NOT_FOUND: 'NF',
} as const;

// Severity codes
export const SEVERITY_CODES = {
    LOW: 'L01',
    MEDIUM: 'M01',
    HIGH: 'H01',
    CRITICAL: 'C01',
} as const;

// Types
export type Layer = keyof typeof LAYER_CODES;
export type ErrorType = keyof typeof ERROR_TYPE_CODES;
export type Severity = keyof typeof SEVERITY_CODES;

export interface ErrorOptions {
    layer: Layer;
    type: ErrorType;
    severity: Severity;
    status?: 400 | 401 | 403 | 404 | 422 | 500;
    cause?: unknown;
    metadata?: Record<string, unknown>;
}

/**
 * Custom Application Error
 * Code format: {LAYER}-{TYPE}-{SEVERITY}
 * Example: D-XV-L01 (DTO-VALIDATION-LOW)
 */
export class AppError extends Error {
    public readonly code: string;
    public readonly layer: Layer;
    public readonly type: ErrorType;
    public readonly severity: Severity;
    public readonly status: 400 | 401 | 403 | 404 | 422 | 500;
    public readonly timestamp: Date;
    public readonly metadata?: Record<string, unknown>;

    constructor(message: string, options: ErrorOptions) {
        super(message, { cause: options.cause });
        this.name = 'AppError';

        this.layer = options.layer;
        this.type = options.type;
        this.severity = options.severity;
        this.status = options.status || this.inferStatus();
        this.metadata = options.metadata;
        this.timestamp = new Date();

        // Generate code: LAYER-TYPE-SEVERITY
        this.code = `${LAYER_CODES[options.layer]}-${ERROR_TYPE_CODES[options.type]}-${SEVERITY_CODES[options.severity]}`;

        Error.captureStackTrace(this, this.constructor);
    }

    private inferStatus(): 400 | 401 | 403 | 404 | 422 | 500 {
        switch (this.type) {
            case 'VALIDATION':
                return 400;
            case 'AUTHENTICATION':
                return 401;
            case 'AUTHORIZATION':
                return 403;
            case 'BUSINESS':
                return 422;
            case 'NOT_FOUND':
                return 404;
            case 'DATABASE':
            case 'SYSTEM':
                return 500;
            case 'NETWORK':
                return 500;
            default:
                return 500;
        }
    }

    toJSON() {
        return {
            name: this.name,
            message: this.message,
            code: this.code,
            layer: this.layer,
            type: this.type,
            severity: this.severity,
            status: this.status,
            timestamp: this.timestamp.toISOString(),
            metadata: this.metadata,
            cause: this.cause,
        };
    }

    toResponse() {
        return {
            error: {
                message: this.message,
                code: this.code,
                status: this.status,
                timestamp: this.timestamp.toISOString(),
            },
        };
    }
}

/**
 * Generic error catcher for any layer
 */
export function catchError(error: unknown, layer: Layer, context?: string): AppError {
    if (error instanceof AppError) {
        return error;
    }

    const errorObj = error as any;
    const message = context ? `${context}: ${errorObj?.message || 'Unknown error'}` : errorObj?.message || 'Unknown error';

    return new AppError(message, {
        layer,
        type: 'SYSTEM',
        severity: 'MEDIUM',
        cause: error,
    });
}