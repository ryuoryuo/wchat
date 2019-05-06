import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import { Header } from "./Header";
import { Chat } from "./Chat";
import { UsersList } from "./UsersList";

import { loadState, saveState } from "#/lib/localStorage";

import { LoginScreen } from "#/components/LoginScreen";

import { Container } from "#/ui";


const ContentWrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
`;

export const AppContent = () => {
  const [needLogin, setNeedLogin] = useState(false);

  useEffect(() => {
    const nickname = loadState("nickname");

    if (nickname) {
      // socket.emit("add user", nickname);
    } else {
      setNeedLogin(true);
    }
  }, []);

  const setNickname = nickname => {
    saveState("nickname", nickname || "Anonymous");
  };

  const onLogin = nickname => {
    setNickname(nickname);
    setNeedLogin(false);
    // socket.emit("add user", nickname);
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
