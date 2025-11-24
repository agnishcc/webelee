import { OpenAPIHono } from "@hono/zod-openapi";


import { cors } from "hono/cors";

import type { AppBindings, AppOpenAPI } from "./types";
import serveEmojiFavicon from "@/middleware/favicon";
import { authLayer } from "@/middleware/auth";

import { requestId } from "hono/request-id";
import defaultHook, { requestLogger } from "@/middleware/requestId";

export const createRouter = () => {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook: defaultHook,
  });
}

export default function createApp() {
  const app = createRouter();
  app.use("*", cors());
  app.use('*', requestId())
  app.use(serveEmojiFavicon("🔥"));
  app.use('*', requestLogger())

  app.notFound((c) => {
    return c.json({
      description: "The requested resource was not found",
    }, 404);
  });

  app.use("/api/*", authLayer);


  return app;
}

// export function createTestApp<R extends AppOpenAPI>(router: R) {
//   return createApp().route("/", router);
// }
