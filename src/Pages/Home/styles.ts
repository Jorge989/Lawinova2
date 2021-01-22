import styled from "styled-components";
import { DrawCadastro } from "../../styles/icons";
import { Lock } from "../../styles/icons";
import { Go } from "../../styles/icons";
import { face } from "../../styles/icons";
import { Personicon } from "../../styles/icons";
import { GoogleLogin as CustomGoogleLogin } from "react-google-login";
export const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  max-width: 1350px;
  margin: 0 auto;
  width: 100%;
  z-index: 999;
  @media (max-width: 576px) {
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
  flex-direction: column;
  background-color: #fff;

  border-radius: 5px 10px 10px 5px;

  width: 70%;
  height: 400px;

  margin-top: 10px;
  .perguntaserespostas{
  margin-top:1%;
  margin-left:12%;
  width:100%;
max-height:20px;


  
  h1{
    line-height:20px;
    font-size:17px;
    font-weight:400;
    color:#6A6A6A;
  }
}
.Menu h1{
  font-size:16px;

}
  .topo{
  display:flex;
width:100%;
height:100%;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  margin-top:5%;

  
}

.bemvindo{
  margin-top:1%;
  font-size:35px;
}
.subtopo{
  font-size:22px;

  }
.dias{
  font-size:22px;
  margin-top:-1%;
  color:#FE2E2E;
  margin-left:4%;
  
}
.ajustetudo{
  width:100%;
  height:100%;
    /* background-color:pink; */
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
  }
  .formBox {
    display: flex;
    padding: 17px;

    justify-content: center;
    flex-direction: column;
    width: 100%;
    background-color: #ffffff;
    /* background-color:blue; */
    height:100%;
    border-radius: 0px 5px 5px 0px;
  
.hora{
  display:flex;
  flex-direction:row;
  line-height:10px;
margin-top:-10%;
 margin-left:63%;

  
 

}




    .input1 {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
     
      margin-left:40%;
      h3{
   font-size:22px;
 }
color: #9B9B9B;
 
    }
    .input2 {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      color: #9B9B9B;
      margin-right:-70%;
 
 h3{
   font-size:22px;
 }
    }
    .all{
      display:flex;
      width:99%;
      height:21%;

  margin-top:2%;
  display:flex;
  flex-direction:row;

  justify-content:center;
  align-items:center;


}

.btn1{
  
  display:flex;
  justify-content:center;
  align-items:center;
 
  width:22%;
  height:120%;
  margin-top:0%;

  .logoplay{
    z-index:999;
    cursor:pointer;
    width:21%;
     margin-left:5%;
    margin-top:5%; 
  }
  .baixar{
    z-index:999;
    width:85%;
    cursor:pointer;
    font-size:17px;
    font-weight:400;
    margin-left:16%;
    margin-top:-29%;
    &:hover {
      color: #2828fc;
    }
 
    
  }
  
  .google{
 
 width:100%;
 font-size:18px;
margin-top:-3%;
margin-left:11%;
font-family:Roboto;
}
>a{
  text-decoration:none;
  z-index:999;
margin-top:1%;
  border-radius:5px;
  width:80%;
height:70%;
  margin-left:0%;
  background-color:#FFFFFF;
color:#101010;
  border: 1px solid #141111;
  cursor:pointer;
}}


.btn2{
   
  display:flex;
  justify-content:center;
  align-items:center;
 
  width:22%;
  height:120%;
  margin-top:0%;

  .logoapp{
    z-index:999;
    cursor:pointer;
    width:21%;
     margin-left:5%;
    margin-top:4%; 
  }
  .baixara{
    z-index:999;
    width:85%;
    cursor:pointer;
    font-size:17px;
    font-weight:400;
    margin-left:16%;
    margin-top:-28%;
    &:hover {
      color: #2828fc;
    }
 
    
  }
  .googlea{
 
    width:100%;
 font-size:18px;
margin-top:-3%;
margin-left:9%;
font-family:Roboto;
}
>a{
  text-decoration:none;
  z-index:999;
margin-top:1%;
  border-radius:5px;
  width:80%;
height:70%;
  margin-left:0%;
  background-color:#FFFFFF;
  color:#101010;
  border: 1px solid #141111;
  cursor:pointer;
}}
    .date{
      color:#101010;
    }
    .faq{
      display:flex;
      justify-content:center;
      align-items:center;
      flex-direction:row;
      background-color:#EEEEEE;
      box-shadow: 0px 5px 5px #BBBBBB;
      border-radius:2px;
      width:23%;
      margin-left:0%;
      margin-top:3%;
      height:14%;
      &:hover{
  background-color:#F3F3F3;
}
    }
    .faqlink{
      display:flex;
      width:100%;
      height:100%;
      display:flex;
      justify-content:center;
      align-items:center;
      text-decoration:none;
    }
    .faqtext{
      display:flex;
      margin-top:0%;
      margin-left:2%;
  text-decoration:none;
      font-size:15px;
      font-weight:500;
      color:#2B2B2B;
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
    font-size: 30px;
    text-align: center;
    font-weight: 400;
  }
  h4 {
    margin-top: 8px;
    font-weight: 400;
  }
  form {
    margin-top: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;


  
    button {
      width: fit-content;
      padding: 0 16px;
      width: 65%;
      height: 40px;
      text-align: center;
    }
    .btnazul {
      text-align: center;
      margin-top: 11%;
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
          color: #007aff;
        }
      }
    }
    .esqueci {
      width: 100%;
      margin-top: 0px;
      a {
        font-weight: 400;
        font-size: 20px;
        color: #232326;
        text-decoration: none;
        &:hover {
          color: #007aff;
        }
      }
    }
    
  }
  
  @media screen and (max-width: 900px) {
    display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;

  border-radius: 5px 10px 10px 5px;

  width: 90%;
  height: 400px;

  margin-top: 20px;
  .perguntaserespostas{
  margin-top:1%;
  margin-left:12%;
  width:100%;
max-height:20px;


  
  h1{
    line-height:20px;
    font-size:17px;
    font-weight:400;
    color:#6A6A6A;
  }
}
.Menu h1{
  font-size:16px;

}
  .topo{
  display:flex;
width:100%;
height:100%;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  margin-top:5%;

  
}

.bemvindo{
  margin-top:5%;
  font-size:35px;
}
.subtopo{
  font-size:22px;

  }
.dias{
  font-size:22px;
  margin-top:-1%;
  color:#FE2E2E;
  margin-left:4%;
  
}
.ajustetudo{
  width:100%;
  height:100%;
    /* background-color:pink; */
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
  }
  .formBox {
    display: flex;
    padding: 17px;

    justify-content: center;
    flex-direction: column;
    width: 100%;
    background-color: #ffffff;
    /* background-color:blue; */
    height:100%;
    border-radius: 0px 5px 5px 0px;
  
.hora{
  display:flex;
  flex-direction:row;
  line-height:10px;
margin-top:-16%;
 margin-left:40%;

  
 

}




    .input1 {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
     
      margin-left:40%;
      h3{
   font-size:22px;
 }
color: #9B9B9B;
 
    }
    .input2 {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      color: #9B9B9B;
      margin-right:-70%;
 
 h3{
   font-size:22px;
 }
    }
    .all{
      display:flex;
      width:99%;
      height:21%;

  margin-top:2%;
  display:flex;
  flex-direction:row;

  justify-content:center;
  align-items:center;


}

.btn1{
  
  display:flex;
  justify-content:center;
  align-items:center;
 
  width:30%;
  height:120%;
  margin-top:0%;

  .logoplay{
    z-index:999;
    cursor:pointer;
    width:21%;
     margin-left:5%;
    margin-top:5%; 
  }
  .baixar{
    z-index:999;
    width:85%;
    cursor:pointer;
    font-size:17px;
    font-weight:400;
    margin-left:16%;
    margin-top:-29%;
    &:hover {
      color: #2828fc;
    }
 
    
  }
  
  .google{
 
 width:100%;
 font-size:18px;
margin-top:-3%;
margin-left:11%;
font-family:Roboto;
}
>a{
  text-decoration:none;
  z-index:999;
margin-top:1%;
  border-radius:5px;
  width:80%;
height:70%;
  margin-left:0%;
  background-color:#FFFFFF;
color:#101010;
  border: 1px solid #141111;
  cursor:pointer;
}}


.btn2{
   
  display:flex;
  justify-content:center;
  align-items:center;
 
  width:30%;
  height:120%;
  margin-top:0%;

  .logoapp{
    z-index:999;
    cursor:pointer;
    width:21%;
     margin-left:5%;
    margin-top:4%; 
  }
  .baixara{
    z-index:999;
    width:85%;
    cursor:pointer;
    font-size:17px;
    font-weight:400;
    margin-left:16%;
    margin-top:-28%;
    &:hover {
      color: #2828fc;
    }
 
    
  }
  .googlea{
 
    width:100%;
 font-size:18px;
margin-top:-3%;
margin-left:9%;
font-family:Roboto;
}
>a{
  text-decoration:none;
  z-index:999;
margin-top:1%;
  border-radius:5px;
  width:80%;
height:70%;
  margin-left:0%;
  background-color:#FFFFFF;
  color:#101010;
  border: 1px solid #141111;
  cursor:pointer;
}}
    .date{
      color:#101010;
    }
    .faq{
      display:flex;
      justify-content:center;
      align-items:center;
      flex-direction:row;
      background-color:#EEEEEE;
      box-shadow: 0px 5px 5px #BBBBBB;
      border-radius:2px;
      width:35%;
      margin-left:0%;
      margin-top:3%;
      height:14%;
      &:hover{
  background-color:#F3F3F3;
}
    }
    .faqlink{
      display:flex;
      width:100%;
      height:100%;
      display:flex;
      justify-content:center;
      align-items:center;
      text-decoration:none;
    }
    .faqtext{
      display:flex;
      margin-top:0%;
      margin-left:2%;
  text-decoration:none;
      font-size:15px;
      font-weight:500;
      color:#2B2B2B;
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
    font-size: 30px;
    text-align: center;
    font-weight: 400;
  }
  h4 {
    margin-top: 8px;
    font-weight: 400;
  }
  form {
    margin-top: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;


  
    button {
      width: fit-content;
      padding: 0 16px;
      width: 65%;
      height: 40px;
      text-align: center;
    }
    .btnazul {
      text-align: center;
      margin-top: 11%;
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
          color: #007aff;
        }
      }
    }
  }}
  @media screen and (max-width: 576px) {
    display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;

  border-radius: 5px 10px 10px 5px;

  width: 100%;
  height: 500px;

  margin-top: 50px;
  .perguntaserespostas{
  margin-top:10%;
  margin-left:12%;
  width:100%;
max-height:20px;


  
  h1{
    line-height:20px;
    font-size:17px;
    font-weight:400;
    color:#6A6A6A;
  }
}
.Menu h1{
  font-size:16px;

}
  .topo{
  display:flex;
width:100%;
height:100%;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  margin-top:5%;

  
}

.bemvindo{
  margin-top:5%;
  font-size:35px;
}
.subtopo{
  width:75%;
  margin-top:-5%;
  font-size:21px;

  }
.dias{
  font-size:22px;
  margin-top:-1%;
  color:#FE2E2E;
  margin-left:4%;
  
}
.ajustetudo{
  width:100%;
  height:100%;
    /* background-color:pink; */
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
  }
  .formBox {
    display: flex;
    padding: 17px;

    justify-content: center;
    flex-direction: column;
    width: 100%;
    background-color: #ffffff;
    /* background-color:blue; */
    height:100%;
    border-radius: 0px 5px 5px 0px;
  
.hora{
  display:flex;
  flex-direction:row;
  line-height:10px;
margin-top:1%;
 margin-left:-61%;

  
 

}




    .input1 {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
     
      margin-left:40%;
      h3{
   font-size:22px;
 }
color: #9B9B9B;
 
    }
    .input2 {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      color: #9B9B9B;
      margin-right:-70%;
 
 h3{
   font-size:22px;
 }
    }
    .all{
      display:flex;
      width:99%;
      height:100%;

  margin-top:10%;
  display:flex;
  flex-direction:column;

  justify-content:center;
  align-items:center;


}

.btn1{
  
  display:flex;
  justify-content:center;
  align-items:center;
 
  width:100%;
  height:100px;
  margin-top:0%;

  .logoplay{
    z-index:999;
    cursor:pointer;
    width:15%;
     margin-left:5%;
    margin-top:2%; 
  }
  .baixar{
    z-index:999;
    width:85%;
    cursor:pointer;
    font-size:25px;
    font-weight:400;
    margin-left:13%;
    margin-top:-20%;
    &:hover {
      color: #2828fc;
    }
 
    
  }
  
  .google{
 
 width:100%;
 font-size:25px;
margin-top:-3%;
margin-left:9%;
font-family:Roboto;
}
>a{
  text-decoration:none;
  z-index:999;
margin-top:1%;
  border-radius:5px;
  width:80%;
  height:60px;
  margin-left:0%;
  background-color:#FFFFFF;
color:#101010;
  border: 1px solid #141111;
  cursor:pointer;
}}


.btn2{
   
  display:flex;
  justify-content:center;
  align-items:center;
 
  width:100%;
  height:85px;
  margin-top:0%;

  .logoapp{
    z-index:999;
    cursor:pointer;
    width:15%;
     margin-left:5%;
     margin-top:2%; 
  }
  .baixara{
    z-index:999;
    width:85%;
    cursor:pointer;
    font-size:25px;
    font-weight:400;
    margin-left:13%;
    margin-top:-20%;
    &:hover {
      color: #2828fc;
    }
 
    
  }
  .googlea{
 
    width:100%;
 font-size:25px;
margin-top:-3%;
margin-left:9%;
font-family:Roboto;
}
>a{
  text-decoration:none;
  z-index:999;
margin-top:1%;
  border-radius:5px;
  width:80%;
height:70%;
  margin-left:0%;
  background-color:#FFFFFF;
  color:#101010;
  border: 1px solid #141111;
  cursor:pointer;
}}
    .date{
      color:#101010;
    }
    .faq{
      display:flex;
      justify-content:center;
      align-items:center;
      flex-direction:row;
      background-color:#EEEEEE;
      box-shadow: 0px 5px 5px #BBBBBB;
      border-radius:2px;
      width:79%;
      margin-left:-1%;
      margin-top:3%;
      height:50px;
      &:hover{
  background-color:#F3F3F3;
}
    }
    .faqlink{
      display:flex;
      width:100%;
      height:100%;
      display:flex;
      justify-content:center;
      align-items:center;
      text-decoration:none;
    }
    .faqtext{
      display:flex;
      margin-top:0%;
      margin-left:2%;
  text-decoration:none;
      font-size:15px;
      font-weight:500;
      color:#2B2B2B;
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
    font-size: 30px;
    text-align: center;
    font-weight: 400;
  }
  h4 {
    margin-top: 8px;
    font-weight: 400;
  }
  form {
    margin-top: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;


  
    button {
      width: fit-content;
      padding: 0 16px;
      width: 65%;
      height: 40px;
      text-align: center;
    }
    .btnazul {
      text-align: center;
      margin-top: 11%;
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
          color: #007aff;
        }
      }
    }
  }}
  
`;

export const GoogleLogin = styled(CustomGoogleLogin)`
  background-color: red;
  margin-left: 200px;
  > button {
    background-color: red;
  }
`;
export const Draw = styled(DrawCadastro)`
  svg {
    width: 70px;
    height: 70px;
  }
`;
export const Sair = styled.div`
display:flex;
justify-content: space-between;


border-radius:6%;

z-index:3;
margin-left:255px;
button{
  display:flex;
justify-content: center;
outline:0;
  font-size:22px;
  cursor: pointer;
  .logo{
    display:flex;
    justify-content:center;
    height:30px;
    margin-left:15px;

  }
  &:hover {
          color: #007aff;
        }
}
`;
export const Menu = styled.div`
 
 background-color:#696563;
border-radius:3px;
display:flex;
/* display:none; */
position: static;
z-index:10;

right:0;
margin-left:86%;

  width:13%;
  height:101px;
  color:#fff;
   animation: drop 0.5s ease forwards;
   ul{
    margin-left:5px;
    list-style:none;
    display:flex;


    flex-direction:column;
    color:#fff;
    hr{
  width:100%;
  height:1px;
background-color:#fff;
}
  }
 
  a{
    color:#fff;
    font-weight:400;
    text-decoration:none;
    font-size:15px;
    line-height: 23px;
    &:hover {
          color: #C2BBB8;
        }
  }



    @keyframes drop {
      0% {
        transform: translateX(80px);
      }
     
      100% {
        transform: translateX(10px);
      }
    }
    @media screen and (max-width: 900px) {
      display:none;
    }
    @media screen and (max-width: 576px) {
      display:none;
    }
`;
export const Lockicon1 = styled(Lock)``;
export const Googleicon = styled(Go)``;
export const Facebokcion = styled(face)``;

export const AnimationContainer = styled.div``;
