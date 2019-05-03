import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Header } from "./Header";
import { ChatArea } from "./ChatArea";

import { loadState, saveState } from "#/lib/localStorage";

import { LoginScreen } from "#/components/LoginScreen";


const ContentWrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
`;

export const AppContent = () => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const nickname = loadState("nickname");

    if (nickname) {
      setIsLogged(true);
      socket.emit("setNickname", nickname);
    }
  }, []);

  const setNickname = nickname => {
    saveState("nickname", nickname || "Anonymous");
  };

  const onLogin = nickname => {
    setNickname(nickname);
    setIsLogged(true);
  };

  if (!isLogged) return <LoginScreen onLogin={onLogin} />;

  return (
    <ContentWrapper>
      <Header />
      <ChatArea />
    </ContentWrapper>
  );
};
