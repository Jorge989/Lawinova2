import React, { useState, useEffect, useRef } from "react";
import { FaCreditCard } from "react-icons/fa";
import { Form } from "@unform/web";
import creditCardType from "credit-card-type";
import { FormHandles } from "@unform/core";

import CVVImage2 from "../../assets/ccvcard.png";
import { FiEyeOff } from "react-icons/fi";
import Header2 from "../../Components/Header";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import { Container, Blue } from "./styles";
import api from "../../services/api";
import * as Yup from "yup";
import utf8 from "utf8";
import { encode as btoa } from "base-64";

import getValidationErrors from "../../utils/getValidationErros";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { useToast } from "../../hooks/toast";
import { getFormattedDetailedPlans } from "../../data/DetailedPlans";
import { useAuth } from "../../hooks/auth";
import { getPlanData } from "../../data";

// const CVVIcon: React.FC = (props) => {
//   // return (
//   //   <div
//   //     style={{
//   //       display: "flex",
//   //       justifyContent: "center",
//   //       alignItems: "center",
//   //       marginRight: 4,
//   //     }}
//   //   >
//   //     <img src={CVVImage} width="24" height="24" />
//   //   </div>
//   // );
// };

interface ChosenPlanOptions {
  id: string;
  name: string;
  value: number;
  offers: {
    id: string;
    name: string;
  }[];
}

interface LocationProps {
  customerId: number;
  phoneId: number;
  plano: string;
  contractAccepted: boolean;
  officeId: number;
  token: string;
  userId: number;
  userPhone: string;
  userPassword?: string;
  userEmail: string;
  username: string;
  isPromo: boolean;
}

const Detalhes: React.FC = () => {
  const { signIn } = useAuth();
  const {
    state: {
      plano,
      customerId,
      phoneId,
      contractAccepted,
      officeId,
      token,
      userEmail,
      userId,
      userPhone,
      userPassword,
      username,
      isPromo,
    },
  } = useLocation<LocationProps>();

  console.log(
    "Params Dados",
    plano,
    customerId,
    phoneId,
    contractAccepted,
    officeId,
    token,
    userEmail,
    userId,
    userPhone,
    userPassword,
    username,
    isPromo
  );

  console.log("CustomerId", customerId);

  const [loading, setLoading] = useState(false);
  const [planId, setPlanId] = useState(0);
  const [productId, setProductId] = useState(0);
  const [paymentData, setPaymentData] = useState({
    holderName: "",
    cardExpiration: "",
    cardNumber: "",
    cardCVV: "",
    paymentMethodCode: "credit_card",
    paymentCompanyCode: "",
  });
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const chosenPlan: ChosenPlanOptions | undefined = getFormattedDetailedPlans(
    isPromo
  ).find((plan) => plan.code === plano.replace("promo", "plano"));

  const privateApi = "tey-UhF26q2TMv6cTF43fcMsGwJEy4cdSZFKh-nPQaQ:";
  const publicApi = "39zh9E2rTCZAZ_Vu1-qbIbty-7KUciSaw0Ssd7s5bhg";
  const bytes = utf8.encode(privateApi);
  const token64 = btoa(bytes);
  const publicToken64 = btoa(utf8.encode(publicApi));
  console.log(token64 + "esse token");

  useEffect(() => {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://app.vindi.com.br/api/v1/plans",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${token64}`,
          },
        }
      )
      .then((response) => setPlanId(response.data.plans[0].id));

    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://app.vindi.com.br/api/v1/products?query=name=${plano.replace(
          "promo",
          "plano"
        )}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${token64}`,
          },
        }
      )
      .then((response) => setProductId(response.data.products[0].id));
  }, []);

  console.log("Plan e Product Ids", planId, productId);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        cardNumber: Yup.string().required("O número do cartão é obrigatório"),
        holderName: Yup.string().required("O Nome do cartão é obrigatório"),
        cardExpiration: Yup.string()
          .required("A data de expiração é obrigatório")
          .length(7, "Precisar ser uma data no formato 00/0000"),
        cardCVV: Yup.string()
          .required("O cvv do cartão é obrigatório")
          .min(3, "O tamanho do cvv precisa ser de 3 ou 4 dígitos")
          .max(4, "O tamanho do cvv precisa ser de 3 ou 4 dígitos"),
      });

      await schema.validate(
        {
          cardNumber: paymentData.cardNumber,
          holderName: paymentData.holderName,
          cardExpiration: paymentData.cardExpiration,
          cardCVV: paymentData.cardCVV,
        },
        {
          abortEarly: false,
        }
      );

      console.log("paymentData", paymentData);
      console.log("paymentCompanyCode", getCardBrand(paymentData.cardNumber));

      if (!getCardBrand(paymentData.cardNumber)) {
        return addToast({
          type: "error",
          title: "Erro nos dados de pagamento",
          description: `Cartão de credito não suportado`,
        });
      }

      const paymentProfiles = {
        holder_name: paymentData.holderName,
        card_expiration: paymentData.cardExpiration,
        card_number: paymentData.cardNumber,
        card_cvv: paymentData.cardCVV,
        payment_method_code: paymentData.paymentMethodCode,
        payment_company_code: getCardBrand(paymentData.cardNumber),
      };

      console.log("paymentProfiles", paymentProfiles);

      const responsePaymentProfiles = await axios.post<{
        payment_profile: { gateway_token: string };
      }>(
        `https://cors-anywhere.herokuapp.com/https://app.vindi.com.br/api/v1/public/payment_profiles`,
        paymentProfiles,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${publicToken64}`,
          },
        }
      );

      console.log("responsePaymentProfiles", responsePaymentProfiles.data);

      const associateTokenData = {
        gateway_token:
          responsePaymentProfiles.data.payment_profile.gateway_token,
        customer_id: customerId,
        payment_method_code: "credit_card",
      };

      console.log("associateTokenData", associateTokenData);

      await axios.post(
        `https://cors-anywhere.herokuapp.com/https://app.vindi.com.br/api/v1/payment_profiles`,
        associateTokenData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${token64}`,
          },
        }
      );

      const subscriptionData = {
        plan_id: planId,
        customer_id: customerId,
        payment_method_code: "credit_card",
        product_items: [{ product_id: productId }],
      };

      console.log("subscriptionData", subscriptionData);

      await axios.post(
        `https://cors-anywhere.herokuapp.com/https://app.vindi.com.br/api/v1/subscriptions`,
        subscriptionData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${token64}`,
          },
        }
      );

      await api.put(
        `usuarios/${userId}`,
        {
          perfil: getPlanData(plano, isPromo).tipo_escritorio,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await api.put(
        `escritorio/${officeId}`,
        {
          tipo_escritorio: getPlanData(plano, isPromo).tipo_escritorio,
          quantidade_advogados: getPlanData(plano, isPromo)
            .quantidade_advogados,
          qtde_processos: getPlanData(plano, isPromo).qtde_processos,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (userPassword) {
        await signIn({ email: userEmail, senha: userPassword });
      }

      history.push("/home");

      addToast({
        type: "sucess",
        title: "Cadastro realizado com sucesso",
      });
    } catch (err) {
      console.log("Error", err);
      console.log("Error", err.response?.data);
      setLoading(false);
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return err.inner.map((error) =>
          addToast({
            type: "error",
            title: "Erro nos dados de pagamento",
            description: `${error.message}`,
          })
        );
      }

      if (err.response?.data.errors?.length) {
        return err.response?.data.errors.map(
          (error: { id: string; message: string; parameter: string }) =>
            addToast({
              type: "error",
              title: "Erro nos dados de pagamento",
              description: ` ${error.message}`,
            })
        );
      }
    }
  };

  const getCardBrand = (cardNumber: string) => {
    const acceptedCardBrand = [
      "mastercard",
      "visa",
      "american_express",
      "hipercard",
      "elo",
      "diners_club",
    ];
    const cardBrand = creditCardType(cardNumber).filter((card) => card.type);

    return cardBrand.length
      ? acceptedCardBrand.includes(cardBrand[0].type.replace("-", "_")) &&
          cardBrand[0].type.replace("-", "_")
      : "";
  };

  // const regexVisaValidator = new RegExp(/^4[0-9]{12}(?:[0-9]{3})/);
  // const regexMasterCardValidator = new RegExp(/^5[1-5][0-9]{14}/);

  // const isMasterCard = regexMasterCardValidator.test(cardNumber);
  // const isVisa = regexVisaValidator.test(cardNumber);

  // if (isMasterCard) return "mastercard";
  // if (isVisa) return "visa";
  // Visa: ^4[0-9]{12}(?:[0-9]{3})
  // Mastercard: ^5[1-5][0-9]{14}
  // Amex: ^3[47][0-9]{13}
  // Diners Club: ^3(?:0[0-5]|[68][0-9])[0-9]{11}
  // Discover: ^6(?:011|5[0-9]{2})[0-9]{12}
  // JCB: ^(?:2131|1800|35\d{3})\d{11}

  const handlePayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPaymentData({
      ...paymentData,
      [id]: value,
    });
  };
  const eye = <FiEyeOff />;
  const [passwordShown, setPasswordShown] = useState(false);
  const [inputType, setInputType] = useState("password");
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown === true ? false : true);
    setInputType(inputType === "password" ? "text" : "password");
  };

  return (
    <div>
      <Header2 />
      <Container>
        <Blue>
          <div className="formBox">
            <h3>Detalhe do Pagamento</h3>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <div className="envolta">
                <div className="div1">
                  <div className="input1">
                    <h2>Número do Cartão</h2>
                    <Input
                      className="input"
                      type="text"
                      placeholder="número do cartão"
                      name="cardNumber"
                      id="cardNumber"
                      value={paymentData.cardNumber}
                      onChange={handlePayment}
                    />
                  </div>
                  <div className="input2">
                    <h2>Nome do titular (gravado no cartão)</h2>

                    <Input
                      className="input"
                      type="text"
                      placeholder="nome do titular (gravado no cartão)"
                      name="holderName"
                      id="holderName"
                      value={paymentData.holderName}
                      onChange={handlePayment}
                    />
                  </div>
                  <div className="div4">
                    <div className="input8">
                      <h2>Data de válidade</h2>
                      <Input
                        className="input"
                        placeholder="00/0000"
                        maxLength={7}
                        onKeyUp={(e) => {
                          const value = e.currentTarget.value
                            .replace(/\D/g, "")
                            .replace(/^(\d{2})(\d)/, "$1/$2");
                          e.currentTarget.value = value;
                          return e;
                        }}
                        name="cardExpiration"
                        id="cardExpiration"
                        value={paymentData.cardExpiration}
                        type="text"
                        onChange={handlePayment}
                      />
                    </div>
                    <div className="input9">
                      <h2>Cód. de segurança</h2>

                      <Input
                        className="input"
                        type="text"
                        placeholder="***"
                        maxLength={4}
                        name="cardCVV"
                        id="cardCVV"
                        //  icon={FaCreditCard}
                        iconPosition="right"
                        value={paymentData.cardCVV}
                        onChange={handlePayment}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <img src={CVVImage2} className="cartao"></img>
                </div>

                <div className="resumo">
                  <div className="dentro">
                    <h2 className="resumopedido">Resumo do pedido</h2>
                    <hr />
                    <div className="planoS">
                      <h4>Plano {chosenPlan?.name}</h4>
                      <h4 className="money">R$ {chosenPlan?.value}</h4>
                    </div>
                    <div className="resumodoplano">
                      <h4>Resumo do Plano</h4>
                      <ul>
                        {chosenPlan?.offers.map((offer) => (
                          <li key={offer.id}>{offer.name}</li>
                        ))}
                      </ul>
                      <div className="planoS2">
                        <h4>Total:</h4>
                        <h4 className="money2">R$ {chosenPlan?.value}</h4>
                      </div>
                    </div>
                    <hr className="hr2" />
                  </div>
                </div>
              </div>
              <div className="btnblue">
                <Button
                  className="btnazul1"
                  type="button"
                  onClick={() => {
                    history.push("/dados", {
                      plano,
                      customerId,
                      phoneId,
                      contractAccepted,
                      officeId,
                      token,
                      userEmail,
                      userId,
                      userPhone,
                      userPassword,
                      username,
                    });
                  }}
                >
                  Voltar
                </Button>
                <Button className="btnazul" isLoading={loading} type="submit">
                  Confirmar
                </Button>
              </div>
            </Form>
          </div>
        </Blue>
      </Container>
    </div>
  );
};

export default Detalhes;
