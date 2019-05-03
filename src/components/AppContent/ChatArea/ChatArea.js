import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Field, Container } from "#/ui";


const MessagesList = styled.div`
  width: 100%;
  background-color: lightcyan;
  overflow: auto;
  display: flex;
  flex: 1;
`;

export const ChatArea = () => {
  const [inputValue, setInputValue] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    fetchMessages();

    socket.on("chat message", msg => {
      setMessageList(prevList => [...prevList, msg]);
    });
  }, []);

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
    socket.emit("msg", inputValue);
    setInputValue("");
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
      </MessagesList>
      <form onSubmit={sendMessage}>
        <Field onChange={e => setInputValue(e.target.value)} value={inputValue} />
      </form>
    </Container>
  );
};
