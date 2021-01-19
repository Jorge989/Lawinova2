import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  ChangeEvent,
} from "react";
import Radio from "@material-ui/core/Radio";

import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import Header2 from "../../Components/Header";
import FacebookLogin from "react-facebook-login";
import axios from "axios";
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  Container,
  Blue,
  Lockicon1,
  Draw,
  GoogleLogin,
  Googleicon,
  Facebokcion,
} from "./styles";
import api from "../../services/api";
import * as Yup from "yup";
import utf8 from "utf8";
import { encode as btoa } from "base-64";

import getValidationErrors from "../../utils/getValidationErros";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { useToast } from "../../hooks/toast";
interface SigInFormData {
  email: string;
  senha: string;
  nome: string;
}
interface LocationState {
  token: string;
}
interface MyValues {
  state: string;
}

interface Usuario {
  date_insert: string;
  email: string;
  id_usuario: number;
  ip_insert: string;
  nome: string;
  status_usuario: string;
  time_insert: string;
  tipo_conta: string;
  user_insert: string;
}
interface LoginDTO {
  senha: string;
  email: string;
  nome: string;
}

interface UserData {
  token: string;
  usuario: Usuario;
}

interface PushedHistory {
  loginDTO: LoginDTO;
  userData: UserData;
}

interface SigInFormData {
  email: string;
  senha: string;
}
interface MyValues {
  state: string;
}
interface Item {
  id: number;
  title: string;
  image_url: string;
}
interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}
const Detalhes: React.FC = () => {
  const {
    state: { plano, customerId },
  } = useLocation<{
    customerId: number;
    plano: string;
    contractAccepted: boolean;
    officeId: number;
    token: string;
    userId: number;
    userPhone: string;
    userEmail: string;
    username: string;
    email: string;
  }>();

  console.log("Params Dados", plano, customerId);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
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

  const plans: { [key: string]: string } = {
    individual: "Plano1",
    pro: "Plano2",
    premium: "Plano3",
  };

  const privateApi = "tey-UhF26q2TMv6cTF43fcMsGwJEy4cdSZFKh-nPQaQ:";
  const publicApi = "39zh9E2rTCZAZ_Vu1-qbIbty-7KUciSaw0Ssd7s5bhg";
  const bytes = utf8.encode(privateApi);
  const token64 = btoa(bytes);
  const publicToken64 = btoa(utf8.encode(publicApi));
  // console.log(token64 + "esse token");

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
        `https://cors-anywhere.herokuapp.com/https://app.vindi.com.br/api/v1/products?query=name=${plans[plano]}`,
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

      console.log("paymentData", paymentData);
      console.log("paymentCompanyCode", getBrand(paymentData.cardNumber));

      const paymentProfiles = {
        holder_name: paymentData.holderName,
        card_expiration: paymentData.cardExpiration,
        card_number: paymentData.cardNumber,
        card_cvv: paymentData.cardCVV,
        payment_method_code: paymentData.paymentMethodCode,
        payment_company_code: getBrand(paymentData.cardNumber),
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

      addToast({
        type: "sucess",
        title: "Cadastro realizado com sucesso",
      });
    } catch (err) {
      console.log("Error", err);
      console.log("Error", err.response?.data);
      setLoading(false);
      if (err instanceof Yup.ValidationError) {
        console.log(err);
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);

        addToast({
          type: "error",
          title: "Erro na cadastro",
          description: `Ocorreu um erro ao fazer cadastro, tente novamente.`,
        });
      }
      if (err.response?.data) {
        addToast({
          type: "error",
          title: "Erro na cadastro",
          description: `Usuário já cadastrado.
              `,
        });
      }
    }
  };

  const getBrand = (cardNumber: string) => {
    const regexVisaValidator = new RegExp(/^4[0-9]{12}(?:[0-9]{3})/);
    const regexMasterCardValidator = new RegExp(/^5[1-5][0-9]{14}/);

    const isMasterCard = regexMasterCardValidator.test(cardNumber);
    const isVisa = regexVisaValidator.test(cardNumber);

    if (isMasterCard) return "mastercard";
    if (isVisa) return "visa";
    // Visa: ^4[0-9]{12}(?:[0-9]{3})
    // Mastercard: ^5[1-5][0-9]{14}
    // Amex: ^3[47][0-9]{13}
    // Diners Club: ^3(?:0[0-5]|[68][0-9])[0-9]{11}
    // Discover: ^6(?:011|5[0-9]{2})[0-9]{12}
    // JCB: ^(?:2131|1800|35\d{3})\d{11}
  };

  const handlePayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    // console.log("HandleAddress", id);
    setPaymentData({
      ...paymentData,
      [id]: value,
    });
  };

  return (
    <div>
      <Header2></Header2>
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
                        type="text"
                        placeholder="00/0000"
                        name="cardExpiration"
                        id="cardExpiration"
                        value={paymentData.cardExpiration}
                        onChange={handlePayment}
                      />
                    </div>
                    <div className="input9">
                      <h2>Cód. de segurança</h2>

                      <Input
                        className="input"
                        type="text"
                        placeholder="***"
                        name="cardCVV"
                        id="cardCVV"
                        value={paymentData.cardCVV}
                        onChange={handlePayment}
                      />
                    </div>
                  </div>
                </div>

                <div className="resumo">
                  <div className="dentro">
                    <h2 className="resumopedido">Resumo do pedido</h2>
                    <hr />
                    <div className="planoS">
                      <h4>Plano Smart</h4>
                      <h4 className="money">R$ 300,00</h4>
                    </div>
                    <div className="resumodoplano">
                      <h4>Resumo do Plano</h4>
                      <ul>
                        <li>Ilimitado</li>
                        <li>Adicionar processos</li>
                        <li>Controle de equipe</li>
                        <li>Controle de clientes</li>
                        <li>Controle de despesas</li>
                        <li>Atualização historíco de processos</li>
                        <li>Controle de honorários</li>
                        <li>dashboard gerencial</li>
                        <li>Alertas</li>
                        <li>Mapa</li>
                      </ul>
                      <div className="planoS2">
                        <h4>Total:</h4>
                        <h4 className="money2">R$ 300,00</h4>
                      </div>
                    </div>
                    <hr className="hr2" />
                  </div>
                </div>
              </div>
              <div className="btnblue">
                <Button
                  className="btnazul1"
                  // isLoading={loading}
                  type="button"
                  // onClick={() => {
                  //   handleSubmit;
                  //   handleLogin;
                  // }}
                >
                  Dados de Indentificação
                </Button>
                <Button
                  className="btnazul"
                  isLoading={loading}
                  type="submit"
                  // onClick={() => {
                  //   handleSubmit;
                  //   handleLogin;
                  // }}
                  
                >
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
