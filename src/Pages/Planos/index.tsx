//2846445278933444
import React, { useState, useRef, useEffect } from "react";
import Header2 from "../../Components/Header";
import { useLocation } from "react-router-dom";

import {
  Container,
  GradientText,
  FormContainer,
  Main,
  PricingContainer,
  PricingContainerTitle,
  PlansContainer,
  Plan,
  Offer,
  OffersContainer,
  Layout,
  ConfirmButton,
} from "./styles";
import { useHistory } from "react-router-dom";
import { Form } from "@unform/web";
import getValidationErrors from "../../utils/getValidationErros";
import * as Yup from "yup";
import { FormHandles } from "@unform/core";
import { useToast } from "../../hooks/toast";
import api from "../../services/api";
import { AxiosError } from "axios";
import { getFormattedPlansData } from "../../data/PlansData";

interface SigInFormData {
  email: string;
  senha: string;
}

const Planos: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [planos, setPlanos] = useState("");
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToast();

  const {
    state: {
      plano,
      officeId,
      userId,
      userEmail,
      userPhone,
      username,
      token,
      contractAccepted,
      customerId,
      phoneId,
      userPassword,
      isPromo,
    },
  } = useLocation<{
    officeId: number;
    plano: string;
    token: string;
    userId: number;
    userPhone: string;
    userEmail: string;
    userPassword: string;
    username: string;
    contractAccepted?: boolean;
    customerId?: number;
    phoneId?: number;
    isPromo: boolean;
  }>();

  useEffect(() => {
    setPlanos(plano);
  }, []);

  console.log("Planos", planos);
  console.log("Planos TOKEN:", token);
  console.log("officeId", officeId);
  console.log("contractAccepted", contractAccepted);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      formRef.current?.setErrors({});

      // const schema = Yup.object().shape({
      //   nome: Yup.string().required("Nome obrigatório"),
      //   email: Yup.string().required("E-mail obrigatório"),

      //   senha: Yup.string()
      //     .trim()
      //     .matches(
      //       /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1}).*$/,
      //       "senha deve conter pelo menos 8 caracteres, um número e um caractere especial"
      //     )
      //     .min(8, "No minimo 8 dígitos"),
      // });

      // await schema.validate(data, {
      //   abortEarly: false,
      // });

      await api.put(
        `escritorio/${officeId}`,
        {
          plano: planos,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!contractAccepted) {
        return history.push({
          pathname: "/contrato",
          state: {
            officeId,
            userId,
            userEmail,
            userPhone,
            username,
            plano: planos,
            token,
            userPassword,
            isPromo,
          },
        });
      }

      history.push({
        pathname: "/dados",
        state: {
          officeId,
          userId,
          userEmail,
          userPhone,
          username,
          plano: planos,
          token,
          contractAccepted,
          customerId,
          phoneId,
          userPassword,
          isPromo,
        },
      });

      // addToast({
      //   type: "sucess",
      //   title: "Cadastro realizado com sucesso",
      // });
    } catch (err) {
      console.log(err);
      setLoading(false);
      if (err instanceof Yup.ValidationError) {
        console.log(err);
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);

        // addToast({
        //   type: "error",
        //   title: "Erro na cadastro",
        //   description: `Ocorreu um erro ao fazer cadastro, tente novamente.`,
        // });
      }
      // if (err.response?.data) {
      //   addToast({
      //     type: "error",
      //     title: "Erro na cadastro",
      //     description: `Usuário já cadastrado.
      //     `,
      //   });
      // }
    }
  };

  return (
    <>
      <Header2 />
      <Layout>
        <Container>
          <Main>
            <FormContainer ref={formRef} onSubmit={handleSubmit}>
              <PricingContainer>
                <PricingContainerTitle>Planos e Preços</PricingContainerTitle>

                <PlansContainer>
                  {getFormattedPlansData(isPromo).map((plan) => (
                    <Plan
                      key={plan.id}
                      code={plan.code}
                      plano={planos}
                      onClick={() => setPlanos(plan.code)}
                    >
                      <GradientText
                        style={{ fontSize: 16 }}
                        code={plan.code}
                        plano={planos}
                      >
                        {plan.name}
                      </GradientText>
                      <GradientText code={plan.code} plano={planos}>
                        R${plan.value}
                      </GradientText>

                      <OffersContainer>
                        {plan.offers.map((offer) => (
                          <Offer
                            style={{
                              color:
                                plan.code !== planos ? "#000000" : "#ffffff",
                            }}
                            key={offer.id}
                          >
                            {offer.name}
                          </Offer>
                        ))}
                      </OffersContainer>
                    </Plan>
                  ))}
                </PlansContainer>
              </PricingContainer>
              <ConfirmButton type="submit" isLoading={loading}>
                Confirmar
              </ConfirmButton>
            </FormContainer>
          </Main>
        </Container>
      </Layout>
    </>
  );
};

export default Planos;
