

import { type OpenAPIHono, type RouteConfig, type RouteHandler, z } from "@hono/zod-openapi";
import { NewCategory, User } from "@repo/db";




type schema = z.infer<NewCategory>;

export interface AppBindings {
  Variables: {
    user: AccessTokenDecodedPayload;
  };
};

export interface AccessTokenDecodedPayload {
  payload: User & {
    homeId: number;
  }
};

export type AppOpenAPI = OpenAPIHono<AppBindings>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppBindings>;


