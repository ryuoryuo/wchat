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

    // socket.on("set users", users => {
    //   setUsers(users);
    // });
  }, []);

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
