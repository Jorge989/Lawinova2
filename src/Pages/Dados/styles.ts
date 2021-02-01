import styled, { css } from "styled-components";
import { DrawCadastro } from "../../styles/icons";
import { Go } from "../../styles/icons";
import { Lock } from "../../styles/icons";
import { GoogleLogin as CustomGoogleLogin } from "react-google-login";
import { face } from "../../styles/icons";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  max-width: 1350px;
  margin: 0 auto;
  width: 100%;
  z-index: 999;
  
  @media (max-width: 601px) {
    display: flex;
    justify-content: center;
    height: 100%;

    margin: 0 auto;
    width: 100%;
    z-index: 999;
  }
`;

export const Blue = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  background-color: #fff;

  border-radius: 5px 10px 10px 5px;

  width: 70%;
  height: 650px;

  margin-top: 100px;

.radio{
  display:flex;
  justify-content:center;

  margin-right:5.3%;
}
  .formBox {
    display: flex;
    padding: 17px;

    justify-content: center;
    flex-direction: column;
    width: 90%;

    border-radius: 0px 5px 5px 0px;

    .redessociais {
      position: relative;
      display: flex;
      align-items: center;

      .btngoogle {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60.5px;
        margin-top: 8px;

        cursor: pointer;
      }
      .facebook {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 8px;
        width: 64.5px;

        cursor: pointer;
      }
    }
  }
  h2 {
    color: #141414;
    width: 100%;
    height: 20.7px;
    font-weight: 400;
    font-size: 17px;
    margin-top: 13px;
  }
  h3 {
    margin-top: 16px;
    font-size: 29px;
    text-align: center;
    font-weight: 400;
  }
  h4 {
    margin-top: 8px;
    font-weight: 400;
  }
  form {
    margin-top: 1%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left:1%;
    height: 100%;
    width:100%;
  

    .div1{
      display:flex;
      flex-direction:row;
      justify-content:space-between;
      align-items:center;
     
      width:80%;
   
    }
    .input1 {
      width: 40%;
      margin-left:80px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

    
    }
    .div1{
      display:flex;
      flex-direction:row;
      justify-content:space-between;
      align-items:center;
     
      width:80%;
     
    }
  
    .div4{

      display:flex;
      flex-direction:row;
      justify-content:space-between;
      align-items:center;
     
      width:84%;
  
    }
    .input2 {
      width: 30%;
      margin-right:100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
 

  
    }
    
    .div2{
      display:flex;
      flex-direction:column;
      justify-content:space-between;
      align-items:stretch;
     
      width:80%;

    
    .input3 {
      width: 30%;
      margin-left:80px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;


  
    }}
   
    
    .input4 {
      width: 72%;
      margin-left:80px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;


  
    }
    .input5 {
      width: 72%;
      margin-left:80px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;


  
    }
    .div3{
      display:flex;
 
      flex-direction:row;
      justify-content:space-between;
      align-items:center;

     
      width:100%;
     
    }
    .uf{
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
    }
    .input6 {
      width: 45.2%;
     
      margin-left:80px;
    
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
  

label{
  display:flex;
  flex-direction:start;
 justify-content:start;
 align-items:flex-start;
}
  
    } 

     .input7 {
   

      width: 25%;
      margin-right:101px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;


  
    }
    .input8 {
      width: 35%;
  
      margin-left:80px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

     
  
    }
    .input9 {
      width: 60%;
      margin-left:15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;


  
    }
    .btnblue{
      display:flex;
      flex-direction:row;
      justify-content:space-between;
      align-items:center;
  
      width:80%;
      height:500px;
     
      margin-top:0%;
      margin-right:5%;

    }
    button {
      width: fit-content;
      align-items:center;
      width: 27%;
      height: 40px;
      text-align: center;
    }
    .btnazul {
      width: 30%;
      margin-right:105px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
background-color: #74469A;
cursor:pointer;
font-size:15px;
font-weight:500;
    }
    .btnazul1 {
      width: 30%;
      margin-left:115px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
background-color:#F8F8F8;
box-shadow: 0px 5px 5px #BBBBBB;
font-size:15px;
font-weight:500;
align-items:center;
color:#000;
&:hover{
  background-color:#F3F3F3;
}

    }

    .cadastre {
      width: 100%;
      margin-top: 16px;
      a {
        font-weight: 400;
        font-size: 20px;
        color: #101010;
        text-decoration: none;
        &:hover {
          color: #941AF9;
        }
      }
    }
    .possuilogin {
      width: 100%;
      margin-top: 0px;
      a {
        font-weight: 400;
        font-size: 20px;
        color: #232326;
        text-decoration: none;
        &:hover {
          color: #941AF9;
        }
      }
    }
  }
  @media screen and (max-width: 900px) {
    display: flex;
  justify-content: center;
  flex-direction: row;
  background-color: #fff;

  border-radius: 5px 10px 10px 5px;

  width: 635px;
  height: 650px;

  margin-top: 100px;
.radio{
  display:flex;
  justify-content:center;

  margin-right:0%;
}
  .formBox {
    display: flex;
    padding: 17px;

    justify-content: center;
    flex-direction: column;
    width: 100%;

    border-radius: 0px 5px 5px 0px;

    .redessociais {
      position: relative;
      display: flex;
      align-items: center;

      .btngoogle {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60.5px;
        margin-top: 8px;

        cursor: pointer;
      }
      .facebook {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 8px;
        width: 64.5px;

        cursor: pointer;
      }
    }
  }
  h2 {
    color: #141414;
    width: 100%;
    height: 20.7px;
    font-weight: 400;
    font-size: 17px;
    margin-top: 13px;
  }
  h3 {
    margin-top: 16px;
    font-size: 29px;
    text-align: center;
    font-weight: 400;
  }
  h4 {
    margin-top: 8px;
    font-weight: 400;
  }
  form {
    margin-top: 1%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left:-12%;
    height: 100%;
    
    width:125%;

  

    .div1{
      display:flex;
      flex-direction:row;
      justify-content:space-between;
      align-items:center;
     
      width:80%;
   
    }
    .input1 {
      width: 38%;
      margin-left:80px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

    
    }
    .div1{
      display:flex;
      flex-direction:row;
      justify-content:space-between;
      align-items:center;
     
      width:80%;
     
    }
  
    .div4{

      display:flex;
      flex-direction:row;
      justify-content:space-between;
      align-items:center;
     
      width:84%;
  
    }
    .input2 {
      width: 30%;
      margin-right:100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
 

  
    }
    
    .div2{
      display:flex;
      flex-direction:column;
      justify-content:space-between;
      align-items:stretch;
     
      width:80%;
 
    
    .input3 {
      width: 30%;
      margin-left:80px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;


  
    }}
   
    
    .input4 {
      width: 70%;
      margin-left:80px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;


  
    }
    .input5 {
      width: 70%;
      margin-left:80px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;


  
    }
    .div3{
      display:flex;
 
      flex-direction:row;
      justify-content:space-between;
      align-items:center;

     
      width:100%;
     
    }
    .uf{
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
    }
    .input6 {
      width: 42.5%;
     
      margin-left:80px;
    
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

label{
  display:flex;
  flex-direction:start;
 justify-content:start;
 align-items:flex-start;
}
  
    } 

     .input7 {
   

      width: 25%;
      margin-right:101px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;


  
    }
    .input8 {
      width: 30%;
  
      margin-left:80px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;


  
    }
    .input9 {
      width: 55%;
      margin-right:5px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;


  
    }
    .btnblue{
      display:flex;
      flex-direction:row;
      justify-content:space-between;
      align-items:center;
  
      width:80%;
      height:500px;
     
      margin-top:0%;
      margin-right:5%;

    }
    button {
      width: fit-content;
      align-items:center;
      width: 27%;
      height: 40px;
      text-align: center;
    }
    .btnazul {
      width: 30%;
      margin-right:105px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
background-color: #74469A;
cursor:pointer;
    }
    .btnazul1 {
      width: 30%;
      margin-left:115px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
background-color:#F8F8F8;
box-shadow: 0px 5px 5px #BBBBBB;

align-items:center;
color:#000;
&:hover{
  background-color:#F3F3F3;
}

    }

    .cadastre {
      width: 100%;
      margin-top: 16px;
      a {
        font-weight: 400;
        font-size: 20px;
        color: #101010;
        text-decoration: none;
        &:hover {
          color: #941AF9;
        }
      }
    }
    .possuilogin {
      width: 100%;
      margin-top: 0px;
      a {
        font-weight: 400;
        font-size: 20px;
        color: #232326;
        text-decoration: none;
        &:hover {
          color: #941AF9;
        }
      }
    }
  }

  @media screen and (max-width: 576px) {
    display: flex;
  justify-content: center;
  flex-direction: row;
  background-color: #fff;

  border-radius: 5px 10px 10px 5px;

  width: 100%;
  height: 940px;

  margin-top: 100px;
.radio{
  display:flex;
  justify-content:center;

  margin-right:-5%;
}
  .formBox {
    display: flex;
    padding: 17px;

    justify-content: center;
    flex-direction: column;
    width: 100%;

    border-radius: 0px 5px 5px 0px;

    .redessociais {
      position: relative;
      display: flex;
      align-items: center;

      .btngoogle {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60.5px;
        margin-top: 8px;

        cursor: pointer;
      }
      .facebook {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 8px;
        width: 64.5px;

        cursor: pointer;
      }
    }
  }
  h2 {
    color: #141414;
    width: 100%;
    height: 20.7px;
    font-weight: 400;
    font-size: 17px;
    margin-top: 13px;
  }
  h3 {
    margin-top: 16px;
    font-size: 29px;
    text-align: center;
    font-weight: 400;
  }
  h4 {
    margin-top: 8px;
    font-weight: 400;
  }
  form {
    margin-top: 1%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left:0%;
    height: 100%;
    
    width:100%;

    .div1{
      display:flex;
      flex-direction:column;
      justify-content:space-between;
      align-items:center;
     
      width:100%;
 
    }
    .input1 {
      width: 100%;
      margin-left:0px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

    
    }
    .div1{
      display:flex;
      flex-direction:column;
      justify-content:space-between;
      align-items:center;
     
      width:100%;
     
    }
  
    .div4{

      display:flex;
      flex-direction:column;
      justify-content:space-between;
      align-items:center;
     
      width:100%;
  
    }
    .input2 {
      width: 100%;
      margin-right:0px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
 

  
    }
    
    .div2{
      display:flex;
      flex-direction:column;
      justify-content:space-between;
      align-items:stretch;
     
      width:100%;
 
    
    .input3 {
      width: 100%;
      margin-left:0px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;


  
    }}
   
    
    .input4 {
      width: 100%;
      margin-left:0px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;


  
    }
    .input5 {
      width: 100%;
      margin-left:0px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;


  
    }
    .div3{
      display:flex;
 
      flex-direction:column;
      justify-content:space-between;
      align-items:center;

     
      width:100%;
     
    }
    .uf{
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
    }
    .input6 {
      width: 100%;
     
      margin-left:0px;
    
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;


    } 

     .input7 {
   

      width: 100%;
      margin-right:0px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;


  
    }
    .input8 {
      width: 100%;
  
      margin-left:0px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;


  
    }
    .input9 {
      width: 100%;
      margin-left:0px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;


  
    }
    .btnblue{
      display:flex;
      flex-direction:column;
      justify-content:space-between;
      align-items:center;
  
      width:100%;
      height:550px;
     
      margin-top:3%;
      margin-right:0%;

    }
    button {
      width: fit-content;
      align-items:center;
      width: 100%;
      height: 45px;
      text-align: center;
    }
    .btnazul {
      width: 100%;
      margin-right:0px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
background-color: #74469A;
cursor:pointer;
margin-bottom:18px;
    }
    .btnazul1 {
      width: 100%;
      margin-left:0px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
background-color:#F8F8F8;
box-shadow: 0px 5px 5px #BBBBBB;


align-items:center;
color:#000;
&:hover{
  background-color:#F3F3F3;
}

    }

    .cadastre {
      width: 100%;
      margin-top: 16px;
      a {
        font-weight: 400;
        font-size: 20px;
        color: #101010;
        text-decoration: none;
        &:hover {
          color: #941AF9;
        }
      }
    }
    .possuilogin {
      width: 100%;
      margin-top: 0px;
      a {
        font-weight: 400;
        font-size: 20px;
        color: #232326;
        text-decoration: none;
        &:hover {
          color: #941AF9;
        }
      }
    }
  }

  }}
`;

export const GoogleLogin = styled(CustomGoogleLogin)`
  background-color: red;
  margin-left: 200px;
  margin-top: -20%;
position: fixed;
  > button {
    background-color: red;
    margin-top: -30%;
  }
`;
export const Draw = styled(DrawCadastro)``;
export const Facebokcion = styled(face)``;
export const Lockicon1 = styled(Lock)``;
export const Googleicon = styled(Go)``;
