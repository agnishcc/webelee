import { RequestType, ZodSchema } from "@/modules/types";
import { z } from "zod";

export const AuthHeaderSchema = z.object({
    authorization: z.string().openapi({
        example: "Bearer SECRET",
        description: "Access Token",
    }),
});

export const AuthHeaderSchemaTotp = z.object({
    "x-totp": z.string().openapi({
        example: "Bearer SECRET",
        description: "TOTP Code",
    }),
});

export const AuthHeaderSchemaRefresh = z.object({
    "x-refresh": z.string().openapi({
        example: "Bearer SECRET",
        description: "Refresh Token",
    }),
});

export default AuthHeaderSchema;

export const forbiddenResourceSchema = z.object({
    message: z.string().openapi({ description: "Unauthorized", example: "You dont have elevated permissions to create a user" }),
});


export const ApplicationJsonBody = <
    T extends ZodSchema,
>(schema: T,
    description = "Application JSON Body", required = true,
) => {
    console.log("is Required", required);

    return {
        content: {
            "application/json": {
                schema,
            },
        },
        description,
        required: required,
    };
};
