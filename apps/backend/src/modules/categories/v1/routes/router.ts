import { createRouter } from "@/lib/createApp";
import * as schema from "../routes/schema";
import * as controller from "../controller";
import { createRoute, z } from "@hono/zod-openapi";

const TAGS = ["Categories"]
const PATH = "/categories";



const router = createRouter();

export const createCategoryDoc = createRoute({
    tags: TAGS,
    method: "post",
    path: "/",
    summary: "Create a new category",
    description: "Endpoint to create a new category",
    request: schema.CreateCategoriesRequest,
    responses: schema.createCategoryResponse
});

export type CreateCategoryDoc = typeof createCategoryDoc;

router.openapi(createCategoryDoc, controller.createCategoryHandler);

export default {
    router,
    basePath: PATH,
}