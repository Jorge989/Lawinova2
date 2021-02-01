//2846445278933444
import React, { useState, useCallback, useRef, useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";
// import Logo from "../../assets/logolaw.svg";
import Header2 from "../../Components/Header";
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { Link, useLocation, useParams } from "react-router-dom";

import {
  Container,
  Lockicon1,
  Blue,
  Draw,
  GoogleLogin,
  Googleicon,
  Facebokcion,
  GradientCard,
  GradientCardContainer,
  GradientText,
} from "./styles";
import FacebookLogin from "react-facebook-login";

import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { FiMail } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { Form } from "@unform/web";
import getValidationErrors from "../../utils/getValidationErros";
import * as Yup from "yup";
import { FormHandles } from "@unform/core";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { useAuth } from "../../hooks/auth";
import { useToast } from "../../hooks/toast";
import api from "../../services/api";
import { AxiosError } from "axios";
import PlansData from "../../data/PlansData";

interface SigInFormData {
  email: string;
  senha: string;
}

const Planos: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const { signIn, setAuthData } = useAuth();
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
  }>();

  const [planos, setPlanos] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [inputType, setInputType] = useState("password");

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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");

  const responseGoogle = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ): Promise<void> => {
    if (!("profileObj" in response)) return;
    setName(response.profileObj.name);
    setEmail(response.profileObj.email);
    setUrl(response.profileObj.imageUrl);
    const { data } = await api.post("/autenticar", {
      email: response.profileObj.email,
    });
    setAuthData({ user: data.usuario, token: data.token });

    console.log(data);
  };

  const responseGoogleFailed = (response: GoogleLoginResponse): void => {
    console.log(response);
  };

  const responseFacebook = async (response: any) => {
    console.log(response);
    const { data } = await api.post("/autenticar", {
      email: response.officeId + "@facebook.com",
    });
    setAuthData({ user: data.usuario, token: data.token });
  };

  const componetClicked = (data: any) => {
    console.warn(data);
  };

  const eye = <FiEyeOff />;
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown === true ? false : true);
    setInputType(inputType === "password" ? "text" : "password");
  };

  <i onClick={togglePasswordVisiblity}>{eye}</i>;

  return (
    <div className="ehad" style={{ marginTop: 120 }}>
      <Header2 />
      <Container>
        <Blue>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <section className="pricing-container">
              <h1>Planos e Preços</h1>
              <p>Selecione o plano perfeito para voçê</p>
              <div className="plans-container">
                {PlansData.map((plan) => (
                  <GradientCard
                    key={plan.id}
                    code={plan.code}
                    plano={planos}
                    onClick={() => setPlanos(plan.code)}
                  >
                    <GradientCardContainer>
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

                      {plan.offers.map((offer) => (
                        <li
                          style={{
                            color: plan.code !== planos ? "#000000" : "#ffffff",
                          }}
                          className="offer"
                          key={offer.id}
                        >
                          {offer.name.toUpperCase()}
                        </li>
                      ))}
                    </GradientCardContainer>
                  </GradientCard>
                ))}
              </div>
            </section>

            <div className="button">
              <Button className="btnazul" type="submit" isLoading={loading}>
                Confirmar
              </Button>
            </div>
          </Form>
        </Blue>
      </Container>
    </div>
  );
};

export default Planos;
