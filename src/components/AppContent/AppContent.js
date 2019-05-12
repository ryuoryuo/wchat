import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Header } from "./Header";
import { Chat } from "./Chat";
import { UsersList } from "./UsersList";

import { saveState } from "#/lib/localStorage";

import { LoginScreen } from "#/components/LoginScreen";

import { Container } from "#/ui";


const ContentWrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
`;

export const AppContent = () => {
  const [needLogin, setNeedLogin] = useState(true);

  const setNickname = nickname => {
    saveState("nickname", nickname || "Anonymous");
  };

  const onLogin = nickname => {
    setNickname(nickname);
    setNeedLogin(false);
  };

  if (needLogin) return <LoginScreen onLogin={onLogin} />;

  return (
    <ContentWrapper>
      <Header />
      <Container height="100%">
        <UsersList />
        <Chat />
      </Container>
    </ContentWrapper>
  );
};
