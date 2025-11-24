import { createRoute, z } from "@hono/zod-openapi";


import { createRouter } from "@/lib/createApp";
import { StatusCodes } from "http-status-codes";

const router = createRouter()
  .openapi({
    method: "get",
    path: "/",
    tags: ["Root"],
    summary: "API Root Endpoint",
    description: "Returns a welcome message for the API",
    responses: {
      200: {
        description: "Successful Response",
        content: {
          "application/json": {
            schema: z.object({
              message: z
                .string()
                .meta({
                  description: "Welcome message",
                  example: "Welcome to the API!",
                }),
            }),
          },
        },
      },
    },
  }, async (c) => {
    return c.json({ message: "Welcome to the API!" });
  });

export default router;
