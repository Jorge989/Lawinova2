import styled from 'styled-components'

import {NavLink as Link} from 'react-router-dom'
import {FaBars} from 'react-icons/fa'

export const Menu = styled.div`
display:none;

@media screen and (max-width: 900px){

  
  background-color:#1D1D1D;
border-radius:3px;
display:flex;
/* display:none; */
position:static;
margin-left:60%;
z-index:10;
justify-content:center;
right:0;
  width:40%;
  height:155px;
  color:#fff;
   animation: drop 0.5s ease forwards;
    @keyframes drop {
      0% {
        transform: translateX(110px);
      }
     
      100% {
        transform: translateX(0px);
      }
    }
  ul{
    list-style:none;
    display:flex;
    justify-content:center;

    flex-direction:column;
    color:#fff;
    hr{
  width:150%;
  height:1px;
background-color:#fff;
}
  }
 
  a{
    color:#fff;
    font-weight:500;
    text-decoration:none;
    font-size:20px;
    line-height: 35px;
  }


}

@media screen and (max-width: 576px){

  
  background-color:#1D1D1D;
border-radius:3px;
display:flex;
/* display:none; */
position: static;
z-index:10;
justify-content:center;
right:0;
margin-left:20%;
  width:100%;
  height:150px;
  color:#fff;
   animation: drop 0.5s ease forwards;
    @keyframes drop {
      0% {
        transform: translateX(110px);
      }
     
      100% {
        transform: translateX(0px);
      }
    }
  ul{
    list-style:none;
    display:flex;
    flex-direction:column;
    color:#fff;
  }
 
  a{
    color:#fff;
    font-weight:500;
    text-decoration:none;
    font-size:20px;
    line-height: 35px;
  }


}
`;




export const Nav = styled.nav`
display:flex;
background-color:#fff;
box-shadow: 0px 0px 5px;
  color: #a4a4a4;
height:70px;
display:flex;
/* justify-content: space-between; */
padding: 0.5rem calc((100vw - 1000px) /2);
z-index:2;
justify-content:flex-start;
.btnimg{
  width:15%;
cursor:pointer;

  margin-left:-15%;
  img{
 margin-top:-13px;
    width:80%;
   
  }

}
@media screen and (max-width: 900px){
  .btnimg{
  width:15%;
cursor:pointer;

  margin-left:3%;
  img{
    width:100px;
  }

}
}
@media screen and (max-width: 576px){
  
  .btnimg{
  width:15%;
cursor:pointer;

  margin-left:3%;
  img{
    width:100px;
  }

}
}

`;

export const NavLink = styled(Link)`

color: #000;
display: flex;
align-items: center;
padding: 0 1rem;
height: 100%;

cursor: pointer;
text-decoration:none;

&.active{
  color: #15cdfc;
}


`;

export const Bars = styled(FaBars)`
display:none;
color: #000;

@media screen and (max-width: 900px){
  display:block;
  position:absolute;
  top:0;
  right:0;
  transform: translate(-100%, 75%);
  font-size: 1.8rem;
  cursor: pointer;
 
}
@media screen and (max-width: 576px){
  display:block;
  position:absolute;
  top:0;
  right:0;
  transform: translate(-100%, 75%);
  font-size: 1.8rem;
  cursor: pointer;
  div{
    background-color:red;
  }
}
`;

export const NavMenu = styled.div`

  
 
  .cool-link1:hover {
    color: #007aff;
  }
  .cool-link:hover {
    color: #007aff;
  }
  .cool-link2:hover {
    color: #007aff;
  }
  .cool-link3:hover {
    color: #007aff;
  }
  .cool-link4{
    margin-left:20%;
    font-size:21px;
    font-weight:400;
  }
  .cool-link4:hover {
    color: #007aff;
 
  }
   
 
 
display: flex;
align-items: center;
/* margin-right:-24px; */
/* margin-right:24px; */
width:100vw;
white-space: nowrap;

@media screen and (max-width: 900px){
  display:none;
}
@media screen and (max-width: 576px){
  display:none;
}
`

export const NavBtn = styled.nav`

display:flex;
align-items:center;
margin-right: 24px;
justify-content:flex-end;
width: 0vw;
@media screen and (max-width: 900px){
  border-radius:4px;
margin-left:60%;
width:10%;
height:100%;
padding: 0px 0px 10px;

color: #000;
border: none;

outline: none;
cursor: pointer;
transition: all 0.2s ease-in-out;
text-decoration:none;
white-space: nowrap;

/* margin-left:24px; */
svg{
  display:flex;
align-items:center;
justify-content:center;
  color: #000;
width:32px;
height:45px;
}
svg:hover{
  transition: all 0.2s ease-in-out;
 
  color: #007aff;
}
}
@media screen and (max-width: 576px){
  display:none;
}

`


export const NavBtnLink = styled(Link)`

border-radius:4px;

padding: 10px 22px 0px;
color: #000;
border: none;

outline: none;
cursor: pointer;
transition: all 0.2s ease-in-out;
text-decoration:none;
white-space: nowrap;
/* margin-left:24px; */
svg{
  color: #000;

}
svg:hover{
  transition: all 0.2s ease-in-out;
 
  color: #007aff;
}


`
