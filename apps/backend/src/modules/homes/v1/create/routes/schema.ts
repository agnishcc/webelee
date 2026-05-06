import AuthHeaderSchema, { ApplicationJsonBody } from "@/helper/requestHelpers";
import { UnauthorizedResponse, BadRequestResponse, InternalServerErrorResponse, statusUtility, BaseErrorResponses } from "@/helper/responseHelpers";
import { RequestType, ResponseType } from "@/modules/types";
import { StatusCodes } from "http-status-codes";
import z from "zod";

export const CreateHomeRequest = {
    headers: AuthHeaderSchema,
    body: ApplicationJsonBody(z.object({
        title: z.string().min(1).max(100).meta({
            description: "Name of the home",
            example: "Technology",
        }),
    }), 'Create Home Body', true),
} satisfies RequestType;



export const createHomeResponse = {
    201: {
        description: "Home created successfully",
        content: {
            "application/json": {
                schema: z.object({
                    description: z.string().meta({
                        description: "Success message",
                        example: "Home created successfully",
                    }),
                    data: z.object({
                        id: z.number().meta({
                            description: "ID of the created home",
                            example: 1,
                        }),
                        title: z.string().meta({
                            description: "Title of the created home",
                            example: "My Home",
                        }),
                    }).meta({
                        description: "Created Home Data",
                    }),
                }),
            },
        },
    },
    ...BaseErrorResponses,
} satisfies ResponseType;