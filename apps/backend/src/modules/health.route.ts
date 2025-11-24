import { createRoute, z } from "@hono/zod-openapi";


import { createRouter } from "@/lib/createApp";
import { StatusCodes } from "http-status-codes/build/cjs/status-codes";
import { statusUtility } from "@/helper/responseHelpers";
import { AppBindings, AppRouteHandler } from "@/lib/types";
import { CreateCategoriesRequest } from "./categories/v1/routes/schema";

const cRouter = createRoute({
  tags: ["Test"],
  method: "get",
  path: "/hello",
  request: CreateCategoriesRequest,
  responses: {
    [statusUtility(StatusCodes.PARTIAL_CONTENT)]: {
      description: "The server is healthy",
    },
  },
});

type CRouter = typeof cRouter;
const router = createRouter()
  .openapi(
    createRoute({
      tags: ["Index"],
      method: "get",
      path: "/alive",
      responses: {
        [statusUtility(StatusCodes.OK)]: {
          description: "The server is alive",

        }
      },
    }),
    (c) => {
      return c.json({
        message: "The server is alive",
      }, (StatusCodes.OK));
    },

  )
  .openapi(
    cRouter,
    (c) => {
      return c.text("ok", StatusCodes.OK);
    },
  );

const h: AppRouteHandler<CRouter> = async (c) => {
  const { ping, test } = c.req.valid('json');
  return c.json({
    message: `pong: ${ping}`,
  }, StatusCodes.OK);
};
export default router;
