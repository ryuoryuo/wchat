import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Field, Container } from "#/ui";

import { TypingStatus } from "./TypingStatus";

import { useDebounce } from "#/lib/hooks";


const MessagesList = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  background-color: lightcyan;
  overflow: auto;
  flex: 1;
  flex-direction: column;
`;

export const ChatArea = () => {
  const [inputValue, setInputValue] = useState("");
  const [messageList, setMessageList] = useState([]);
  const debouncedInputValue = useDebounce(inputValue, 2000);

  useEffect(() => {
    fetchMessages();

    socket.on("chat message", msg => {
      setMessageList(prevList => [...prevList, msg]);
    });
  }, []);

  useEffect(() => {
    socket.emit("typing", false);
  }, [debouncedInputValue]);

  const fetchMessages = async () => {
    try {
      const response = await fetch("http://localhost:3000/messages");

      const data = await response.json();

      setMessageList(data);
    } catch (error) {}
  };

  const sendMessage = event => {
    event.preventDefault();
    socket.emit("msg", inputValue);
    setInputValue("");
  };

  const onFieldChange = ({ target: { value } }) => {
    setInputValue(value);

    socket.emit("typing", true);
  };

  return (
    <Container flexDirection="column" flex={1}>
      <MessagesList>
        {messageList.map(item => (
          <>
            {item}
            <br />
          </>
        ))}
        <TypingStatus />
      </MessagesList>
      <form onSubmit={sendMessage}>
        <Field onChange={onFieldChange} value={inputValue} />
      </form>
    </Container>
  );
};
