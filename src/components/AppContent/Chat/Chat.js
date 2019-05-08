import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { Field, Container, MessageCard } from "#/ui";

import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import { TypingStatus } from "./TypingStatus";

import { useDebounce } from "#/lib/hooks";


const SEND_MESSGAE = gql`
  mutation($input: InputData!) {
    sendMessage(input: $input)
  }
`;

const MessagesList = styled.div`
  display: flex;
  position: relative;
  background-color: lightcyan;
  overflow: auto;
  padding-left: 20px;
  padding-top: 10px;
  flex: 1;
  flex-direction: column;
`;

export const Chat = ({ messages }) => {
  const [inputValue, setInputValue] = useState("");
  const debouncedInputValue = useDebounce(inputValue, 2000);
  const listRef = useRef(null);

  useEffect(() => {
    // socket.emit("typing", false);
  }, [debouncedInputValue]);

  useEffect(() => {
    updateListScroll();
  }, [messages]);

  const updateListScroll = () => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  };

  // const fetchMessages = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3000/messages");

  //     const data = await response.json();

  //     setMessageList(data);
  //   } catch (error) {
  //     console.log(error, "error");
  //   }
  // };

  // const sendMessage = event => {
  //   event.preventDefault();

  //   if (!inputValue.trim()) return;

  //   // socket.emit("msg", inputValue);
  //   setInputValue("");
  // };

  const onFieldChange = ({ target: { value } }) => {
    setInputValue(value);

    // socket.emit("typing", true);
  };

  return (
    <Container flexDirection="column" flex={1}>
      <MessagesList ref={listRef}>
        {messages.map(item => (
          <MessageCard data={item} />
        ))}
        <TypingStatus />
      </MessagesList>
      <Mutation
        mutation={SEND_MESSGAE}
        onCompleted={({ sendMessage }) => {
          if (sendMessage) {
            setInputValue("");
          }
        }}
      >
        {sendMessage => (
          <form
            onSubmit={event => {
              event.preventDefault();
              sendMessage({
                variables: { input: { inputValue } },
              });
            }}
          >
            <Field onChange={onFieldChange} value={inputValue} />
          </form>
        )}
      </Mutation>
    </Container>
  );
};
