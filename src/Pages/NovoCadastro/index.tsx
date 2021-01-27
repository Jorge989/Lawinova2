import React, { useState, useEffect, useCallback, useRef } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import { FiMail } from "react-icons/fi";
import { FiPhoneCall } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import Header2 from "../../Components/Header";
import FacebookLogin from "react-facebook-login";
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { Link, useHistory } from "react-router-dom";
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

import getValidationErrors from "../../utils/getValidationErros";
import Input from "../../Components/Input";
import { useParams } from "react-router-dom";
import Button from "../../Components/Button";
import { useToast } from "../../hooks/toast";
import { useAuth } from "../../hooks/auth";
interface SigInFormData {
  email: string;
  senha: string;
  nome: string;
}
interface LocationState {
  token: string;
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
interface RouteParams {
  plano: string;
}
interface UserResponse {
  id_usuario: number;
  nome: string;
  status_usuario: string;
  tipo_conta: string;
  email: string;
}

interface OfficeResponse {
  data_final_trial: string;
  data_inicio_plano: string;
  documento: string;
  email: string;
  id_escritorio: number;
  nick_name: string;
  nome: string;
  plano: string;
  quantidade_advogados: number;
  status_plano: string;
  telefone: string;
  tipo_documento: string;
  tipo_escritorio: string;
  tipo_pag: string;
}

const NovoCadastro: React.FC = () => {
  const { plano } = useParams<RouteParams>();
  const { signIn, setAuthData } = useAuth();
  console.log(useParams());
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [name, setName] = useState("");
  const [tel, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [url, setUrl] = useState("");
  const [errorE, setErrorE] = useState([""]);
  const [errorS, setErrorS] = useState([""]);
  const [passwordError, setPasswordError] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [inputType, setInputType] = useState("password");
  const [gender, setGender] = useState("cpf");

  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: {
      nome: string;
      email: string;
      telefone: string;
      senha: string;
    }): Promise<void> => {
      console.log("Data", data);

      setLoading(true);
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          nome: Yup.string().required("Nome obrigatório"),
          email: Yup.string().required("E-mail obrigatório"),

          senha: Yup.string()
            .trim()
            .matches(
              /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1}).*$/,
              "senha deve conter pelo menos 8 caracteres, um número e um caractere especial"
            )
            .min(8, "No minimo 8 dígitos"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const response = await api.post<{
          token: string;
          usuario: UserResponse;
        }>("usuarios", data);

        // ({
        //   loginDTO: data,
        //   userData: response.data,
        //   email: email,
        // });
        console.log(response.data);
        console.log(name + "nome aqui");

        const plans: { [key: string]: number } = {
          individual: 1,
          pro: 2,
          premium: 3,
        };

        const numberOfLawyers = plans[plano];
        console.log("numberOfLawyers", numberOfLawyers);

        const sendOfficeData = {
          tipo_documento: gender,
          nome: data.nome,
          documento: "CNPJ",
          plano: plano,
          data_inicio_plano: dataFormatadaInicio,
          data_final_trial: dataFormatadaFim,
          tipo_pag: "cartao_credito",
          nick_name: data.nome,
          email: data.email,
          telefone: "55" + data.telefone,
          // qtde_processos: qtd,
          quantidade_advogados: 0,
          tipo_escritorio: "escritorio",
        };

        // await signIn({ email: data.email, senha: data.senha });

        console.log("sendOfficeData", sendOfficeData);

        const responseOffice = await api.post<OfficeResponse>(
          "escritorios",
          sendOfficeData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${response.data.token}`,
            },
          }
        );

        console.log("PLANO", plano);
        console.log("TOKEN", response.data);

        console.log(responseOffice.data);

        console.log(data.nome + "nome aqui");
        history.push("/planos", {
          plano: plano,
          token: response.data.token,
          officeId: responseOffice.data.id_escritorio,
          userId: response.data.usuario.id_usuario,
          username: response.data.usuario.nome,
          userEmail: data.email,
          userPhone: "55" + data.telefone,
          userPassword: data.senha,
        });
        addToast({
          type: "sucess",
          title: "Cadastro realizado com sucesso",
        });
        // console.log(data.userData.token)
      } catch (err) {
        console.log("Error", err);
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
          console.log(name + "nome aqui");
        }
      }
    },
    [addToast]
  );

  var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
  var regemail = /^\w+([-+.']\w+)@\w+([-.]\w+).\w+([-.]\w+)*$/;
  const eye = <FiEyeOff />;

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown === true ? false : true);
    setInputType(inputType === "password" ? "text" : "password");
  };

  <i onClick={togglePasswordVisiblity}>{eye}</i>;

  useEffect(() => {
    api.get("escritorios/listar").then((response) => {
      console.log(response.data);
    });
  }, []);

  const responseGoogle = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ): void => {
    if (!("profileObj" in response)) return;
    setName(response.profileObj.name);
    setEmail(response.profileObj.email);
    setUrl(response.profileObj.imageUrl);
    handleLogin(response);
  };

  async function handleLogin(
    data: GoogleLoginResponse | GoogleLoginResponseOffline
  ) {
    if (!("profileObj" in data)) return;
    const dadosCadastro = {
      email: data.profileObj.email,
      nome: data.profileObj.name,
      tipo_conta: "google",
      senha: data.googleId + "!@#$J",
      perfil: data.profileObj.imageUrl,
    };

    const response = await api.post<{
      token: string;
      usuario: UserResponse;
    }>("usuarios", dadosCadastro);

    const { profileObj } = data;

    const { email: email_, familyName: nome_ } = data.profileObj;

    // const sendOfficeData = {
    //   tipo_documento: gender,
    //   nome: dadosCadastro.nome,
    //   documento: "CNPJ",
    //   plano: plano,
    //   data_inicio_plano: dataFormatadaInicio,
    //   data_final_trial: dataFormatadaFim,
    //   tipo_pag: "cartao_credito",
    //   nick_name: dadosCadastro.nome,
    //   email: dadosCadastro.email,
    //   telefone: dadosCadastro.telefone,
    //   // qtde_processos: qtd,
    //   quantidade_advogados: 0,
    //   tipo_escritorio: "escritorio",
    // };

    // await signIn({ email: data.email, senha: data.senha });

    // console.log("sendOfficeData", sendOfficeData);

    // const responseOffice = await api.post<OfficeResponse>(
    //   "escritorios",
    //   sendOfficeData,
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${response.data.token}`,
    //     },
    //   }
    // );

    // history.push("/planos", {
    //   plano: plano,
    //   token: response.data.token,
    //   officeId: responseOffice.data.id_escritorio,
    //   userId: response.data.usuario.id_usuario,
    //   username: response.data.usuario.nome,
    //   userEmail: dadosCadastro.email,
    //   userPhone: dadosCadastro.telefone,
    //   userPassword: dadosCadastro.senha,
    // });

    // history.push("/planos", {
    //   loginDTO: {
    //     ...data,
    //     email: email_,
    //     nome: nome_,
    //   },
    //   userData: response.data,
    // });

    addToast({
      type: "sucess",
      title: "Cadastro realizado com sucesso",
    });
  }

  const responseFacebook = async (response: any) => {
    console.log("Response Facebook: ", response);

    const dadosCadastro = {
      email: response.userID + "@facebook.com",
      nome: response.name,
      tipo_conta: "facebook",
      senha: response.userID + "!@#$J",
      perfil: response.picture?.data.url,
    };

    const apiresponse = await api.post("usuarios", dadosCadastro);

    history.push("/planos", {
      loginDTO: {
        email: response.userID + "@facebook.com",
        nome: response.name,
      },
      userData: apiresponse.data,
    });

    addToast({
      type: "sucess",
      title: "Cadastro realizado com sucesso",
    });
  };

  const componetClicked = (data: any) => {
    console.warn(data);
  };
  const handleGender = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value);
  };
  const dataFim = new Date(new Date().getDate() + 120960000).toLocaleString();
  const dataStart = new Date(new Date()).toLocaleString();
  const dataFormatadaInicio = converteData(dataStart, "/", "-");
  const dataFormatadaFim = converteData(dataFim, "/", "-");
  console.log(dataStart);
  console.log(dataFim);

  function converteData(
    data: String,
    divisorPraSeparar: String,
    divisorPraColocar: String
  ) {
    const temp = data.split(`${divisorPraSeparar}`);
    console.log("data", temp);
    const ano = temp[2].split(" ");
    const dataBanco =
      ano[0] +
      `${divisorPraColocar}` +
      temp[1] +
      `${divisorPraColocar}` +
      temp[0];
    return dataBanco;
  }
  console.log(dataFormatadaInicio + "esse");
  console.log(dataFormatadaFim + "esse");

  return (
    <div>
      <Header2 />
      <Container>
        <Blue>
          <div className="formBox">
            <h3>Cadastrar</h3>

            <Form ref={formRef} onSubmit={handleSubmit}>
              <div className="input1">
                <h2>Nome</h2>
                <Input
                  className="input"
                  name="nome"
                  value={name}
                  icon={FiUser}
                  type="text"
                  placeholder="nome"
                  onChange={(e) => setName(e.target.value)}
                />
                <h2>Telefone</h2>

                <Input
                  className="input"
                  name="telefone"
                  icon={FiPhoneCall}
                  type="text"
                  value={tel}
                  maxLength={13}
                  preffix
                  placeholder="(xx) xxxxx-xxxx"
                  onChange={(e) => setTelefone(e.target.value)}
                />
                <h2>Email</h2>
                <Input
                  className="input"
                  name="email"
                  value={email}
                  icon={FiMail}
                  type="email"
                  placeholder="email"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <h2>Senha</h2>
                <Input
                  className="input"
                  name="senha"
                  icon={FiLock}
                  value={senha}
                  type={inputType}
                  placeholder='Dica: 8 digitos + 1 caractere especial'
                  onChange={(e) => setSenha(e.target.value)}
                />

                <Button
                  className="btnazul"
                  isLoading={loading}
                  type="submit"
                  onClick={() => {
                    handleSubmit;
                    handleLogin;
                  }}
                >
                  Cadastrar
                </Button>
              </div>
              <div className="politica">
                <h4>Ao continuar, você concorda com a&nbsp;</h4>

                <h4 className="policticablue"> Política de Privacidade</h4>
              </div>
              <div className="redessociais">
                {/* <GoogleLogin
                  clientId="211368015593-fucd3no6bv208m9iuf809l9f72ulmejr.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <button
                      className="btngoogle"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      <Googleicon />
                    </button>
                  )}
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />
                <FacebookLogin
                  appId="2846445278933444"
                  autoLoad={false}
                  fields="name,email,picture"
                  onClick={componetClicked}
                  callback={responseFacebook}
                  icon={<Facebokcion />}
                  textButton=""
                  cssClass="facebook"
                /> */}
              </div>
              <button className="possuilogin">
                <a href="login">Já possui login?</a>
              </button>
            </Form>
          </div>
        </Blue>
        {/* <button onClick={togglePasswordVisiblity} type="button" className="eye">
        {passwordShown ? <FiEye size={21} /> : <FiEyeOff size={21} />}
      </button> */}
      </Container>
    </div>
  );
};

export default NovoCadastro;
