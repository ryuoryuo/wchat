import React, { useState, useEffect } from "react";
import styled from "styled-components";


const UsersContainer = styled.div`
  width: 20%;
  background-color: white;
  overflow: auto;
  display: flex;
  border-right: 1px solid black;
`;

export const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();

    socket.on("set users", users => {
      setUsers(users);
    });
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/users");

      const data = await response.json();

      setUsers(data);
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <UsersContainer>
      {users.map(item => (
        <>
          {item}
          <br />
        </>
      ))}
    </UsersContainer>
  );
};
