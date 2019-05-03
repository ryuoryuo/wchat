import React from "react";
import styled from "styled-components";


const StyledInput = styled.input`
  width: 100%;
  height: 40px;
  box-sizing: border-box;
`;

export const Field = ({ value, onChange, ...props }) => (
  <StyledInput value={value} onChange={onChange} {...props} />
);
