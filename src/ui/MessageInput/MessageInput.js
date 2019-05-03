import React from "react";

import styled from "styled-components";

const a = 2;
const StyledInput = styled.input`
  width: 100%;
  height: 40px;
  box-sizing: border-box;
`;

export const MessageInput = ({ value, onChange }) => (
  <StyledInput value={value} onChange={onChange} />
);
