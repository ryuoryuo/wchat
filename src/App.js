import { hot } from "react-hot-loader/root";
import React from "react";
import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Normalize } from "styled-normalize";
import { createGlobalStyle } from "styled-components";
import { WebSocketLink } from "apollo-link-ws";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";

import { AppContent } from "./components/AppContent";


const httpLink = new HttpLink({
  uri: "http://localhost:3000/graphql",
});

const wsLink = new WebSocketLink({
  uri: "ws://localhost:3000/graphql",
  options: {
    reconnect: true,
  },
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);

    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const GlobalStyle = createGlobalStyle`
  body {
   font-family: Roboto, sans-serif;
  }
`;

const App = () => (
  <ApolloProvider client={client}>
    <GlobalStyle />
    <Normalize />
    <AppContent />
  </ApolloProvider>
);

export default hot(App);
