import styled, { css } from "styled-components";
import Tooltip from "../Tolltip";

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background-color: #fff;
  padding-left: 5px;
  position: relative;

  margin-top: 5px;
  width: 100%;
  height: 40px;
  border-radius: 5px;

  outline: 0;
  display: flex;
  align-items: center;
border: 1px solid #C4C4C4;
  & + div {
    margin-top: 4%;
  }
  ${(props) =>
    props.isErrored &&
    css`
      color: #f90909;
      border-color: #ff0045;
    `}
  ${(props) =>
    props.isFocused &&
    css`
      color: #4040ff;
      border-color: #4040ff;
    `}

${(props) =>
    props.isFilled &&
    css`
      color: #4040ff;
      border-color: #4040ff;
    `}

>input {
    z-index: 999;
    outline: 0;
    border: 0;
    flex: 1;
    background: transparent;
    &::placeholder {
      color: #666360;
    }
  }

  > svg {
    width: 10;
    margin-right: 10px;
    color: #666360;
    ${(props) =>
      props.isFocused &&
      css`
        color: #4040ff;
      `}
    ${(props) =>
      props.isFilled &&
      css`
        color: #4040ff;
      `}
  }
  @media (max-width: 601px) {
   

    height: 45px;
  
  
  ${(props) =>
    props.isErrored &&
    
    css`
      color: #f90909;
      border-color: #ff0045;
    `}
  ${(props) =>
    props.isFocused &&
    css`
      color: #4040ff;
      border-color: #4040ff;
    `}

    ${(props) =>
    props.isFilled &&
    css`
      color: #4040ff;
      border-color: #4040ff;
    `}

>input {
    z-index: 999;
    outline: 0;
    border: 0;
    flex: 1;
    background: transparent;
    &::placeholder {
      color: #666360;
    }
  }

  > svg {
    width: 30px;
    margin-right: 10px;
    color: #666360;
    ${(props) =>
      props.isFocused &&
      css`
        color: #4040ff;
      `}
    ${(props) =>
      props.isFilled &&
      css`
        color: #4040ff;
      `}
    }
  }
`;
export const Error = styled(Tooltip)`
  svg {
    margin-right: 16px;
    
  }

  @media (max-width: 601px) {
    svg {
      margin-right: 16px;
    }
  }
`;
export const PasswordButtonContainer = styled.button`
  color: #6C6F80;
  outline :0;
  width:auto !important;
  cursor:pointer;

  & > * {
    cursor: pointer;
    margin-left:45%;
    margin-top:10%;
  }

  &:hover {
    color: #007AFF;
  }

 
`;
