import KoaRouter from "koa-router";
import Koa from "koa";
import koaBody from "koa-bodyparser";
import helmet from "koa-helmet";
import cors from "@koa/cors";
import { makeExecutableSchema } from "graphql-tools";
import { graphqlKoa, graphiqlKoa } from "apollo-server-koa";

import { endpointURL, isDevelopment } from "./utils/config";
import typeDefs from "./schema.gql";
import resolvers from "./resolvers";


const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const app = new Koa();

const router = new KoaRouter();

app.use(helmet());
app.use(koaBody());
app.use(cors());

router.all(
  endpointURL,
  graphqlKoa(() => ({
    schema,
    debug: isDevelopment
  }))
);

if (isDevelopment) {
  router.get("/graphiql", graphiqlKoa({ endpointURL }));
}
app.use(router.routes());
app.use(router.allowedMethods());

export default app;
