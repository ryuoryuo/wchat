import React from "react";

import styled from "styled-components";

const MessagesList = styled.div`
  width: 100%;
  background-color: lightcyan;
  overflow: auto;
  display: flex;
  flex: 1;
`;

const MessageInput = styled.input`
  width: 100%;
  height: 40px;
  box-sizing: border-box;
`;

export const ChatArea = () => (
  <>
    <MessagesList>
      <br />
      some text
      <br />
      some text
      <br />
    </MessagesList>
    <MessageInput />
  </>
);
