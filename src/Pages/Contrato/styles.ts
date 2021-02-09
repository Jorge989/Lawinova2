import styled from "styled-components";
import { DrawCadastro } from "../../styles/icons";
import { Lock } from "../../styles/icons";
import { Go } from "../../styles/icons";
import { face } from "../../styles/icons";
import { GoogleLogin as CustomGoogleLogin } from "react-google-login";
export const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 585px;
  max-width: 1350px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 576px) {
    display: flex;
    justify-content: center;
    height: 100%;

    margin: 0 auto;
    width: 370px;
    z-index: 999;
  }
`;

export const Blue = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  background-color: #fff;

  border-radius: 5px 10px 10px 5px;

  width: 100%;
  height: 500px;

  margin-top: 60px;

  .formBox {
    margin-top: 64px;
    display: flex;
    padding: 17px;

    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 540px;
    background-color: #ffffff;
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
      margin-top: 0px;
      font-size: 30px;
      text-align: center;
      font-weight: 400;
    }
    h4 {
      margin-top: 8px;
      font-weight: 400;
    }
    form {
      margin-top: 0%;
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;

      .input1 {
        display: flex;
        flex-direction: column;

        align-items: center;
        margin-top: 2%;
        width: 65%;
        height: 400px;
        border-radius: 2px;

        overflow: auto;
        border: 1px solid #c4c4c4;
        & + div {
          margin-top: 4%;
          border: 1px solid #c4c4c4;
        }
      }
      .texto {
        margin-top: 0;
        max-width: 95%;
      }
      .box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 90%;
      }
      .contrato {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin-top: 1%;
      }

      button {
        display: flex;
        width: fit-content;
        padding: 0 16px;
        width: 220px;
        height: 50px;
        text-align: center;
        align-items: center;
        justify-content: center;
      }
      .btnazul {
        text-align: center;
        /* margin-top: 2%; */
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
      @media screen and (max-width: 900px) {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background-color: #fff;

        border-radius: 5px 10px 10px 5px;

        width: 730px;
        height: 550px;

        .contrato {
          width: 100%;
        }

        .formBox {
          display: flex;
          padding: 17px;

          justify-content: center;
          flex-direction: column;
          width: 100%;
          height: 600px;
          background-color: #ffffff;
          border-radius: 0px 5px 5px 0px;
          background-color: purple;

          h2 {
            color: #141414;
            width: 100%;
            height: 20.7px;
            font-weight: 400;
            font-size: 17px;
            margin-top: 13px;
          }
          h3 {
            margin-top: 0px;
            font-size: 30px;
            text-align: center;
            font-weight: 400;
          }
          h4 {
            margin-top: 8px;
            font-weight: 400;
          }
          form {
            margin-top: 0%;
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 100%;

            .input1 {
              display: flex;
              flex-direction: column;

              align-items: center;
              margin-top: 2%;
              width: 1000px;
              height: 100%;
              border-radius: 2px;
              overflow: auto;
            }
            .texto {
              margin-top: 0;
              max-width: 95%;
            }
            .box {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              width: 1200px;
              height: 100%;
            }
            .contrato {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
              margin-top: 2%;
            }
            .input {
              display: flex;
              justify-content: center;
              align-items: center;

              overflow: scroll;
              height: 100%;
              width: 100%;
            }
            button {
              width: fit-content;
              padding: 0 16px;
              width: 60%;
              height: 51px;
              text-align: center;
            }
            .btnazul {
              text-align: center;
              margin-top: 2%;
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
        }

        @media screen and (max-width: 576px) {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 370px;
          margin-left: -4.7%;
          height: 540px;

          .texto {
            margin-top: 0;
            max-width: 95%;
          }
          .input1 {
            width: 340px;
          }
          .box {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
          }
          .contrato {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 85%;
            margin-top: 3%;
          }

          button {
            width: fit-content;
            padding: 0 16px;
            width: 90%;
            height: 64px;
            text-align: center;
          }
          .btnazul {
            text-align: center;

            margin-top: 15px;
          }
        }
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
export const Entra = styled.div`
  display: flex;
  justify-content: center;

  margin-left: 250px;
  a {
    text-decoration: none;
    color: #000;
    font-size: 20px;
    &:hover {
      color: #007aff;
    }
  }
`;
export const Lockicon1 = styled(Lock)``;
export const Googleicon = styled(Go)``;
export const Facebokcion = styled(face)``;

export const AnimationContainer = styled.div``;
