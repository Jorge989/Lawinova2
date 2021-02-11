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
} from "./styles";
import api from "../../services/api";
import * as Yup from "yup";

import getValidationErrors from "../../utils/getValidationErros";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { useToast } from "../../hooks/toast";
import { useAuth } from "../../hooks/auth";
import axios from "axios";
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

const Testenovocadastro: React.FC = () => {
  const { plano } = useParams<RouteParams>();
  console.log(useParams());

  // const {plano_usuario} = plano ? JSON.parse(plano) : ''
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [qtdAdvogados, setQtdAdvogados] = useState("");
  const [tel, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [qtd, setQtdprocessos] = useState("");
  const [planos, setTipoPlanos] = useState("");
  const [tipoPerfil, setTipoPerfl] = useState("");
  const [url, setUrl] = useState("");
  const [errorE, setErrorE] = useState([""]);
  const [errorS, setErrorS] = useState([""]);
  const [passwordError, setPasswordError] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [amountDays, setAmountDays] = useState<number>();
  const [inputType, setInputType] = useState("password");
  const [gender, setGender] = useState("cpf");

  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();
  const { addToast } = useToast();

  useEffect(() => {
    api
      .get<
        {
          id_plano: string;
          id_plano_externo: string;
          descricao: string;
          qtde_usuarios: number;
          qtde_processos: number;
          qtde_armazenamento: null;
          qtde_dias: number;
        }[]
      >(`/planos/?id_plano=${plano}`)
      .then((response) => {
        setAmountDays(response.data[0].qtde_dias);
      })
      .catch((err) => console.log("Error", err));
  }, []);

  const handleSubmit = useCallback(
    async (data: {
      nome: string;
      email: string;
      telefone: string;
      senha: string;
      processos: string;
    }): Promise<void> => {
      console.log("Data", data);
      console.log("tipoPerfil", tipoPerfil);
      console.log("qtdavogados", qtdAdvogados);
      console.log("Plano", planos);
      console.log("Telefone", data.telefone.replace(/[ ]|[()-]/g, ""));
      setLoading(true);
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          nome: Yup.string().required("Nome é obrigatório"),
          telefone: Yup.string().required("Telefone é obrigatório"),
          email: Yup.string().required("E-mail é obrigatório"),
          senha: Yup.string()
            .trim()
            .matches(
              /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1}).*$/,
              "senha deve conter pelo menos 8 caracteres, um número e um caractere especial"
            )
            .min(8, "No minimo 8 dígitos"),
          processos: Yup.string().required("Processos é obrigatório"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const perfil = qtdAdvogados === "1" ? "autonomo" : tipoPerfil;

        console.log("Aqui", {
          email: data.email,
          nome: data.nome,
          senha: data.senha,
          perfil,
        });

        const response = await api.post<{
          token: string;
          usuario: UserResponse;
        }>("usuarios", {
          email: data.email,
          nome: data.nome,
          senha: data.senha,
          perfil,
        });

        const sendOfficeData = {
          tipo_documento: gender,
          documento: "",
          nome: data.nome,
          plano: plano === "beta" ? "beta" : planos,
          data_inicio_plano: startDate,
          data_final_trial: plano === "beta" ? endBetaDate : endTrialDate,
          tipo_pag: "cartao_credito",
          nick_name: data.nome,
          email: data.email,
          telefone: "55" + data.telefone.replace(/[ ]|[()-]/g, ""),
          qtde_processos: data.processos,
          quantidade_advogados: qtdAdvogados,
          tipo_escritorio: tipoPerfil,
        };

        console.log("sendOfficeData", sendOfficeData);

        await api.post<OfficeResponse>("escritorios", sendOfficeData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${response.data.token}`,
          },
        });

        await signIn({
          email: data.email,
          senha: data.senha,
        });

        history.push("/home");
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
    [addToast, signIn, gender, tipoPerfil, qtdAdvogados, planos]
  );

  function handlePlano({ target }: React.ChangeEvent<HTMLSelectElement>) {
    switch (target.value) {
      case "1":
        return setTipoPlanos("trial1"), setQtdAdvogados("1");
      case "3":
        return setTipoPlanos("trial2"), setQtdAdvogados("3");
      case "6":
        return setTipoPlanos("trial3"), setQtdAdvogados("6");
      default:
        setTipoPlanos("");
    }
  }
  function handleEscritorio({ target }: React.ChangeEvent<HTMLSelectElement>) {
    switch (target.value) {
      case "autonomo":
        return (
          setTipoPerfl("autonomo"),
          setTipoPlanos("trial1"),
          setQtdAdvogados("1")
        );
      case "admin": {
        return setTipoPerfl("admin"), setTipoPlanos(""), setQtdAdvogados("");
      }
      default:
        setTipoPlanos(""), setTipoPerfl("");
    }
  }

  const handleGender = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value);
  };

  console.log("amountDays", amountDays);
  const endBetaDate = amountDays
    ? new Date(new Date().getTime() + 86_400_000 * amountDays).toISOString()
    : new Date(new Date().getTime() + 31_536_000_000).toISOString();
  const endTrialDate = amountDays
    ? new Date(new Date().getTime() + 86_400_000 * amountDays).toISOString()
    : new Date(new Date().getTime() + 1_209_600_000).toISOString();

  const startDate = new Date(new Date()).toISOString();

  // console.log("startDate", startDate);
  // console.log("endDate", endDate);

  function converteData(
    data: String,
    divisorPraSeparar: String,
    divisorPraColocar: String
  ) {
    const temp = data.split(`${divisorPraSeparar}`);
    // console.log("data", temp);
    const ano = temp[2].split(" ");
    const dataBanco =
      ano[0] +
      `${divisorPraColocar}` +
      temp[1] +
      `${divisorPraColocar}` +
      temp[0];
    return dataBanco;
  }
  // console.log(dataFormatadaInicio + "esse");
  // console.log(dataFormatadaFim + "esse");
  return (
    <div>
      <Header2 />
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
                  maxLength={15}
                  onKeyUp={(e) => {
                    const value = e.currentTarget.value
                      .replace(/\D/g, "")
                      .replace(/(\d{2})(\d)/, "($1) $2")
                      .replace(/(\d{5})(\d)/, "$1-$2");

                    e.currentTarget.value = value;
                    return e;
                  }}
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
                  type={inputType}
                  placeholder="Dica: 8 digitos + 1 caractere especial"
                  onChange={(e) => setSenha(e.target.value)}
                />
                <div className="div4">
                  <div className="input9">
                    <h2>Advogado</h2>

                    <select
                      onChange={handleEscritorio}
                      className="inputsel1"
                      name="qtd"
                      placeholder="Qtd.advogados"
                    >
                      <option className="tip" value="0">
                        Tipo:
                      </option>
                      <option id="autonomo" value="autonomo">
                        Autonomo
                      </option>
                      <option id="admin" value="admin">
                        Escritorio
                      </option>
                    </select>
                  </div>

                  <div className="input9">
                    {tipoPerfil !== "autonomo" && (
                      <h2 className="qtd">Qtd.Advogados</h2>
                    )}
                    {tipoPerfil !== "autonomo" && (
                      <select
                        onChange={handlePlano}
                        className="inputsel2"
                        name="qtd"
                        placeholder="Qtd.advogados"
                      >
                        <option value="0">Qtd.Advogados:</option>
                        <option value="1">1 advogado</option>
                        <option value="3">Até 3 advogados</option>
                        <option value="6">Até 6 advogados</option>
                      </select>
                    )}
                  </div>
                </div>

                <div className="div5">
                  <h2>Quantidade estimada de processos</h2>
                  <Input
                    onChange={(e) => setQtdprocessos(e.target.value)}
                    className="input2"
                    name="processos"
                    type="text"
                    placeholder="Quantidade de processos"
                  />
                </div>
                <Button className="btnazul" isLoading={loading} type="submit">
                  Cadastrar
                </Button>
              </div>
              <div className="politica">
                <h4>Ao continuar, você concorda com a&nbsp;</h4>

                <h4 className="policticablue"> Política de Privacidade</h4>
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
