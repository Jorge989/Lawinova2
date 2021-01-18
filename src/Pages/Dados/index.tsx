import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  ChangeEvent,
} from "react";
import { Radio } from "@material-ui/core";
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

interface CepInfo {
  bairro: string;
  cep: string;
  complemento: string;
  ddd: string;
  gia: string;
  ibge: string;
  localidade: string;
  logradouro: string;
  siafi: string;
  uf: string;
}
const Dados: React.FC = () => {
  const {
    state: {
      contractAccepted,
      officeId,
      userId,
      userPhone,
      userEmail,
      username,
      plano,
      token,
    },
  } = useLocation<{
    contractAccepted: boolean;
    officeId: number;
    plano: string;
    token: string;
    userId: number;
    userPhone: string;
    userEmail: string;
    username: string;
    email: string;
  }>();

  console.log(
    "Params Dados",
    contractAccepted,
    officeId,
    userId,
    userEmail,
    userPhone,
    username,
    plano,
    token
  );

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [address, setAddress] = useState({
    logradouro: "",
    bairro: "",
    cep: "",
    numero: "",
    complemento: "",
  });
  const [name, setName] = useState(username);
  const [documentNumber, setDocumentNumber] = useState("");
  const [tel, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [url, setUrl] = useState("");
  const [errorE, setErrorE] = useState([""]);
  const [errorS, setErrorS] = useState([""]);
  const [passwordError, setPasswordError] = useState("");
  const [selectedUF, setSelectedUF] = useState("0");
  const [selectedCity, setSelectedCity] = useState("0");
  const [cities, setCities] = useState<string[]>([]);
  const [ufs, setUfs] = useState<string[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [type, setType] = useState(1);
  const [gender, setGender] = useState("juridica");
  const [passwordShown, setPasswordShown] = useState(false);
  const [inputType, setInputType] = useState("password");

  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

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

      console.log("tipo_documento", gender === "fisica" ? "CPF" : "CNPJ");
      console.log("documento", documentNumber);

      const addressData = {
        id_escritorio: officeId,
        id_pessoa: userId,
        tipo_endereco: "comercial",
        logradouro: address.logradouro,
        numero: address.numero,
        complemento: address.complemento,
        bairro: address.bairro,
        cidade: selectedCity,
        uf: selectedUF,
        pais: "Brasil",
        cep: address.cep,
      };

      // console.log(addressData);

      // const responseOffice = await axios.put(
      //   `https://inova-actionsys.herokuapp.com/escritorio/${officeId}`,
      //   {
      //     tipo_documento: gender === "fisica" ? "CPF" : "CNPJ",
      //     documento: documentNumber,
      //   },
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );

      // await api.put(
      //   `escritorio/${officeId}`,
      //   {
      //     tipo_documento: gender === "fisica" ? "CPF" : "CNPJ",
      //     documento: documentNumber,
      //   },
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );

      // await api.post("enderecos", addressData, {
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      const vindiData = {
        name,
        code: "10",
        email: userEmail,
        address: {
          street: address.logradouro,
          number: address.numero,
          zipcode: address.cep,
          neighborhood: address.bairro,
          city: selectedCity,
          state: selectedUF,
          country: "BR",
        },
        phones: [
          {
            phone_type: "mobile",
            number: userPhone,
          },
        ],
      };

      console.log(vindiData);
      await axios.post("https://app.vindi.com.br/api/v1/customers", vindiData, {
        auth: {
          username: "tey-UhF26q2TMv6cTF43fcMsGwJEy4cdSZFKh-nPQaQ",
          password: "",
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      addToast({
        type: "sucess",
        title: "Endereço cadastro com sucesso",
      });

      setLoading(false);
    } catch (err) {
      console.log("Erro aqui", err.response?.data);
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

  var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
  var regemail = /^\w+([-+.']\w+)@\w+([-.]\w+).\w+([-.]\w+)*$/;
  const eye = <FiEyeOff />;

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown === true ? false : true);
    setInputType(inputType === "password" ? "text" : "password");
  };

  <i onClick={togglePasswordVisiblity}>{eye}</i>;

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

  // useEffect(() => {
  //   api.get("items").then((response) => {
  //     setItems(response.data);
  //   });
  // }, []);
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
    if (selectedUF === "0") return;

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
    setSelectedCity("0");
    const uf = event.target.value;
    setSelectedUF(uf);
  }
  function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;
    setSelectedCity(city);
  }

  const componetClicked = (data: any) => {
    console.warn(data);
  };
  const handleGender = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value);
  };

  function handleCep() {
    const cep = document.querySelector("#cep") as HTMLInputElement;
    cep?.addEventListener("blur", (e) => {
      let search = cep.value.replace("-", "");
      // const options = {
      //   method: "GET",
      //   mode: "cors",
      //   cache: "default",
      // } as RequestInit;

      console.log("Search", search);
      axios
        .get<CepInfo>(`https://viacep.com.br/ws/${search}/json/`)
        .then((response) => {
          console.log(response.data);
          setSelectedUF(response.data.uf);
          setSelectedCity(response.data.localidade);
          setAddress({ ...response.data, numero: "", complemento: "" });
          // response.data
          // response.json().then((data) => showData(data));
          // const showData = (result: string[]) => {
          //   for (const campo in result) {
          //     const elemento = document.getElementById(
          //       campo
          //     ) as HTMLInputElement;

          //     elemento.value = result[campo];
          //   }
          // };
        })
        .catch((e) => console.log("Deu Erro: " + e.message));
    });
  }

  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    // console.log("HandleAddress", id);
    setAddress({
      ...address,
      [id]: value,
    });
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
                  <Radio
                    value="fisica"
                    checked={gender === "fisica"}
                    color="primary"
                    onChange={handleGender}
                  />
                  <span>Pessoa fisíca</span>
                </div>
                <div>
                  <Radio
                    value="juridica"
                    checked={gender === "juridica"}
                    color="primary"
                    onChange={handleGender}
                  />
                  <span>Pessoa juridíca</span>
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="input2">
                  {gender === "fisica" ? (
                    <>
                      <h2>CPF</h2>
                      <Input
                        name="cpf"
                        type="text"
                        placeholder="CPF"
                        className="input"
                        value={documentNumber}
                        onChange={(e) => setDocumentNumber(e.target.value)}
                      />
                    </>
                  ) : (
                    <>
                      <h2>CNPJ</h2>
                      <Input
                        name="cnpj"
                        type="text"
                        placeholder="CNPJ"
                        className="input"
                        value={documentNumber}
                        onChange={(e) => setDocumentNumber(e.target.value)}
                      />
                    </>
                  )}
                </div>
              </div>
              <div className="div2">
                <div className="input3">
                  <h2>CEP</h2>
                  <Input
                    className="input"
                    maxLength={9}
                    name="CEP"
                    type="text"
                    id="cep"
                    onChange={handleCep}
                    placeholder="CEP"
                  />
                </div>
                <div className="input4">
                  <h2>Logradouro</h2>
                  <Input
                    className="input"
                    name="logradouro"
                    id="logradouro"
                    type="text"
                    placeholder="logradouro"
                    value={address.logradouro}
                    onChange={handleAddress}
                  />
                </div>
                <div className="input5">
                  <h2>Bairro</h2>
                  <Input
                    className="input"
                    id="bairro"
                    name="bairro"
                    type="text"
                    placeholder="bairro"
                    value={address.bairro}
                    onChange={handleAddress}
                  />
                </div>
                <div className="div3">
                  <div className="input6">
                    {/* cidade */}
                    <h2 className="label">Cidade</h2>
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
                    <h2>Estado (UF)</h2>
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
                      id="numero"
                      type="text"
                      placeholder="número"
                      value={address.numero}
                      onChange={handleAddress}
                    />
                  </div>
                  <div className="input9">
                    <h2>Complemento</h2>

                    <Input
                      className="input2"
                      name="complemento"
                      id="complemento"
                      type="text"
                      placeholder="complemento"
                      value={address.complemento}
                      onChange={handleAddress}
                    />
                  </div>
                </div>
              </div>
              <div className="btnblue">
                <Button
                  className="btnazul1"
                  isLoading={loading}
                  type="button"
                  onClick={() => {
                    history.push("/planos", {
                      contractAccepted,
                      officeId,
                      userId,
                      userEmail,
                      userPhone,
                      username,
                      plano,
                      token,
                    });
                  }}
                >
                  Escolher plano
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
                  Dados de Pagamento
                </Button>
              </div>
            </Form>
          </div>
        </Blue>
      </Container>
    </div>
  );
};

export default Dados;
