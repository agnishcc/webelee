import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";
import { error } from "node:console";


import type { AccessTokenDecodedPayload } from "@/lib/types";

import env from "@/server/env";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { logger } from "@/server/logger";

const secretKey = env.JWT_SECRET_KEY;

const allowedWithoutAuth = [
  "/api/auth/*",
];

export const authLayer = createMiddleware(async (c, next) => {
  const shouldItAuth = await shouldAuth(c.req.path);

  logger.info({ shouldItAuth }, "Should it auth?");
  if (!shouldItAuth) {
    await next();
    return;
  }
  const auth = c.req.header("Authorization");
  const token = auth?.split(" ")[1];
  console.log(token);

  if (!token) {
    return c.json({
      description: `${ReasonPhrases.UNAUTHORIZED} No Token Provided`,
    }, StatusCodes.UNAUTHORIZED);
  }
  const decodedPayload = (await verify(token, secretKey).catch(
    (err) => {
      if (err instanceof Error) {
        return undefined;
      }
      logger.error({ error: err }, "JWT verification error");
      return undefined;
    },
  )) as unknown as AccessTokenDecodedPayload;
  if (!decodedPayload) {
    return c.json({
      description: `${ReasonPhrases.UNAUTHORIZED} Invalid Token`,
    }, StatusCodes.UNAUTHORIZED);
  }
  c.set("user", decodedPayload);

  await next();
});

export async function shouldAuth(path: string) {
  return !allowedWithoutAuth.some((allowed) => {
    return path.match(allowed);
  });
}
