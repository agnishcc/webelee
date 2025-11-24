import { createMiddleware } from "hono/factory";

export const responseCatcher = createMiddleware(async (c, next) => {
  // response catcher
  console.log("***************RESPONSE CATCHER*****************");
  console.log(c.res.json);
  console.log(c.res.status);
  console.log("***************RESPONSE CATCHER*****************");
  next();
});
