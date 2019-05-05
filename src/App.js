import { hot } from "react-hot-loader/root";
import React from "react";
import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Normalize } from "styled-normalize";
import { createGlobalStyle } from "styled-components";

import { AppContent } from "./components/AppContent";


const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:3000/graphql",
  }),
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
