import React from "react";

import styled from "styled-components";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: lightskyblue;
  height: 40px;
`;

export const Header = () => <HeaderWrapper>Chat</HeaderWrapper>;
