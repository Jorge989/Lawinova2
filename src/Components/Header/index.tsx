import React,{useState} from "react";
import { FiFacebook } from "react-icons/fi";
import { FiLinkedin } from "react-icons/fi";
import { FiTwitter } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";
import { FiBarChart } from "react-icons/fi";

import {
 Nav,
 Menu,
 NavLink,
 Bars,
 NavMenu,
NavBtn,
NavBtnLink,
 
  } from "./styles";
import Logo from "../../assets/principal.png";
const Header: React.FC = () => {
  const [isShow, setIsShow] = useState(false);
  return (
    <>
  <Nav>
    <button className="btnimg">
      <img src={Logo} className="logo"/>
      </button>
    <NavLink to="login">
       </NavLink>
   <button onClick={() => setIsShow(!isShow)}>
    <Bars/>
    </button>
    <NavMenu  >
      <NavLink to="/about" className="cool-link1">
Site da Empresa/Produto
      </NavLink>
      <NavLink to="/about"className="cool-link" >
Planos
      </NavLink> 
      <NavLink to="/about" className="cool-link2">
Perguntas Frequentes
      </NavLink>
      <NavLink to="/about" className="cool-link3">
Casos de Sucesso
      </NavLink>
      <NavLink to="/about" className="cool-link4">
Entrar
      </NavLink>
      {/* <NavBtnLink to="/singin">Entrar</NavBtnLink> */}
    </NavMenu>
    <NavBtn>
      <NavBtnLink to="/singin">  <a href="/novocadastro"> <FiShoppingCart  size={24}/></a></NavBtnLink>
    </NavBtn>
        </Nav>
        {isShow && (
        <Menu className="menu">
         <ul>
           <li>  <a href="/about" className="cool-link1">
Planos

      </a></li>
      <hr className="linha"/>
      <li>    <a href="/about" className="cool-link1">
Casos de Sucesso
      </a>     <hr className="linha"/></li>
      <li>    <a href="/about" className="cool-link1">
      Perguntas Frequentes
      </a>     <hr className="linha"/></li>
      <li>      <a href="/about" className="cool-link3">
      Site da Empresa/Produto
      </a></li>
         </ul>
    </Menu>
        )}
        </>
  );
};

export default Header;
