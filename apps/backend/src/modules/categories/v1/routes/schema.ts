import AuthHeaderSchema, { ApplicationJsonBody } from "@/helper/requestHelpers";
import { UnauthorizedResponse, BadRequestResponse, InternalServerErrorResponse, statusUtility } from "@/helper/responseHelpers";
import { RequestType, ResponseType } from "@/modules/types";
import { StatusCodes } from "http-status-codes";
import z from "zod";

export const CreateCategoriesRequest = {
    headers: AuthHeaderSchema,
    body: ApplicationJsonBody(z.object({
        name: z.string().min(1).max(100).meta({
            description: "Name of the category",
            example: "Technology",
        }),
        type: z.enum(['income', 'expense']).meta({
            description: "Type of the category",

        }),
        home: z.number().int().meta({
            description: "ID of the home the category belongs to",
            example: 1,
        }),
    }), 'Create Category Body', true),
} satisfies RequestType;

console.log("Hello");


export const createCategoryResponse = {

    ...UnauthorizedResponse,
    ...BadRequestResponse,
    ...InternalServerErrorResponse,

    201: {
        description: "Category created successfully",
        content: {
            "application/json": {
                schema: z.object({
                    description: z.string().meta({
                        description: "Success message",
                        example: "Category created successfully",
                    }),
                }),
            },
        },
    },
} satisfies ResponseType;