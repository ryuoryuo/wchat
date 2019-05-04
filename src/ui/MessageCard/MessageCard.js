import React from "react";
import styled from "styled-components";

import { Container } from "#/ui";


const MessageWrapper = styled.div`
  position: relative;
  background-color: #5bc0be;
  min-width: 150px;
  max-width: 60vw;
  box-sizing: border-box;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 4px;
  margin-bottom: 10px;

  &::before {
    position: absolute;
    content: "";
    width: 15px;
    height: 10px;
    bottom: 0;
    left: -10px;
    background-color: #5bc0be;
    z-index: -3;
  }
  &::after {
    position: absolute;
    content: "";
    width: 32px;
    height: 20px;
    border-radius: 100%;
    bottom: 0px;
    left: -32px;
    background-color: lightcyan;
    z-index: -2;
  }
`;

const Username = styled.p`
  font-weight: 600;
  margin-top: 6px;
  font-size: 14px;
  margin-bottom: 0;
  cursor: pointer;
`;

const Message = styled.p`
  font-weight: 400;
  margin-top: 10px;
  font-size: 12px;
  margin-bottom: 6px;
  margin-top: 6px;
  word-wrap: break-word;
`;

const Avatar = styled.div`
  border-radius: 100%;
  z-index: 124;
  margin-top: auto;
  margin-bottom: 10px;
  margin-right: 10px;
  width: 30px;
  height: 30px;
  background-color: steelblue;
`;

export const MessageCard = ({ data: { message, username } }) => (
  <Container zIndex={5} flex="0 0 auto">
    <Avatar />
    <MessageWrapper>
      <Username>{username}</Username>
      <Message>{message}</Message>
    </MessageWrapper>
  </Container>
);
