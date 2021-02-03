//2846445278933444
import React, { useState, useCallback, useRef, useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";
import Logo from "../../assets/logolaw.svg";
import Header2 from "../../Components/Header";
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { Link } from "react-router-dom";

import {
  Container,
  Lockicon1,
  Blue,
  Draw,
  GoogleLogin,
  Googleicon,
  Facebokcion,
  GradientCardContainer,
  GradientText,
  GradientCard,
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
import axios from "axios";
import utf8 from "utf8";
import { encode as btoa } from "base-64";

import { FormHandles } from "@unform/core";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { useAuth } from "../../hooks/auth";
import { useToast } from "../../hooks/toast";
import api from "../../services/api";
import PlansData from "../../data/PlansData";
// async function handleSignIn(){
//   console.log('Logar');
// }

interface SigInFormData {
  email: string;
  senha: string;
}

const Meuplano: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [planId, setPlanId] = useState(0);
  const [customerId, setCustomerId] = useState(0);
  const [officeId, setOfficeId] = useState(0);
  const [subscriptionId, setSubscriptionId] = useState(0);
  const [plano, setPlano] = useState("");
  // const [subscription, setSubscription] = useState<{
  //   product_items: { product: { name: string } }[];
  // }>();
  const formRef = useRef<FormHandles>(null);
  const { signIn, setAuthData } = useAuth();
  const history = useHistory();
  const { addToast } = useToast();

  const privateApi = "tey-UhF26q2TMv6cTF43fcMsGwJEy4cdSZFKh-nPQaQ:";
  const bytes = utf8.encode(privateApi);
  const token64 = btoa(bytes);
  const user = localStorage.getItem("@ActionLaw: user");
  const token = localStorage.getItem("@ActionLaw: token");
  const parsedUser: {
    id_usuario: number;
    nome: string;
    status_usuario: string;
    email: string;
    tipo_conta: string;
    perfil: string;
  } = user && JSON.parse(user);
  console.log("User", parsedUser);

  useEffect(() => {
    api
      .get(`escritorios?nome=${parsedUser.nome}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("EscritorioID", response.data[0].id_escritorio);
        setPlano(response.data[0].plano);
        setOfficeId(response.data[0].id_escritorio);
        axios
          .get(
            `https://cors-anywhere.herokuapp.com/https://app.vindi.com.br/api/v1/customers?query=code=${response.data[0].id_escritorio}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${token64}`,
              },
            }
          )
          .then((response) => setCustomerId(response.data.customers[0].id));
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://app.vindi.com.br/api/v1/subscriptions?query=customer_id=${customerId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${token64}`,
          },
        }
      )
      .then((response) => {
        setSubscriptionId(response.data.subscriptions[0]?.id);
        setPlanId(response.data.subscriptions[0]?.plan.id);
      });
  }, [customerId]);

  console.log("PlanId", planId);
  console.log("CustomerId", customerId);
  console.log("Subscription", subscriptionId);

  console.log("PLANO", plano);

  const formattedDate = (date: string, time: string) => {
    const splitedDate = date.split("/");
    const changedDate = `${splitedDate[2]}-${splitedDate[1]}-${splitedDate[0]}`;
    return `${changedDate}T${time}:03.000-03:00`;
  };

  console.log(
    "Data:",
    formattedDate(
      new Date().toLocaleDateString(),
      new Date().toLocaleTimeString()
    )
  );

  const handleSubmit = async () => {
    setLoading(true);

    try {
      formRef.current?.setErrors({});

      console.log("Aqui", officeId, plano, subscriptionId);

      const responseProduct = await axios.get<{
        products: {
          id: number;
          name: string;
          code: null;
          unit: string;
          status: string;
          description: string;
          invoice: string;
          created_at: string;
          updated_at: string;
          pricing_schema: {
            id: number;
            short_format: string;
            price: string;
            minimum_price: null;
            schema_type: string;
            pricing_ranges: [];
            created_at: string;
          };
          metadata: {};
        }[];
      }>(
        `https://cors-anywhere.herokuapp.com/https://app.vindi.com.br/api/v1/products?query=name=${plano}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${token64}`,
          },
        }
      );

      console.log("ProductId", responseProduct.data.products[0].id);

      const updatedSubscription = {
        plan_id: planId,
        customer_id: customerId,
        payment_method_code: "credit_card",
        product_items: [{ product_id: responseProduct.data.products[0].id }],
      };
      console.log("updatedSubscription", updatedSubscription);

      const responseSubscriptions = await axios.put(
        `https://cors-anywhere.herokuapp.com/https://app.vindi.com.br/api/v1/subscriptions/${subscriptionId}`,
        updatedSubscription,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${token64}`,
          },
        }
      );

      console.log("responseSubscriptions", responseSubscriptions.data);

      await api.put(
        `escritorio/${officeId}`,
        {
          plano,
          data_inicio_plano: new Date(),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("Error", err);
      console.log("Error", err.response?.data);
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);

        // addToast({
        //   type: "error",
        //   title: "Erro na cadastro",
        //   description: `Ocorreu um erro ao fazer cadastro, tente novamente.`,
        // });
      }
    }
  };

  const handleCancelSubscription = async () => {
    await axios.delete(
      `https://cors-anywhere.herokuapp.com/https://app.vindi.com.br/api/v1/subscriptions/${subscriptionId}`,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${token64}`,
        },
      }
    );

    await api.put(
      `escritorio/${officeId}`,
      {
        plano: "",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    addToast({
      type: "sucess",
      title: "Plano cancelado com sucesso",
    });

    setLoading(false);
  };

  return (
    <div className="ehad">
      <Header2 />
      <Container>
        <Blue>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <section className="pricing-container">
              <h1>Meu Plano</h1>
              <p>SMART</p>
              <div className="plans-container">
                {PlansData.map((plan) => (
                  <GradientCard
                    key={plan.id}
                    code={plan.code}
                    plano={plano}
                    onClick={() => setPlano(plan.code)}
                  >
                    <GradientCardContainer>
                      <GradientText
                        style={{ fontSize: 16 }}
                        code={plan.code}
                        plano={plano}
                      >
                        {plan.name}
                      </GradientText>
                      <GradientText code={plan.code} plano={plano}>
                        R${plan.value}
                      </GradientText>

                      {plan.offers.map((offer) => (
                        <li
                          style={{
                            color: plan.code !== plano ? "#000000" : "#ffffff",
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

            <div className="btnblue">
              <Button
                className="btnazul1"
                isLoading={loading}
                type="button"
                onClick={handleCancelSubscription}
              >
                Cancelar Plano
              </Button>
              <Button className="btnazul" isLoading={loading} type="submit">
                Confirmar
              </Button>
            </div>
          </Form>
        </Blue>
      </Container>
    </div>
  );
};

export default Meuplano;
