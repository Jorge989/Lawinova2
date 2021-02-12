import styled from "styled-components";
import { Form } from "@unform/web";
import Button from "../../Components/Button";

interface GradientConfig {
  code: string;
  plano: string;
}

export const Layout = styled.div`
  margin-top: 95px;
  display: flex;

  justify-content: center;
`;

export const Container = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  max-width: 1050px;
  max-height: 700px;
  height: 560px;

`;

export const Main = styled.main`
  width: 100%;

  margin-bottom: 29px;

  @media (min-width: 900px) {
    margin-bottom: 0;
  }
`;
export const FormContainer = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height:100%;

`;

export const PricingContainer = styled.section`
  text-align: center;
  width: 100%;
`;

export const PricingContainerTitle = styled.h1`
  margin-top: -10px;
  font-size: 32px;
  font-weight: 400;
`;

export const PlansContainer = styled.div`
  margin-top: -12px;
  width: 100%;

  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;

  @media (min-width: 576px) {
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px;
  }
`;

export const Plan = styled.div<GradientConfig>`
  height: 425px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border: none;
  margin: 32px 16px;
  border-radius: 8px;
  padding: 16px 0;
  cursor: pointer;

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

  @media (min-width: 900px) {
    margin: 32px 32px;
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
  margin-top: -5px;
  font-size: 29px;
  line-height: 34px;
  font-weight: 500;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const OffersContainer = styled.ul`
  margin: 0 16px;
  margin-top: 5px;
`;

export const Offer = styled.li`
  text-transform: uppercase;
  list-style: none;
  font-size: 15px;
  line-height: 31px;
  font-weight: 500;
  color: #ffffff;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  gap:40px;
  margin-bottom: 48px;
  margin-top:-2%;

  @media (min-width: 576px) {
    flex-direction: row;
    justify-content: center;
  }
  @media (max-width: 576px) {
    flex-direction: column;
    justify-content: center;
    width: 100%;
  gap:5px;
  }
`;

export const ConfirmButton = styled(Button)`
 height: 40px;
  width: 150%;
  font-size:15px;
font-weight:500;
  @media (min-width: 576px) {
    max-width: 195px;
    margin-right: 20px;
  }
  @media (max-width: 576px) {
    max-width: 90%;

    
  }
`;

export const CancelPlanButton = styled(Button)`
  height: 40px;
  width: 195%;
  color: #000;
  background-color: #F8F8F8;
  font-size:15px;
font-weight:500;
  &:hover {
    background-color: #F3F3F3 !important;
  }

  @media (min-width: 576px) {
    max-width: 195px;
  }
  @media (max-width: 576px) {
    max-width: 90%;

    
  }
`;