import { AppRouteHandler } from "@/lib/types";
import { CreateCategoryDoc } from "./routes/router";
import { StatusCodes } from "http-status-codes";



export const createCategoryHandler: AppRouteHandler<CreateCategoryDoc> = async (c, hUtils) => {
    try {
        const body = c.req.valid('json');

        // Example implementation (adjust based on your data layer)
        // const newCategory = await createCategory({
        //     name: body.name,
        //     type: body.type,
        //     home: body.home
        // });

        return c.json({ description: "Category created successfully" }, 201);
    } catch (error) {
        console.error('Error creating category:', error);
        return c.json({
            message: (error instanceof Error) ? error.message : 'Unknown error',
        }, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}