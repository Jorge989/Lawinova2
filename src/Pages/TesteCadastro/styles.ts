
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
  height: 730px;

  margin-top: 85px;
  margin-left:1%;
.radiobtn{

color:  #8A44C4;
svg{
  color:  #8A44C4; 
}


}
  .div4{

margin-top:-0%;
display:flex;
flex-direction:row;
justify-content:space-between;
align-items:center;

width:100%;

}
select{
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

}
.qtd{
  /* background-color:red; */
  width:100%;
 margin-left:6%;
}
.radio{
  display:flex;
  justify-content:center;

  margin-right:2%;
}
.radiocor{
    color:#941AF9;
svg{
  color:#941AF9;
}
  }
.inputsel1{
  width: 99%;
      margin-right:90px;
      display: flex;
     
      justify-content: center;
      align-items: center;
   
  }
  .policticablue{
font-size:17px;
color: #007aff;
font-weight:400;
  }
  .politica{
    margin-top:10px;
    display:flex;
    flex-direction:row;

    align-items:center;
    justify-content:center;
    width:145%;
  }
  .inputsel2{
width: 95%;
      margin-left:10px;
      display: flex;
 
      justify-content: center;
      align-items: center;
  
}

.div5{
  display:flex;
flex-direction:column;
justify-content:space-between;
align-items:center;

width:100%;

}
  .formBox {
    display: flex;
    padding: 17px;

    justify-content: center;
    flex-direction: column;
    width: 39%;
    background-color: #ffffff;
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
    margin-top: 6px;
    font-size: 29px;
    text-align: center;
    font-weight: 400;

  }
  h4 {
    margin-top: 0px;
    font-weight: 400;
  }
  form {
    margin-top: 4%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    .input1 {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

     
    }
    button {
      width: fit-content;
      padding: 0 16px;
      width: 65%;
      height: 40px;
      text-align: center;
    }
    .btnazul {
      text-align: center;
      margin-top: 24px;
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
    .possuilogin {
      width: 100%;
      margin-top: 8px;
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
    position: relative;

    display: flex;
    justify-content: center;
    flex-direction: row;
    background-color: #fff;

    border-radius: 5px 10px 10px 5px;

    width: 50%;
    height: 600px;

    margin-top: 50px;
    .div4{

margin-top:-0%;
display:flex;
flex-direction:row;
justify-content:space-between;
align-items:center;

width:100%;

}
.radio{
  display:flex;
  justify-content:center;
  width:100%;

  margin-right:0%;

margin-top:40%;
.pessoafisica{
font-size:22px;
}
.pessoajuridica{
  font-size:22px;
}
}
select{
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

 
}
.inputsel1{
  width: 100%;
      margin-right:112px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
  }
    .formBox {
      display: flex;

      justify-content: center;
      flex-direction: column;
      width: 100%;
      background-color: #ffffff;

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
      margin-top: 1px;
      font-size: 32px;
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
      justify-content: center;
      flex-direction: column;
      align-items: center;
      height: 100%;
      width: 100%;

      button {
        width: fit-content;
        padding: 0 16px;
        width: 65%;
        height: 40px;
        text-align: center;
      }
      .input1 {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

     
      }
      input .cadastre {
        width: 100%;
        margin-top: 16px;
        a {
          font-weight: 450;
          font-size: 20px;
          color: #101010;
          text-decoration: none;
          &:hover {
            color: #941AF9;
          }
        }
      }
      .esqueci {
        width: 100%;
        margin-top: 0px;
        a {
          font-weight: 450;
          font-size: 20px;
          color: #232326;
          text-decoration: none;
          &:hover {
            color: #941AF9;
          }
        }
      }
    }
  }

  @media screen and (max-width: 576px) {
    position: relative;

    display: flex;
    justify-content: center;
    flex-direction: row;
    background-color: #fff;

    border-radius: 5px 10px 10px 5px;

    width: 90%;
    height: 700px;

    margin-top: 5px;

    .formBox {
      display: flex;

      justify-content: center;
      flex-direction: column;
      width: 100%;

      background-color: #ffffff;

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
      font-size: 28px;
      text-align: center;
      font-weight: 400;
    }
    .radio{
  display:flex;
  justify-content:center;
  flex-direction:row;
  width:100%;

  margin-right:0%;

margin-top:40%;
.pessoafisica{
font-size:18px;
}
.pessoajuridica{
  font-size:18px;
}
}
.policticablue{
font-size:17px;
color: #007aff;
font-weight:400;
  }
  .politica{
    display:flex;
    flex-direction:column;

    align-items:center;
    justify-content:center;
    width:100%;
  }
    h4 {
      margin-top: 8px;
      font-weight: 400;
    }

    form {
      margin-top: -5%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      height: 100%;
      .input1 {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

  
    }
      button {
        width: fit-content;
        padding: 0 16px;
        width: 100%;
        height: 45px;
        text-align: center;
      }
      input {
        width: fit-content;

        width: 100%;
        height: 45px;
      }

      .input1 {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

  
      }

      .cadastre {
        width: 100%;
        margin-top: 16px;

        a {
          font-weight: 500;

          font-size: 20px;
          color: #101010;
          text-decoration: none;
          &:hover {
            color: #941AF9;
          }
        }
      }
      .esqueci {
        width: 100%;
        margin-top: 0px;
        a {
          font-weight: 500;
          font-size: 20px;
          color: #232326;
          text-decoration: none;
          &:hover {
            color: #941AF9;
          }
        }
      }
    }
  }

  
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
export const Entra = styled.div`
display:flex;
justify-content:center;
margin-top:-0.5%;
 margin-left:250px;
a{
  text-decoration:none;
  color:#000;
  font-size:20px;
  &:hover {
          color: #941AF9;
        }
}
`;
export const Draw = styled(DrawCadastro)``;
export const Facebokcion = styled(face)``;
export const Lockicon1 = styled(Lock)``;
export const Googleicon = styled(Go)``;
