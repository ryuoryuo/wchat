import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";


const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const TypingSpan = styled.span`
  position: absolute;
  bottom: 10px;
  left: 10px;

  animation: ${fadeIn} 0.2s ease;
`;

export const TypingStatus = () => {
  const [usersTyping, setUsersTyping] = useState([]);
  const userSocket = socket.io.engine.id;

  useEffect(() => {
    socket.on("set typing", users => {
      updateTypingUsers(users);
    });
  }, []);

  const updateTypingUsers = users => {
    const newUsers = [];

    // map users object for deleting current user from users obj
    Object.keys(users).forEach(user => {
      if (user !== userSocket) {
        newUsers.push(users[user]);
      }
    });

    setUsersTyping(newUsers);
  };

  if (usersTyping.length === 0) return null;

  return usersTyping.length > 1 ? (
    <TypingSpan>{`${usersTyping[0]} and  ${usersTyping.length - 1} more are typing...`}</TypingSpan>
  ) : (
    <TypingSpan>{`${usersTyping[0]} typing...`}</TypingSpan>
  );
};
