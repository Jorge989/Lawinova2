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
import Header2 from   "../../Components/Header";
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
import { useParams } from 'react-router-dom'
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
const NovoCadastro: React.FC = () => {
  const { plano } = useParams<RouteParams>();
  console.log(useParams());
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SigInFormData): Promise<void> => {
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

        const response = await api.post("usuarios", data);

        history.push("/planos", {
          loginDTO: data,
          userData: response.data,
        });
        
        addToast({
          type: "sucess",
          title: "Cadastro realizado com sucesso",
        });

   
      } catch (err) {
        console.log(err);
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
    },
    [addToast]
  );

  const [name, setName] = useState("");
  const [tel, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [url, setUrl] = useState("");
  const [errorE, setErrorE] = useState([""]);
  const [errorS, setErrorS] = useState([""]);
  const [passwordError, setPasswordError] = useState("");

  var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
  var regemail = /^\w+([-+.']\w+)@\w+([-.]\w+).\w+([-.]\w+)*$/;
  const eye = <FiEyeOff />;

  const [passwordShown, setPasswordShown] = useState(false);
  const [inputType, setInputType] = useState("password");
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

    const response = await api.post("usuarios", dadosCadastro);

    const { profileObj } = data;

    const { email: email_, familyName: nome_ } = data.profileObj;

    history.push("/cadastroinfo", {
      loginDTO: {
        ...data,
        email: email_,
        nome: nome_,
      },
      userData: response.data,
      
    });
    
    

    addToast({
      type: "sucess",
      title: "Cadastro realizado com sucesso",
    });
  }
  

  const responseFacebook = async (response: any) => {
    const dadosCadastro = {
      email: response.userID + "@facebook.com",
      nome: response.name,
      tipo_conta: "facebook",
      senha: response.userID + "!@#$J",
      perfil: response.picture?.data.url,
    };

    const apiresponse = await api.post("usuarios", dadosCadastro);

    history.push("/cadastroinfo", {
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

  return (
    <div>
    <Header2>

</Header2>
    <Container>

      <Blue>
      
      
          
        <div className="formBox">
          <h3>Cadastrar</h3>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <div className="input1">
            <h2>Nome</h2>
            <Input  className="input"name="nome" icon={FiUser} type="text" placeholder="nome" />
            <h2>Telefone</h2>
            
            <Input
             className="input"
              name="telefone"
              icon={FiPhoneCall}
              type="text"
              placeholder="(00)000000000"
            />
            <h2>Email</h2>
            <Input
             className="input"
              name="email"
              icon={FiMail}
              type="email"
              placeholder="email"
            />
            
            <h2>Senha</h2>
            <Input
             className="input"
              name="senha"
              icon={FiLock}
              type={inputType}
              placeholder="Senha"
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
              <h4>Ao continuar, voçê concorda com a&nbsp;</h4>
        
              <h4 className="policticablue"> Política de Privacidade</h4>
              </div>
            <div className="redessociais">
            <GoogleLogin
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
          />
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
