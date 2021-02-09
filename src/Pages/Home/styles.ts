import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const Layout = styled.div`
  padding-top: 120px;
  padding-bottom: 48px;
  display: flex;
  justify-content: center;
  .logo2{
    margin-left:200px;
  }
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  max-width: 840px;
`;

export const DropdownContainer = styled.div`
  position: absolute;
  right: 0;
  top: 76px;
  left: 71.5%;
  width: 100%;
  max-width: 240px;
  border-radius: 2px;
  z-index: 9999;
  background: #74469a;
  border: 0;
  outline: 0;

  font: 400 16px Roboto;

  color: #f1f1f1;

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

  font-weight: 400;
`;

export const DropdownItem = styled.button`
  width: 100%;
  display: flex;
  flex-direction: column;

  margin-left: 0px;
  background: transparent;
  border: 0;
  outline: 0;
  color: #ffffff;
  font-weight: 400;

  &:hover {
    margin-left: 0%;
    background: #941af9;
    cursor: pointer;
  }

  hr {
    width: 100%;
    height: 1px;
    background-color: #fff;
  }

  a {
    color: #fff;
    font-weight: 400;
    text-decoration: none;
    font-size: 17px;
    line-height: 28px;
    margin-left: 15px;
  }
`;

export const Main = styled.main`
  margin: 0 16px;
`;
export const MainHeader = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const RemainingDaysText = styled.h2`
  font-size: 22px;
  color: #fe2e2e;
  font-weight: 400;
`;
export const DateContainer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
export const DateText = styled.h3`
  font-size: 18px;
  font-weight: 500;
`;

export const Content = styled.div`
  margin-top: 48px;
`;
export const TextContainer = styled.div`
  text-align: center;
`;

export const Title = styled.h3`
  font-size: 32px;
`;

export const Subtitle = styled.p`
  margin-top: 16px;
  font-size: 22px;
`;

export const ButtonsContainer = styled.div`
  margin-top: 32px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const StoreButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 48px;

  @media (min-width: 900px) {
    width: 528px;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const buttonStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  width: 240px;
  height: 48px;
  font-size: 24px;
  padding: 6px 24px;
  text-decoration: none;
  border: 1px solid #941af9;
  border-radius: 24px;

  color: #941af9;
  cursor: pointer;

  &:hover {
    background: #d9caee;
  }
`;

export const GoogleStoreButton = styled.a`
  ${buttonStyle}
  margin-bottom: 16px;
  @media (min-width: 900px) {
    margin-bottom: 0;
  }
`;

export const AppStoreButton = styled.a`
  ${buttonStyle}
`;

export const StoreLogo = styled.img`
  width: 36px;
  height: 36px;
`;

export const FaqButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  background-color: #eeeeee;
  box-shadow: 0px 5px 5px #bbbbbb;
  border-radius: 4px;
  width: 240px;
  height: 48px;
  cursor: pointer;

  font-size: 16px;
  font-weight: 500;

  color: #941af9;
  &:hover {
    background-color: #f3f3f3;
  }
`;

export const QAContainer = styled.div`
  margin-top: 48px;
  width: 100%;
`;
export const QuestionContainer = styled.div`
  margin: 16px 0;
`;

export const QuestionContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

export const QuestionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 4px;
  margin-right: 12px;
  cursor: pointer;

  &:hover {
    background: #e0e0e0;
  }
`;
export const Question = styled.h3`
  line-height: 28px;
  font-size: 18px;
  font-weight: 400;
  color: #232323;
  flex: 1;
`;
export const AnswerContainer = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0 24px;
`;
export const Answer = styled.p`
  word-break: break-all;
`;

export const Sair = styled.div`
  button {
    display: flex;
    justify-content: center;
    outline: 0;
    cursor: pointer;

    .logo {
      display: flex;
      justify-content: center;
      height: 30px;
      margin-left: 15px;
    }
    &:hover {
      color: #941af9;
    }
  }
`;
