import { RouteConfig } from "@hono/zod-openapi";

export type RequestType = NonNullable<RouteConfig["request"]>;
export type ResponseType = RouteConfig["responses"];
export type RequestBody = NonNullable<RouteConfig["request"]>["body"];
export type RequestBodyContent = NonNullable<NonNullable<NonNullable<RouteConfig["request"]>["body"]>["content"]['application/json']>;

import type { z } from "@hono/zod-openapi";

// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error
export type ZodSchema = z.ZodUnion | z.AnyZodObject | z.ZodArray<z.AnyZodObject>;