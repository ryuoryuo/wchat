import React from "react";

import { Header } from "./Header";
import { ChatArea } from "./ChatArea";

import styled from "styled-components";

const ContentWrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
`;
export const AppContent = () => {
  return (
    <ContentWrapper>
      <Header />
      <ChatArea />
    </ContentWrapper>
  );
};
