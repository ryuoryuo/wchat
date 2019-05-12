import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

import { Field } from "#/ui";

import { loadState } from "#/lib/localStorage";


const CONNECTION_UPDATE = gql`
  mutation($connection: ConnectionData!) {
    connectionUpdate(connection: $connection)
  }
`;

const LoginContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 30%;
  padding-right: 30%;
  flex-direction: column;
  background-color: mediumaquamarine;
`;

const ScreenTitle = styled.h1`
  margin-top: 0;
`;

const StyledForm = styled.form`
  width: 100%;
`;

export const LoginScreen = ({ onLogin }) => {
  const [inputValue, setInputValue] = useState("");
  const [currentNickname, setCurrentNickname] = useState(null);

  useEffect(() => {
    const nickname = loadState("nickname");

    if (nickname) setCurrentNickname(nickname);
  }, []);

  return (
    <Mutation mutation={CONNECTION_UPDATE}>
      {connectionUpdate => {
        if (currentNickname) {
          connectionUpdate({
            variables: { connection: { username: currentNickname, connected: true } },
          });
          onLogin(currentNickname);
        }

        const onSubmit = event => {
          event.preventDefault();

          connectionUpdate({
            variables: { connection: { username: inputValue, connected: true } },
          });
          onLogin(inputValue);
        };

        return (
          <LoginContainer>
            <ScreenTitle>Enter your username:</ScreenTitle>
            <StyledForm onSubmit={onSubmit}>
              <Field
                value={inputValue}
                onChange={event => setInputValue(event.target.value)}
                placeholder="You can leave it empty"
              />
            </StyledForm>
          </LoginContainer>
        );
      }}
    </Mutation>
  );
};
