import { apiReference, Scalar } from "@scalar/hono-api-reference";

import type { AppOpenAPI } from "./types";
import { APP_VERSION } from "../../server/version";


export default function configureOpenAPI(app: AppOpenAPI) {
  app.doc("/openApi", {
    openapi: "3.0.0",
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local Development",
      },
      {
        url: "https://rasoi.saudebazi.com",
        description: "Production",
      },
    ],
    info: {
      version: APP_VERSION,
      title: "Rasoi Ingridients",
    },
  });

  app.get(
    "/ui",
    Scalar({
      theme: 'kepler',
      title: 'Webelee API Reference',
      url: '/openApi',
    })
  );
}
