import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { Field, Container, MessageCard } from "#/ui";

import { TypingStatus } from "./TypingStatus";

import { useDebounce } from "#/lib/hooks";


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

export const ChatArea = () => {
  const [inputValue, setInputValue] = useState("");
  const [messageList, setMessageList] = useState([]);
  const debouncedInputValue = useDebounce(inputValue, 2000);
  const listRef = useRef(null);

  useEffect(() => {
    fetchMessages();

    socket.on("chat message", msg => {
      setMessageList(prevList => [...prevList, msg]);
    });
  }, []);

  useEffect(() => {
    socket.emit("typing", false);
  }, [debouncedInputValue]);

  useEffect(() => {
    updateListScroll();
  }, [messageList]);

  const updateListScroll = () => {
    if (listRef.current) {
      console.log("EXECUTING", listRef.current.scrollTop);
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch("http://localhost:3000/messages");

      const data = await response.json();

      setMessageList(data);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const sendMessage = event => {
    event.preventDefault();

    if (!inputValue.trim()) return;

    socket.emit("msg", inputValue);
    setInputValue("");
  };

  const onFieldChange = ({ target: { value } }) => {
    setInputValue(value);

    socket.emit("typing", true);
  };

  return (
    <Container flexDirection="column" flex={1}>
      <MessagesList ref={listRef}>
        {messageList.map(item => (
          <MessageCard data={item} />
        ))}
        <TypingStatus />
      </MessagesList>
      <form onSubmit={sendMessage}>
        <Field onChange={onFieldChange} value={inputValue} />
      </form>
    </Container>
  );
};
