import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Field } from "#/ui";


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
    socket.on("chat message", msg => {
      setMessageList(prevList => [...prevList, msg]);
    });
  }, []);

  const sendMessage = event => {
    event.preventDefault();
    socket.emit("msg", inputValue);
    setInputValue("");
  };

  return (
    <>
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
    </>
  );
};
