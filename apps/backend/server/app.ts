import configureOpenAPI from "@/lib/configureOpenApi";
import createApp from "@/lib/createApp";

import categories from "@/modules/categories/v1/routes/router";
import index from "@/modules/index.route";


const app = createApp();

configureOpenAPI(app);

const routes = [
    index,
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
