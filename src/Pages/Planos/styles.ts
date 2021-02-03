import styled from "styled-components";
import { DrawCadastro } from "../../styles/icons";
import { Lock } from "../../styles/icons";
import { Go } from "../../styles/icons";
import { face } from "../../styles/icons";
import { GoogleLogin as CustomGoogleLogin } from "react-google-login";

interface GradientConfig {
  code: string;
  plano: string;
}

export const Container = styled.div`
  justify-content: center;
  height: 100%;
  max-width: 1350px;
  margin: 0 auto;
  width: 100%;
  z-index: 999;
  @media screen and (max-width: 900px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
    z-index: 999;

    .btnazul {
      width: 30%;
      height: 4%;
      text-align: center;
    }
  }

  @media screen and (max-width: 576px) {
    justify-content: center;
    height: 100%;
    max-width: 1000px;
    margin: 0 auto;
    width: 100%;
    z-index: 10;

    .btnazul {
      width: 80%;
      height: 3.5%;
      text-align: center;
    }
  }
`;

export const GradientCard = styled.div<GradientConfig>`
  background: ${(props) =>
    props.code !== props.plano
      ? "#F6F6F6"
      : `linear-gradient(
    157.7deg,
    #e95a0c -1.83%,
    #e13d8d 28.93%,
    #694896 62.87%,
    #2e1f43 100%
  )`};
  flex: 1 1 200px;
  max-width: 280px;
  margin-left: 10px;
  margin-right: 20px;
  border-radius: 3px;
  border: none;
  margin-top: 70px;
  border-radius: 8px;
  padding: 16px 0;
  cursor: pointer;

  .offer {
    height: 30px;
    font-size: 12px;
    font-weight: 600;
    width: 250px;
    line-height: 30px;
    color: #ffffff;
  }
`;

export const GradientCardContainer = styled.ul`
  list-style: none;
  li {
    list-style: none;
    height: 30px;
    font-size: 12px;
    width: 250px;
    line-height: 30px;
    color: #333;
  }
`;

export const GradientText = styled.h4<GradientConfig>`
  text-transform: uppercase;
  background: ${(props) =>
    props.code !== props.plano
      ? `linear-gradient(
    157.7deg,
    #e95a0c -1.83%,
    #e13d8d 28.93%,
    #694896 62.87%,
    #2e1f43 100%
  )`
      : "#ffffff"};
  font-size: 30px;
  font-weight: 500;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const Blue = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  background-color: #fff;

  border-radius: 5px 10px 10px 5px;

  width: 100%;
  height: 570px;


  margin-top: -40px;
  .formBox {
    display: flex;
    padding: 17px;
  
    justify-content: center;
    flex-direction: column;
    width: 39%;
    background-color: #ffffff;
    border-radius: 0px 5px 5px 0px;

  }
  form {
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;

    .pricing-container {
      padding-bottom: 5em;
      text-align: center;
      
    }
    button {
      width: fit-content;
      padding: 0 16px;
      width: 44%;
      height: 40px;
      text-align: center;
    
    }
    .btnazul {
      text-align: center;
      margin-top: -11.5%;
     
    
    }
    .pricing-container h1 {
      font-size: 31px;
      font-weight: 400;
      margin-top: 0px;

    }
    .pricing-container p {
      font-size: 20px;
    }

    .plans-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      position: relative;
      margin-left: auto;
      margin-right: auto;
      margin-top: -40px;

    }

    .plan {
      /* background-color: #ffffff;
      flex: 1 1 200px;
      max-width: 280px;
      margin-left: 10px;
      margin-right: 20px;
      border-radius: 3px;
      border: 2px solid #c4c4c4;
      margin-top: 70px; */

      .Valores {
        margin-top: 5px;

        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ffffff;
        font-size: 22px;
        color: #545454;
        .grana1 {
          font-size: 25px;
          font-weight: 500;
          display: flex;
          color: #545454;
        }
        .grana {
          font-size: 30px;
          font-weight: 500;
          display: flex;
          color: #161616;
        }
      }
    }

    .plan ul {
      padding: 0;

    }

    .plan li {
      list-style: none;
      height: 30px;
      font-size: 12px;
      width: 250px;
      line-height: 30px;
      background-color: #ffffff;
      color: #333;
 
    }

    .plan .price {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background-color: #2cc762;
      box-shadow: 2px 2px 5px#000;
      color: #fff;
      text-align: center;
      line-height: 120px;
      font-size: 18px;
      position: relative;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: -20px;

    }

    .plan .plan-name {
      text-transform: uppercase;
      font-size: 18px;
      font-weight: 400;
      color: #000;
      background-color: #f3f2f2;

      padding-top: 5px;
      padding-bottom: 33px;
    }
    .hr {
      width: 100%;

      border: 1px solid #c4c4c4;
    }

    .plan .plan-btn {
      background-color: #2cc762;
      color: #fff;
      font-size: 24px;
      height: 75px;
      line-height: 75px;
      cursor: pointer;
    }

    @media screen and (max-width: 900px) {
      display: flex;

      flex-direction: column;
      background-color: #fff;

      border-radius: 5px 10px 10px 5px;

      width: 100%;
      height: 1000px;

      margin-top: 65px;

      .plan li {
        list-style: none;
        height: 30px;
        font-size: 12px;
        width: 230px;
        line-height: 30px;
        background-color: #fff;
        color: #333;
      }
      .pricing-container h1 {
        font-size: 36px;
        font-weight: 400;
        margin-top: -65px;
      }
      .pricing-container p {
        font-size: 20px;
      }
      .plan {
        display: flex;
        flex-direction: row;
        justify-content: center;
        background-color: #ffffff;

        flex: 1 1 200px;
        max-width: 255px;
        margin-left: 10px;
        margin-right: 1px;
        border-radius: 3px;
        border: 2px solid #c4c4c4;
        margin-top: 130px;
      }
      .button {
        display: flex;
        justify-content: center;

        text-align: center;
        width: 300px;
        height: 75px;
        text-align: center;

        margin-top: -5%;
        button {
          height: 75%;
          width: 80%;
          display: flex;

          justify-content: center;
          text-align: center;
        }
      }

      .plans-container,
      .sepcialti-container ul {
        flex-wrap: wrap;
      }
    }

    @media screen and (max-width: 576px) {
      display: flex;
      justify-content: center;
      width: 100%;
      max-width: 100px;

      height: 1500px;
margin-top:50px;
      .plan .plan-name {
        text-transform: uppercase;
        font-size: 18px;
        font-weight: 400;
        color: #000;
        background-color: #f3f2f2;
      }
      .button {
        display: flex;
        justify-content: center;

        text-align: center;
        width: 375px;
        height: 73px;
        text-align: center;

        margin-top: -5%;
        button {
          height: 68%;
          width: 100%;
          display: flex;

          justify-content: center;
          text-align: center;
        }
      }
      .plan .plan-name {
        display: flex;
        justify-content: center;
        text-transform: uppercase;
        font-size: 18px;
        font-weight: 400;
        color: #000;

        background-color: #f3f2f2;

        padding-top: 0px;
        padding-bottom: 0px;
      }
      .pricing-container h1 {
        font-size: 36px;
        font-weight: 400;
        margin-top: -50px;
      }
      .pricing-container p {
        font-size: 21px;
      }
      .plan li {
        list-style: none;
        height: 30px;
        font-size: 13px;
        width: 249px;
        line-height: 30px;
        background-color: #fff;
        color: #333;
      }

      button {
        width: fit-content;
        padding: 0 16px;
        width: 21%;
        height: 40px;
        text-align: center;
        margin-top: -10%;
        margin-left: 0%;
      }
      .btnazul {
        text-align: center;
      }
    }
  }
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

export const Lockicon1 = styled(Lock)``;
export const Googleicon = styled(Go)``;
export const Facebokcion = styled(face)``;

export const AnimationContainer = styled.div``;
