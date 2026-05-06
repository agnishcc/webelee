import { AppRouteHandler } from "@/lib/types";
import { CreateHomeDoc } from "./routes/router";
import { StatusCodes } from "http-status-codes";
import { ControllerError } from "@repo/exception";
import { ContentfulStatusCode } from "hono/utils/http-status";



export const createHomeHandler: AppRouteHandler<CreateHomeDoc> = async (c, hUtils) => {
    try {
        const body = c.req.valid('json');
        return c.json({ description: "Home created successfully", data: { id: 1, title: body.title } }, 201);
    } catch (error) {
        throw ControllerError.catch(error);
    }
}