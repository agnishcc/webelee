import { createRouter } from "@/lib/createApp";
import * as schema from "../routes/schema";
import * as controller from "../controller";
import { createRoute, z } from "@hono/zod-openapi";
import { authLayer } from "@/middleware/auth";

const TAGS = ["Categories"]
const PATH = "/categories";



const router = createRouter();

export const createCategoryDoc = createRoute({
    tags: TAGS,
    method: "post",
    path: "/",
    summary: "Create a new home",
    description: "Endpoint to create a new home",
    request: schema.CreateHomeRequest,
    responses: schema.createHomeResponse,
});
export type CreateHomeDoc = typeof createCategoryDoc;

router.openapi(createCategoryDoc, controller.createHomeHandler);

export default {
    router,
    basePath: PATH,
}