import React, {
  useState,
  useEffect,
  useCallback,
  FormEvent,
  useRef,
  InputHTMLAttributes,
} from "react";

import { FiArrowLeft } from "react-icons/fi";
import { Radio } from "@material-ui/core";
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
import { useParams } from "react-router-dom";
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
  Entra
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
  loginDTO: LoginDTO;
  userData: UserData;
}
interface RouteParams {
  plano: string;
}
interface Datecount {
  date1: number;
  date2: number;
}

const Testenovocadastro: React.FC = () => {
  const { plano } = useParams<RouteParams>();
  console.log(useParams());

  // const {plano_usuario} = plano ? JSON.parse(plano) : ''
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
       
        ({
          loginDTO: data,
          userData: response.data,
          email:email,
        });
        console.log(response.data)
            
        await api.post(
          "escritorios",
          {
            tipo_documento: gender,
            nome: name,
            documento:"",
            plano: planos,
            data_inicio_plano: dataFormatadaInicio,
            data_final_trial: dataFormatadaFim,
            tipo_pag: "cartao_credito",
            nick_name: name,
            email: response.data.usuario.email,
            telefone: tel,
            qtde_processos: qtd,
            quantidade_advogados: qtdavogados,
            tipo_escritorio: tipoperfil,
          },
          // {
          //   headers: {
          //     "content-type": "application/json",
          //     //  Authorization: `Bearer ${response.data.token}`,
          //   },
          // }
        );
        history.push("/planos", {
       plano:planos,
        });
        addToast({
          type: "sucess",
          title: "Cadastro realizado com sucesso",
        });
// console.log(data.userData.token)
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
  const [qtdavogados, setQtdadvogados] = useState("");
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

  // useEffect(() => {
  //   api.get("escritorios/listar").then((response) => {
  //     console.log(response.data);
  //   });
  // }, []);

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
  const [trial1, setTrial1] = useState("");
  const [planos, setTipoplanos] = useState("");
  const [tipoperfil, setTipoperfl] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [qtd, setQtdprocessos] = useState("");

  function handlePlano({ target }: React.ChangeEvent<HTMLSelectElement>) {
    switch (target.value) {
      case "1":
        return setTipoplanos("trial1"), setQtdadvogados("1");
      case "3":
        return setTipoplanos("trial2"), setQtdadvogados("3");
      case "6":
        return setTipoplanos("trial3"), setQtdadvogados("6");
      case "7":
        return setTipoplanos("trial4"), setQtdadvogados("7");
      default:
        setTipoplanos("");
    }
  }
  function handleEscritorio({ target }: React.ChangeEvent<HTMLSelectElement>) {
    switch (target.value) {
      case "autonomo":
        return setTipoplanos("trial1"), setTipoperfl("autonomo"),setQtdadvogados("1");
case "escritorio":
  return setTipoperfl("escritorio");
      default:
        setTipoplanos(""),setTipoperfl("")

     
    }
  }
  const [gender, setGender] = useState("cpf");
  const handleGender = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value);
  };
   const dataFim = new Date(new Date().getDate() + 120960000).toLocaleString();
   const dataStart = new Date(new Date()).toLocaleString();
   const dataFormatadaInicio = converteData(dataStart, '/', '-')
   const dataFormatadaFim = converteData(dataFim, '/', '-')
 console.log(dataStart)
  console.log(dataFim)

 
  function converteData(data:String, divisorPraSeparar:String, divisorPraColocar:String) {
    const temp = data.split(`${divisorPraSeparar}`)
    console.log('data', temp)
    const ano = temp[2].split(" ")
    const dataBanco =
    ano[0] +
      `${divisorPraColocar}` +
      temp[1] +
      `${divisorPraColocar}` +
      temp[0]
    return dataBanco
  }
  console.log(dataFormatadaInicio+"esse")
  console.log(dataFormatadaFim+"esse")
  return (
    <div>
      <Header2>

      <Entra>
          <button >
          <a href={`/login`}>Entrar</a>
          </button>
          
         

    
         
          
          
          </Entra>
      </Header2>

      <Container>
        <Blue>
          <div className="formBox">
            <h3 className="h1C">Cadastrar</h3>
   
            <Form ref={formRef} onSubmit={handleSubmit}>
              <div className="radio">
                <div>
               
                  <span className="pessoafisica">Pessoa fisíca</span>
                  <Radio
                    value="cpf"
                    checked={gender === "cpf"}
                    color="primary"
                    onChange={handleGender}
                  />
                </div>
                <div>
                  <span className="pessoajuridica">Pessoa juridíca</span>
                  <Radio
                    value="cnpj"
                    checked={gender === "cnpj"}
                    color="primary"
                    onChange={handleGender}
                  />
                </div>
              </div>
              <div className="input1">
                <h2>Nome</h2>
                <h1>{name}</h1>
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
                <h1>{tel}</h1>
                <Input
                  className="input"
                  name="telefone"
                  value={tel}
                  icon={FiPhoneCall}
                  type="text"
                  placeholder="55(00)000000000"
                  onChange={(e) => setTelefone(e.target.value)}
                />
                <h2>Email</h2>
                <h1>{email}</h1>
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
                <h1>{senha}</h1>
                <Input
                  className="input"
                  name="senha"
                  icon={FiLock}
                  type={inputType}
                  placeholder="Dica: 8 digitos + 1 caractere especial"
                  onChange={(e) => setSenha(e.target.value)}
                />
                <div className="div4">
                  <div className="input9">
                    <h2>Advogado</h2>
                    <h1>{tipoperfil}</h1>
                    <select
                      onChange={handleEscritorio}
                      className="inputsel1"
                      name="qtd"
                      placeholder="Qtd.advogados"
                    >
                      {" "}
                      <option className="tip" value="0">
                        Tipo:
                      </option>
                      <option id="autonomo" value="autonomo">
                        Autonomo
                      </option>
                      <option id="escritorio" value="escritorio">
                        Escritorio
                      </option>
                    </select>
                  </div>

                  <div className="input9">
                    <h2 className="qtd">Qtd.Advogados</h2>
                    <h1>{planos}</h1>
                    <h1>{qtdavogados}</h1>
                    <select
                      onChange={handlePlano}
                      className="inputsel2"
                      name="qtd"
                      placeholder="Qtd.advogados"
                    >
                      {" "}
                      <option value="0">Qtd.Advogados:</option>
                      <option value="1">1 advogado</option>
                      <option value="3">Até 3 advogados</option>
                      <option value="6">Até 6 advogados</option>
                      <option value="7">Mais que 6 advogados</option>
                    </select>
                  </div>
                </div>

                <div className="div5">
                  <h1>{qtd}</h1>
                  <h2>Quantidade estimada de processos</h2>
                  <Input
                    onChange={(e) => setQtdprocessos(e.target.value)}
                    className="input2"
                    name="processos"
                    type="text"
                    placeholder="Quantidade de processos"
                  />
                </div>
                <Button
                  className="btnazul"
                  isLoading={loading}
                  type="submit"
                  onClick={() => {
                    handleSubmit
                   
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

export default Testenovocadastro;
