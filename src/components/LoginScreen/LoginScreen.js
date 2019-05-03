import React, { useState } from "react";
import styled from "styled-components";

import { Field } from "#/ui";


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

  const onSubmit = event => {
    event.preventDefault();

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
};
