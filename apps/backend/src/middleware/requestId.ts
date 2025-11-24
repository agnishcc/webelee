import { logger } from "@/server/logger";
import { Hook } from "@hono/zod-openapi";
import { createMiddleware } from "hono/factory";
import { StatusCodes } from "http-status-codes";

function valueOrFallback(value: unknown, fallback: unknown = undefined) {
    if (!value) {
        return fallback;
    }
    if (typeof value === 'object') {
        //@ts-expect-error
        if (Array.isArray(value) || value?.length > 0) {
            return value;
        }
        if (Object.keys(value).length > 0) {
            return value;
        }
        return fallback;
    }
    return value;
}
export const requestLogger = () =>
    createMiddleware(async (c, next) => {
        const start = performance.now();
        logger.req(
            {
                method: c.req.method,
                path: c.req.path,
                requestId: c.get('requestId'),
                query: valueOrFallback(c.req.query(), undefined),
                param: valueOrFallback(c.req.param(), undefined),
                // headers: valueOrFallback(c.req.raw.headers.toJSON(), undefined),
            },
            c.req.method,
        );
        await next();
        const end = performance.now();
        const requestDuration = end - start;
        c.res.headers.set('X-Response-Time', `${requestDuration.toFixed(2)}`);
        logger.res(
            {
                status: c.res.status,
                path: c.req.path,
                requestId: c.get('requestId'),
                responseTime: Number(requestDuration.toFixed(2)),
            },
            c.res.status.toString(),
        );
    });

const defaultHook: Hook<any, any, any, any> = (result, c) => {
    if (!result.success) {
        return c.json(
            {
                success: result.success,
                error: {
                    name: result.error.name,
                    issues: result.error.issues,
                },
            },
            StatusCodes.UNPROCESSABLE_ENTITY,
        );
    }
};

export default defaultHook;