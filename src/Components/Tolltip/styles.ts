import styled from "styled-components";

export const Container = styled.div`
  position: relative;

  span {
    width: 150px;

    background: #fff;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;

    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;
    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);
    border:solid 1px #f90909;
    color: #f90909;

    &::before {
      content: "";
      border-style: solid;
      border-color: #f90909 transparent;
      
      border-width: 4px 4px 0 4px;
      top: 100%;
      position: absolute;

      left: 45%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
  @media (max-width: 601px) {
    position: relative;

span {
  width: 135px;
  background: #f90909;
  padding: 8px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;

  opacity: 0;
  transition: opacity 0.4s;
  visibility: hidden;
  position: absolute;
  bottom: calc(100% + 12px);
  left: 40%;
  transform: translateX(-50%);
  color: #fff;

  &::before {
    content: "";
    border-style: solid;
    border-color: #f90909 transparent;
    border-width: 6px 6px 0 6px;
    top: 100%;
    position: absolute;

    left: 45%;
    transform: translateX(-50%);
  }
}

&:hover span {
  opacity: 1;
  visibility: visible;
}
  }
`;
