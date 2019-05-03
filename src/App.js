import { hot } from "react-hot-loader/root";
import React from "react";
import { Normalize } from "styled-normalize";
import { createGlobalStyle } from "styled-components";

import { AppContent } from "./components/AppContent";


const GlobalStyle = createGlobalStyle`
  body {
   font-family: Roboto, sans-serif;
  }
`;

const App = () => (
  <>
    <GlobalStyle />
    <Normalize />
    <AppContent />
  </>
);

export default hot(App);
