import configureOpenAPI from "@/lib/configureOpenApi";
import createApp from "@/lib/createApp";
// import auth from "@/services/auth/routes/router";
// import feedback from "@/services/feedback/routes/router";
// import files from "@/services/files/routes/router";
// import alive from "@/services/health.route";
// import index from "@/services/index.route";
// import products from "@/services/products/routes/router";
// import shops from "@/services/shops/routes/router";
// import test from "@/services/test.route";
// import users from "@/services/users/routes/router";

import categories from "@/modules/categories/v1/routes/router";
import index from "@/modules/index.route";
import alive from "@/modules/health.route";

// import { responseCatcher } from "./middlewares/responseCatcher";

const app = createApp();

configureOpenAPI(app);

const routes = [
    index,
    alive,
] as const;

const apiRoutes = [
    // test,
    // auth,
    // users,
    // files,
    // shops,
    // products,
    // feedback,
    categories

] as const;
routes.forEach((route) => {
    app.route("/", route);
});

apiRoutes.forEach((route) => {
    console.log(route.basePath);

    app.route(`/api${route.basePath}`, route.router);
});

export type AppType = typeof routes[number];

export default app;
