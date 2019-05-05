import { ApolloServer } from "apollo-server-koa";
import app from "./app";

import { endpointURL, isDevelopment } from "./utils/config";
import typeDefs from "./schema.gql";
import resolvers from "./resolvers";


const server = new ApolloServer({ typeDefs, resolvers, debug: isDevelopment });

server.applyMiddleware({ app, path: endpointURL });

app.listen(3000);
