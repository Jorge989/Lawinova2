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
  height: 540px;

  margin-top: 100px;

.cartao{

  width:70px;
  height:60px;
  margin-top:193px;
  margin-left:-5px;
}
  .formBox {
 
    display: flex;
    padding: 17px;

    justify-content: center;
    flex-direction: column;
    width: 90%;
    margin-top: 10px;
    border-radius: 0px 5px 5px 0px;


  
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
   


    
    

    
    }
    .envolta{
      display:flex;
      justify-content:center;
      flex-direction:row;
      margin-left:30%;
      justify-content:space-between;
     
      width:100%;
      height:100%;
  

    }
    .resumo{
    
      display:flex;
      flex-direction:column;
align-items:center;
      justify-content:center;
width:35%;
height:100%;
margin-left:10px;

      
    }
    .dentro{
      margin-top:1.2%;
    
      width:90%;
      height:100%;
    
    }
    .resumopedido{
      display: flex;
      justify-content:center;
 justify-content:center;
 font-size:19px;
 margin-bottom:10px;
    
    }
    .planoS{
      
      width:80%;
      display:flex;
      flex-direction:row;
      justify-content:space-between;
      align-items:center;
      margin-left:10%;

    }
    .money{
     font-weight:500;
    }
    .planoS2{

      width:88.5%;
      display:flex;
      flex-direction:row;
      justify-content:space-between;
      align-items:center;
      

    }
    .money2{
     font-weight:500;
     color:#941AF9;
    }
    .hr2{
      display:flex;
      align-items:center;
      margin-left:10%;
  justify-content:center;
      background-color:#BBBBBB;
      height:0.3%;
      width:80%;
      margin-top:-9%;
    }
    .resumodoplano{
      display:flex;
      flex-direction:column;
      justify-content:flex-start;
      align-items:start;
      margin-left:10%;
      ul{
        margin-top:1%;
        display:flex;
        flex-direction:column;
        justify-content:flex-start;
        align-items:start;
        list-style:none;
        font-size:14px;
      }
    }
    hr{
      display:flex;
      align-items:center;
      margin-left:10%;
  justify-content:center;
      background-color:#BBBBBB;
      height:0.3%;
      width:80%;
    }
    .div1{
      display:flex;
      flex-direction:column;
      justify-content:space-between;
      align-items:center;
 
      width:55%;
      margin-left:10%;
      margin-top:1%;
    
     
    }
    .input1 {
      width: 97%;
      margin-right:10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .input2 {
      width: 97%;
      margin-right:10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;


  
    }
    .div4{

      display:flex;
      margin-bottom:100px;
      flex-direction:row;
      justify-content:space-between;
      gap:14px;
      align-items:center;
      margin-right:0%;
      width:100%;

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
      width: 46%;
  
      margin-left:0px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

  
    }
    .input9 {
      width: 46%;
      margin-right:14px;
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
      margin-right:3%;

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
font-size:15px;
font-weight:500;
cursor:pointer;
vertical-align: middle;

&:hover {
          background-color: #941AF9;
        }
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
vertical-align: middle;
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

  width: 100%;
  height: 650px;

  margin-top: 100px;

  .cartao{

width:75px;
height:65px;
margin-top:190px;
margin-left:5px;
}
  .formBox {
    display: flex;
    padding: 17px;

    justify-content: center;
    flex-direction: column;
    width: 100%;
    margin-top: 10px;
    border-radius: 0px 5px 5px 0px;

  
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
  

    
    

    
    }
    .envolta{
      display:flex;
      flex-direction:row;
      justify-content:space-between;
     margin-right:37%;
      width:100%;
      height:100%;

    }
    .resumo{
      display:flex;
      flex-direction:column;
      justify-content:center;
align-items:center;
width:100%;
height:100%;

      
    }
    .dentro{
      margin-top:1.2%;
    
      width:90%;
      height:100%;
    }
    .resumopedido{
      display: flex;
      justify-content:center;
 justify-content:center;
 font-size:19px;
 margin-bottom:10px;
    
    }
    .planoS{
      
      width:80%;
      display:flex;
      flex-direction:row;
      justify-content:space-between;
      align-items:center;
      margin-left:10%;

    }
    .money{
     font-weight:500;
    }
    .planoS2{

      width:88.5%;
      display:flex;
      flex-direction:row;
      justify-content:space-between;
      align-items:center;
      

    }
    .money2{
     font-weight:500;
     color:#941AF9;
    }
    .hr2{
      display:flex;
      align-items:center;
      margin-left:10%;
  justify-content:center;
      background-color:#BBBBBB;
      height:0.3%;
      width:80%;
      margin-top:-6.5%;
    }
    .resumodoplano{
      display:flex;
      flex-direction:column;
      justify-content:flex-start;
      align-items:start;
      margin-left:10%;
      ul{
        margin-top:1%;
        display:flex;
        flex-direction:column;
        justify-content:flex-start;
        align-items:start;
        list-style:none;
        font-size:14px;
      }
    }
    hr{
      display:flex;
      align-items:center;
      margin-left:10%;
  justify-content:center;
      background-color:#BBBBBB;
      height:0.3%;
      width:80%;
    }
    .div1{
      display:flex;
      flex-direction:column;
      justify-content:space-between;
      align-items:center;
 
      width:40%;
      margin-left:10%;
      margin-top:1%;
     
    }
    .input1 {
      width: 97%;
      margin-right:10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .input2 {
      width: 97%;
      margin-right:10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
 

  
    }
    .div4{

      display:flex;
      margin-bottom:100px;
      flex-direction:row;
      justify-content:space-between;
      align-items:center;
      margin-right:0%;
      width:100%;

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
      width: 45%;
  
      margin-left:0px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;


  
    }
    .input9 {
      width: 45%;
      margin-right:10px;
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
  
      width:90%;
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
font-size:15px;
font-weight:500;
cursor:pointer;
vertical-align: middle;
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
vertical-align: middle;
&:hover{
  background-color:#F3F3F3;
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
  height: 800px;

  margin-top: 65px;
  .cartao{
display:none;
width:75px;
height:65px;
margin-top:190px;
margin-left:-5px;
}
  .formBox {
    display: flex;
    padding: 17px;

    justify-content: center;
    flex-direction: column;
    width: 100%;
    margin-top: 10px;
    border-radius: 0px 5px 5px 0px;

  
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
  

    
    

    
    }
    .envolta{
      display:flex;
      flex-direction:column;
      justify-content:space-between;
     margin-right:30%;
      width:100%;
      height:100%;
   
    }
    .resumo{
      margin-top:-5%;
      display:flex;
      flex-direction:column;
      justify-content:center;
align-items:center;
width:100%;
height:100%;


      
    }
    .dentro{
      margin-top:1.2%;
    margin-left:-5%;
      width:100%;
      height:100%;
    }
    .resumopedido{
      display: flex;
      justify-content:center;
 justify-content:center;
 font-size:19px;
 margin-bottom:10px;
    
    }
    .planoS{
      
      width:80%;
      display:flex;
      flex-direction:row;
      justify-content:space-between;
      align-items:center;
      margin-left:10%;

    }
    .money{
     font-weight:500;
    }
    .planoS2{

      width:88.5%;
      display:flex;
      flex-direction:row;
      justify-content:space-between;
      align-items:center;
      

    }
    .money2{
     font-weight:500;
     color:#941AF9;
    }
    .hr2{
      display:flex;
      align-items:center;
      margin-left:10%;
  justify-content:center;
      background-color:#BBBBBB;
      height:0.3%;
      width:80%;
      margin-top:-6.5%;
    }
    .resumodoplano{
      display:flex;
      flex-direction:column;
      justify-content:flex-start;
      align-items:start;
      margin-left:10%;
      ul{
        margin-top:1%;
        display:flex;
        flex-direction:column;
        justify-content:flex-start;
        align-items:start;
        list-style:none;
        font-size:14px;
      }
    }
    hr{
      display:flex;
      align-items:center;
      margin-left:10%;
  justify-content:center;
      background-color:#BBBBBB;
      height:0.3%;
      width:80%;
    }
    .div1{
      display:flex;
      flex-direction:column;
      justify-content:space-between;
      align-items:center;
 
      width:100%;
      margin-left:0%;
      margin-top:1%;
     
    }
    .input1 {
      width: 97%;
      margin-right:10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .input2 {
      width: 97%;
      margin-right:10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
 

  
    }
    .div4{

      display:flex;
      margin-bottom:100px;
      flex-direction:row;
      justify-content:space-between;
      align-items:center;
      margin-right:0%;
      width:100%;

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
      width: 45%;
  
      margin-left:0px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;


  
    }
    .input9 {
      width: 45%;
      margin-right:10px;
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
      height:150px;
     
      margin-top:10%;
      margin-right:5%;

    }
    button {
      width: fit-content;
      align-items:center;
      width: 100%;
      height: 40px;
      text-align: center;
      
    }
    .btnazul {
      width: 99%;
      margin-right:0px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
background-color: #74469A;
font-size:15px;
font-weight:500;
cursor:pointer;
vertical-align: middle;
    }
    .btnazul1 {
      width: 99%;
      margin-left:0px;
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
vertical-align: middle;
&:hover{
  background-color:#F3F3F3;
}

    }

  
    
  }}}
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
