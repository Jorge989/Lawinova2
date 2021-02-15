import styled, { css } from "styled-components";

export const Layout = styled.div`
  padding-top: 120px;
  padding-bottom: 48px;
  display: flex;
  justify-content: center;
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  max-width: 840px;
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
padding-left: 40px;
padding-right: 40px;
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
  width: 200px;
  height: 48px;
  font-size: 20px;
  padding: 6px 32px;
  padding-top:1px;
  
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
display:flex;
align-items:center;


  .playlog{
    display:flex;
    width:18%;
  

padding-top:2px;
  }
  @media (min-width: 900px) {
    margin-bottom: 0;
  }
`;

export const AppStoreButton = styled.a`
  ${buttonStyle}
  padding: 0px 38px;
  padding-bottom:5px;

.applelog{
  display:flex;

  margin-left:-4px;
}



`;

export const StoreLogo = styled.img`
display:flex;
align-items:center;
  width: 30px;
  height: 30px;
  .apple{
    width:14%;
  
    margin-right:25px;
padding-top:2px;
  }
  
`;

export const FaqButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  background-color: #eeeeee;
  box-shadow: 0px 5px 5px #bbbbbb;
  border-radius: 4px;
  width: 240px;
  height: 40px;
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
  font-size: 28px;
  border: 0;
  outline: 0;
  background: transparent;

 
  cursor: pointer;

  &:hover {
    color: #941af9;
  }
`;

export const DropdownContainer = styled.div`
  position: absolute;
  right: 0;
  top: 76px;
  width: 100%;
  max-width: 300px;

  z-index: 9999;
  background: #74469a;
  border: 0;
  outline: 0;
  font: 500 16px Roboto;
  color: #f1f1f1;
  padding: 0px;
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
  width: 99%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 2px;
  background: transparent;
  border: 0;
  outline: 0;
  color: #ffffff;

  &:hover {
    background: #941af9;
    cursor: pointer;
  }

  hr {
    width: 100%;
    height: 1px;
    background-color: #fff;
  }

  a {
    display:flex;

    color: #fff;
    font-weight: 500;

    width:100%;
    text-decoration: none;
    font-size: 17px;
    line-height: 35px;
  }
`;
