import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  ChangeEvent,
} from "react";
import { Radio } from '@material-ui/core';
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
const Dados: React.FC = () => {
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

  // const selectStates = document.querySelector('#states');
  // const selectCities = document.querySelector('#cities');
  // function populateStateSelect(){
  //   const selectStates = document.querySelector('#states');
  //   fetch('https://geoapibrasil.herokuapp.com/v1/states')
  //   .then(res => res.json())
  //   .then((states: any[])=>
  //     states.map(state =>{

  //       const option = document.createElement('option');
  //       option.setAttribute ('value',state.state);
  //       option.textContent = state.stateName;
  //       if (selectStates) {
  //         selectStates.appendChild(option);
  //       }

  //     })
  //   )
  // }

  // function populateCitySelect(){

  //   if(selectStates && selectCities){

  //   selectStates.addEventListener('change',()=>{

  //     let nodesSelectCities =selectCities.childNodes;

  //   if(nodesSelectCities && selectStates){
  //     Array.from(nodesSelectCities).map(node => node.remove());
  //     let state= (selectStates as HTMLSelectElement).options.value;
  //     fetch(`https://geoapibrasil.herokuapp.com/v1/cities?state=${state}`)
  //     .then(res => res.json())
  //     .then((cities: any[])=>

  //       selectCities.removeAttribute('disabled')
  //       cities.map(city =>{

  //       const option = document.createElement('option');
  //       option.textContent = city.name;
  //       selectCities.appendChild(option);
  //     });
  //     });
  //   });
  const [selectedUF, setSelectedUF] = useState("0");
  const [selectedCity, setSelectedCity] = useState("0");
  const [cities, setCities] = useState<string[]>([]);
  const [ufs, setUfs] = useState<string[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => {
    api.get("items").then((response) => {
      setItems(response.data);
    });
  }, []);
  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      )
      .then((response) => {
        const ufInitials = response.data.map((uf) => uf.sigla);

        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (selectedUF === "0") {
      return;
    }
    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`
      )
      .then((response) => {
        const cityNames = response.data.map((city) => city.nome);

        setCities(cityNames);
      });
  }, [selectedUF]);

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
            <h3>Dados de indentificação</h3>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <div className="radio">
                <div>
                  <span>Pessoa fisíca</span>
                  <Radio
                    value="fisica"
                    checked={gender === "fisica"}
                    color="primary"
                    onChange={handleGender}
                  />
                </div>
                <div>
                  <span>Pessoa juridíca</span>
                  <Radio
                    value="juridica"
                    checked={gender === "juridica"}
                    color="primary"
                    onChange={handleGender}
                  />
                </div>
              </div>
              <div className="div1">
                <div className="input1">
                  <h2>Nome/Razão Social</h2>
                  <Input
                    className="input"
                    name="nome"
                    type="text"
                    placeholder="nome"
                  />
                </div>
                <div className="input2">
                  <h2>CPF/CNPJ</h2>

                  <Input
                    className="input"
                    name="CPF"
                    type="text"
                    placeholder="CPF"
                  />
                </div>
              </div>
              <div className="div2">
                <div className="input3">
                  <h2>CEP</h2>
                  <Input
                    className="input"
                    name="CEP"
                    type="text"
                    placeholder="CEP"
                  />
                </div>
                <div className="input4">
                  <h2>Logradouro</h2>
                  <Input
                    className="input"
                    name="logradouro"
                    type="text"
                    placeholder="logradouro"
                  />
                </div>
                <div className="input5">
                  <h2>Bairro</h2>
                  <Input
                    className="input"
                    name="bairro"
                    type="text"
                    placeholder="bairro"
                  />
                </div>
                <div className="div3">
                  <div className="input6">
                    {/* cidade */}
                    <h2 className="label" >Cidade</h2>
                    <select
                    className="uf"
                      name="city"
                      id="city"
                      value={selectedCity}
                      onChange={handleSelectedCity}
                    >
                      <option value="0">Selecione uma cidade</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    </div>
                    {/* cidade */}
                    <div className="input7">
                      {/* uf */}
                      <h2 >Estado (UF)</h2>
                      <select
                      className="uf"
                        name="uf"
                        id="uf"
                        value={selectedUF}
                        onChange={handleSelectedUF}
                      >
                        <option value="0">Selecione uma UF</option>
                        {ufs.map((uf) => (
                          <option key={uf} value={uf}>
                            {uf}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* uf */}
            
                </div>
                <div className="div4">
                  <div className="input8">
                    <h2>Número</h2>
                    <Input
                      className="input"
                      name="numero"
                      type="text"
                      placeholder="número"
                    />
                  </div>
                  <div className="input9">
                    <h2>Complemento</h2>

                    <Input
                      className="input2"
                      name="complemento"
                      type="text"
                      placeholder="complemento"
                    />
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
                  Escolher plano
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
             Dados de Pagamento
                </Button>
              </div>
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

export default Dados;
