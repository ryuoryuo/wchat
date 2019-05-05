import { ApolloServer } from "apollo-server-koa";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { execute, subscribe } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import app from "./app";

import { endpointURL, isDevelopment } from "./utils/config";
import typeDefs from "./schema.gql";
import resolvers from "./resolvers";


const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const server = new ApolloServer({ typeDefs, resolvers, debug: isDevelopment });

server.applyMiddleware({ app, path: endpointURL });

const koaServer = app.listen(3000);

const subscriptionServer = new SubscriptionServer(
  {
    execute,
    subscribe,
    schema
  },
  {
    server: koaServer,
    path: endpointURL
  }
);
