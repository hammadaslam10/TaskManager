import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #f5f5f5;
    color: #333;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export const StyledButton = styled.button`
  background-color: #f0b51b;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d99f17;
  }

  &:disabled {
    background-color: #e0e0e0;
    color: #a0a0a0;
    cursor: not-allowed;
  }
    
`;
