import React, { useState, useEffect, useRef, ChangeEvent } from "react";

import { Radio } from "@material-ui/core";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import Header2 from "../../Components/Header";
import axios from "axios";

import { useHistory, useLocation } from "react-router-dom";
import { Container, Blue } from "./styles";
import api from "../../services/api";
import * as Yup from "yup";
import { encode as btoa } from "base-64";

import utf8 from "utf8";
import getValidationErrors from "../../utils/getValidationErros";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { useToast } from "../../hooks/toast";

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

interface VindiCustomerResponse {
  customer: {
    id: number;
    name: string;
    email: string;
    registry_code: null;
    code: string;
    notes: null;
    status: string;
    created_at: string;
    updated_at: string;
    metadata: {};
    address: {
      street: string;
      number: string;
      additional_details: null;
      zipcode: string;
      neighborhood: string;
      city: string;
      state: string;
      country: string;
    };
    phones: [
      {
        id: number;
        phone_type: string;
        number: string;
        extension: null;
      }
    ];
  };
}

const Dados: React.FC = () => {
  const {
    state: {
      contractAccepted,
      officeId,
      userId,
      userPhone,
      userEmail,
      userPassword,
      username,
      plano,
      token,
      customerId,
      phoneId,
    },
  } = useLocation<{
    customerId?: number;
    phoneId?: number;
    contractAccepted: boolean;
    officeId: number;
    plano: string;
    token: string;
    userId: number;
    userPhone: string;
    userEmail: string;
    userPassword?: string;
    username: string;
  }>();

  console.log(
    "Params Dados",
    contractAccepted,
    officeId,
    userId,
    userEmail,
    userPassword,
    userPhone,
    username,
    plano,
    token,
    customerId,
    phoneId
  );

  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    logradouro: "",
    bairro: "",
    cep: "",
    numero: "",
    complemento: "",
  });
  const [name, setName] = useState(username);
  const [documentNumber, setDocumentNumber] = useState("");
  const [selectedUF, setSelectedUF] = useState("0");
  const [selectedCity, setSelectedCity] = useState("0");
  const [cities, setCities] = useState<string[]>([]);
  const [ufs, setUfs] = useState<string[]>([]);
  const [gender, setGender] = useState("juridica");

  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

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

  const handleSubmit = async () => {
    setLoading(true);
    try {
      formRef.current?.setErrors({});

      const documentType = gender === "fisica" ? "cpf" : "cnpj";

      const schema = Yup.object().shape({
        [documentType]: Yup.string().required(
          `${documentType.toUpperCase()} é obrigatório`
        ),
        cep: Yup.string().required("CEP é obrigatório"),
        logradouro: Yup.string().required("Logradouro é obrigatório"),
        bairro: Yup.string().required("Bairro é obrigatório"),
        cidade: Yup.string().required("Cidade é obrigatório"),
        uf: Yup.string().required("UF é obrigatório"),
        numero: Yup.string().required("Número é obrigatório"),
      });

      await schema.validate(
        {
          [documentType]: documentNumber,
          cep: address.cep,
          logradouro: address.logradouro,
          bairro: address.bairro,
          cidade: selectedCity,
          uf: selectedUF,
          numero: address.numero,
        },
        {
          abortEarly: false,
        }
      );

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

      const vindiData = {
        name,
        code: officeId,
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

      const text = "tey-UhF26q2TMv6cTF43fcMsGwJEy4cdSZFKh-nPQaQ:";

      var bytes = utf8.encode(text);
      var token64 = btoa(bytes);

      if (!customerId) {
        console.log("Não tem customerId");
        await api.put(
          `escritorio/${officeId}`,
          {
            tipo_documento: documentType.toLowerCase(),
            documento: documentNumber,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        await api.post("enderecos", addressData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const responseVindi = await axios.post<VindiCustomerResponse>(
          "https://cors-anywhere.herokuapp.com/https://app.vindi.com.br/api/v1/customers",
          vindiData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Basic ${token64}`,
              "Access-Control-Allow-Origin": "*",
            },
          }
        );

        return history.push("/detalhes", {
          plano,
          customerId: responseVindi.data.customer.id,
          phoneId: responseVindi.data.customer.phones[0].id,
          contractAccepted,
          officeId,
          userId,
          userEmail,
          userPassword,
          userPhone,
          username,
          token,
        });
      }

      await api.put(
        `escritorio/${officeId}`,
        {
          tipo_documento: documentType.toLowerCase(),
          documento: documentNumber,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await api.put(`enderecos/${officeId}/${userId}`, addressData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedVindiData = {
        ...vindiData,
        phones: [
          {
            id: phoneId,
            phone_type: "mobile",
            number: userPhone,
          },
        ],
      };

      await axios.put<VindiCustomerResponse>(
        `https://cors-anywhere.herokuapp.com/https://app.vindi.com.br/api/v1/customers/${customerId}`,
        updatedVindiData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${token64}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      history.push("/detalhes", {
        plano,
        customerId,
        phoneId,
        contractAccepted,
        officeId,
        userId,
        userEmail,
        userPassword,
        userPhone,
        username,
        token,
      });

      addToast({
        type: "sucess",
        title: "Endereço cadastro com sucesso",
      });

      setLoading(false);
    } catch (err) {
      console.log("Error aqui", err);
      console.log("Error axios aqui", err.response?.data);
      setLoading(false);
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return err.inner.map((error) =>
          addToast({
            type: "error",
            title: "Erro na criação de cliente",
            description: `${error.message}`,
          })
        );
      }

      if (err.response?.data.errors?.length) {
        return err.response?.data.errors.map(
          (error: { id: string; message: string; parameter: string }) =>
            addToast({
              type: "error",
              title: "Erro na criação de cliente",
              description: `${error.parameter} ${error.message}`,
            })
        );
      }
    }

    addToast({
      type: "error",
      title: "Erro no cadastro de cliente",
      description: `Ocorreu um erro ao fazer cadastro, tente novamente.`,
    });
  };

  function handleSelectedUF(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedCity("0");
    const uf = event.target.value;
    setSelectedUF(uf);
  }
  function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;
    setSelectedCity(city);
  }

  const handleGender = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value);
  };

  function handleCep() {
    const cep = document.querySelector("#cep") as HTMLInputElement;
    cep?.addEventListener("blur", (e) => {
      const search = cep.value.replace("-", "");
      axios
        .get<CepInfo>(`https://viacep.com.br/ws/${search}/json/`)
        .then((response) => {
          setSelectedUF(response.data.uf);
          setSelectedCity(response.data.localidade);
          setAddress({ ...response.data, numero: "", complemento: "" });
        })
        .catch((e) => console.log("Deu Erro: " + e.message));
    });
  }

  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setAddress({
      ...address,
      [id]: value,
    });
  };

  return (
    <div>
      <Header2 />
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
                    name="cep"
                    id="cep"
                    type="text"
                    placeholder="CEP"
                    onChange={handleCep}
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
                  disabled={plano === "promo"}
                  onClick={() => {
                    history.push("/planos", {
                      contractAccepted,
                      customerId,
                      phoneId,
                      officeId,
                      userId,
                      userEmail,
                      userPassword,
                      userPhone,
                      username,
                      plano,
                      token,
                    });
                  }}
                >
                   Voltar
                </Button>
                <Button className="btnazul" isLoading={loading} type="submit">
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
