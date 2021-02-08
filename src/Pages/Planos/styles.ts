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
  max-height: 800px;
  height: 660px;
`;

export const Main = styled.main`
  width: 100%;
  
  margin-bottom: 48px;

  @media (min-width: 900px) {
    margin-bottom: 0;
  }
`;
export const FormContainer = styled(Form)`

  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const PricingContainer = styled.section`

  text-align: center;
  width: 100%;
`;

export const PricingContainerTitle = styled.h1`

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
  height: 450px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border: none;
  margin: 32px 16px;
  border-radius: 8px;
  padding: 16px 0;

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
  font-size: 30px;
  line-height: 34px;
  font-weight: 500;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const OffersContainer = styled.ul`
  margin: 0 16px;
  margin-top: 10px;
`;

export const Offer = styled.li`
  text-transform: uppercase;
  list-style: none;
  font-size: 15px;
  line-height: 32px;
  font-weight: 500;
  color: #ffffff;
`;

export const ConfirmButton = styled(Button)`
  height: 40px;
  width: 50%;
  max-width: 219px;
  margin-top:-1%;


`;
