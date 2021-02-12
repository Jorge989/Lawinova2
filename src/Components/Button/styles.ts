import styled, { css } from 'styled-components';
interface ContainerProps {
  isLoading?: boolean;
}
export const Container = styled.button<ContainerProps>`
  outline: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 5px 5px #a4a4a4;
  cursor: pointer;
  margin-top: 16px;
 
  border-radius: 5px;
  background-color: #8A44C4;
  ;
  color: #fff;
  font-size: 20px;
  font-weight: 400;
  width: 100%;
  height: 9.5%;
  > a {
    text-decoration: none;
    color: #fff;
  }
  ${(props) =>
    props.isLoading &&
    css`
      &:after {
          content: "";
          animation: spin 500ms linear infinite;
          position: relative;
          margin-left: 1rem;
          width: 1rem;
          height: 1rem;
          border: 2px solid #fff;
          border-top-color: transparent;
          border-left-color: transparent;
          border-radius: 50%;
          animation:spin 500ms linear infinite;
          opacity:1;
        }
    `}
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(380deg);
      }
    }
  &:hover {
    background-color: #623984;

   
  
  ${(props) =>
    props.isLoading &&
    css`
      &:after {
          content: "";
          animation: spin 500ms linear infinite;
          position: relative;
          margin-left: 1rem;
          width: 1rem;
          height: 1rem;
          border: 2px solid #fff;
          border-top-color: transparent;
          border-left-color: transparent;
          border-radius: 50%;
          animation:spin 500ms linear infinite;
          opacity:1;
        }
    `}
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(380deg);
      }
    }
  &:hover {
    background-color: #623984;

   
  }
  }
`;