import { desc } from "@repo/db";
import { StatusCodes } from "http-status-codes";
import z, { ZodObject, ZodRawShape, ZodSchema } from "zod";
export const statusUtility = (code: StatusCodes) => code as number;

export const UnauthorizedResponse = {
    401: {
        description: "Unauthorized",
        content: {
            "application/json": {
                schema:
                    z.object({
                        message: z.string().openapi({ description: "Error message", example: "Unauthorized" }),

                    }),
            },
        },
    },
}
export const ForbiddenResponse = {
    403: {
        description: "Forbidden",
        content: {
            "application/json": {
                schema:
                    z.object({
                        message: z.string().openapi({ description: "Error message", example: "Forbidden" }),
                    }),
            },
        },
    },
}

export const NotFoundResponse = {
    404: {
        description: "Not Found",
        content: {
            "application/json": {
                schema:
                    z.object({
                        message: z.string().openapi({ description: "Error message", example: "Not Found" }),
                    }),
            },
        },
    },
}

export const ConflictResponse = {
    409: {
        description: "Conflict",
        content: {
            "application/json": {
                schema:
                    z.object({
                        message: z.string().openapi({ description: "Error message", example: "Conflict" }),
                    }),
            },
        },
    },
}

export const TooManyRequestsResponse = {
    429: {
        description: "Too Many Requests",
        content: {
            "application/json": {
                schema:
                    z.object({
                        message: z.string().openapi({ description: "Error message", example: "Too Many Requests" }),
                    }),
            },
        },
    },
}


export const InternalServerErrorResponse = {
    500: {
        description: "Internal Server Error",
        content: {
            "application/json": {
                schema:
                    z.object({
                        message: z.string().openapi({ description: "Error message", example: "Internal Server Error" }),
                    }),
            },
        },
    },
}
export const BadRequestResponse = {
    400: {
        description: "Bad Request",
        content: {
            "application/json": {
                schema:
                    z.object({
                        message: z.string().openapi({ description: "Error message", example: "Bad Request" }),
                    }),
            },
        },
    },
}


export const BaseErrorResponses = {

    ...UnauthorizedResponse,
    ...ForbiddenResponse,
    ...NotFoundResponse,
    ...ConflictResponse,
    ...TooManyRequestsResponse,
    ...InternalServerErrorResponse,
    ...BadRequestResponse,
}