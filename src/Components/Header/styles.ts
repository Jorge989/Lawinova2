import styled from "styled-components";

import { NavLink as Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

export const HeaderContainer = styled.header`
  width: 100%;
  height: 75px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 5px;
  position: relative;
  position: fixed;
  top: 0;
  z-index: 9999;
  .btnimg{
    outline:0;
    cursor:pointer;
  
  }
`;

export const Nav = styled.nav`
  width: 100%;
  height: 100%;
  max-width: 1280px;
  color: #a4a4a4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 0 16px;
`;

export const NavLink = styled(Link)`
  color: #000;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  text-decoration: none;
  cursor: pointer;

  &.active {
    color: #15cdfc;
  }

  &:hover {
    color: #007aff;
    text-decoration: underline;
  }
`;

export const Bars = styled(FaBars)`
  color: #000000;
`;

export const NavItems = styled.div`
  display: flex;
  align-items: center;
button{

  margin-left:-3%;
  margin-top:3px;
}
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
margin-left:1%;
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  padding: 10px 22px 0px;
  margin-right: 16px;
  color: #000;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  white-space: nowrap;

  svg {
    color: #000;
  }
  &:hover {
    svg {
      color: #007aff;
    }
  }
`;

export const Dropdown = styled.div`
  display: inline-block;
  @media (min-width: 901px) {
    display: none;
  }
`;

export const DropdownToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  border: 0;
  outline: 0;
  background: transparent;
  cursor: pointer;
`;

export const DropdownContainer = styled.div`
  position: absolute;
  right: 0;
  top: 76px;
  width: 100%;
  max-width: 320px;

  z-index: 9999;
  background: #1d1d1d;
  border: 0;
  outline: 0;
  font: 500 16px Roboto;
  color: #f1f1f1;
  padding: 8px;
  display: flex;
  align-items: center;
  animation: drop 0.5s ease;

  @keyframes drop {
    0% {
      transform: translateX(160px);
    }

    100% {
      transform: translateX(0);
    }
  }
`;

export const DropdownMenu = styled.div`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

export const DropdownItem = styled.button`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 32px;
  background: transparent;
  border: 0;
  outline: 0;
  color: #ffffff;

  &:hover {
    background: #4a5163;
    cursor: pointer;
  }

  hr {
    width: 100%;
    height: 1px;
    background-color: #fff;
  }

  a {
    color: #fff;
    font-weight: 500;
    text-decoration: none;
    font-size: 20px;
    line-height: 35px;
  }
`;
