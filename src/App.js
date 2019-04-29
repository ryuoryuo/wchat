import { hot } from "react-hot-loader/root";
import React from "react";

import { AppContent } from "./components/AppContent";

import { Normalize } from "styled-normalize";

const App = () => (
  <>
    <Normalize />
    <AppContent />
  </>
);

export default hot(App);
