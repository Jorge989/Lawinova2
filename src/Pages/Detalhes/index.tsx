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

  const [selectedUF, setSelectedUF] = useState("0");
  const [selectedCity, setSelectedCity] = useState("0");
  const [cities, setCities] = useState<string[]>([]);
  const [ufs, setUfs] = useState<string[]>([]);
  const [items, setItems] = useState<Item[]>([]);

  function handleSelectedUF(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;
    setSelectedUF(uf);
  }
  function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;
    setSelectedCity(city);
  }

  const [gender, setGender] = useState("juridica");
  const componetClicked = (data: any) => {
    console.warn(data);
  };
  const handleGender = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value);
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
                    name="numero"
                    type="text"
                    placeholder="número do cartão"
                  />
                </div>
                <div className="input2">
                  <h2>Nome do titular (gravado no cartão)</h2>

                  <Input
                    className="input"
                    name="titular"
                    type="text"
                    placeholder="nome do titular (gravado no cartão)"
                  />
                </div>
                <div className="div4">
                  <div className="input8">
                    <h2>Data de válidade</h2>
                    <Input
                      className="input"
                      name="numero"
                      type="text"
                      placeholder="00/00/0000"
                    />
                  </div>
                  <div className="input9">
                    <h2>Cód. de segurança</h2>

                    <Input
                      className="input"
                      name="complemento"
                      type="text"
                      placeholder="***"
                    />
                  </div>
                </div>
              </div>
         
            
               
                <div className="resumo">
                  <div className="dentro">
<h2 className="resumopedido">Resumo do pedido</h2>
<hr/>
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
<hr className="hr2"/>
 

                </div>
                </div>
                </div>
              <div className="btnblue">
                <Button
                  className="btnazul1"
                  isLoading={loading}
                  type="submit"
                  onClick={() => {
                    handleSubmit;
                    handleLogin;
                  }}
                >
                  Dados de Indentificação
                </Button>
                <Button
                  className="btnazul"
                  isLoading={loading}
                  type="submit"
                  onClick={() => {
                    handleSubmit;
                    handleLogin;
                  }}
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
