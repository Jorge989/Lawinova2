import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  InputHTMLAttributes,
} from "react";
import { FiArrowLeft } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import Header from "../../Components/Header";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { Link, useHistory } from "react-router-dom";
import { Container,  Blue, Lockicon1, } from "./styles";
import api from "../../services/api";
import * as Yup from "yup";

import getValidationErrors from "../../utils/getValidationErros";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { useToast } from "../../hooks/toast";

interface LocationState {
  token: string;
}
interface HistoryUserData {
  senha: string;
  user: object;
}
interface SigInFormData {}
const NovoCadastro: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data2, setData] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [url, setUrl] = useState("");
  const [errorE, setErrorE] = useState([""]);
  const [errorS, setErrorS] = useState([""]);
  const [passwordError, setPasswordError] = useState("");

  const location = useLocation<LocationState>();
  const history = useHistory();
  //  const {token} = history.location.state;
  const data = history.location.state as HistoryUserData;
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  // Aqui brow o getItem pode retornar String ou NULL
  // e esse cara, QUE DEVERIA SER UM OBJETO, vem string
  const user = localStorage.getItem("@ActionLaw: user");
  const token = localStorage.getItem("@ActionLaw: token");

  // Então pra pegar o id do usuário eu tenho que dar um PARSE
  // e transformar ele em um objeto JSON pra depois desestruturar
  // só que o TS EXIGE que tenha validação nisso
  // então eu tenho que validar se o "user" !== null
  const { id_usuario } = user ? JSON.parse(user) : "";

  const handleSubmit = useCallback(
    async (data: SigInFormData): Promise<void> => {
      setLoading(true);

      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
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

        // Daí aqui 👇👇👇 você tava chamando a URL errada por 2 motivos
        // 1° /usuarios/trocar_senha?OIAUDHISUHADISUDHAISJKDNAKSJDAIUSDH
        // 2° Porque primeiramente aquela variável 'id_usuario' estava com o valor
        //    de um objeto INTEIRO, por isso desestruturei ela
        //    Depois arrumei a chamada para: /usuarios/trocar_senha/${id_usuario}
        const response = await api.put(
          `usuarios/trocar_senha/${id_usuario}`,
          {
            senha: senha,
          },
          {
            // Aqui eu ACHO que tava certo, MAS pesquisei lá na documentação do axios pra
            // ter certeza
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        addToast({
          type: "sucess",
          title: "Senha alterada com sucesso",
        });
        console.log();
        history.push("/home");

        // }
        //  console.log(response.data);
      } catch (err) {
        setLoading(false);
        console.log(err);
        if (err instanceof Yup.ValidationError) {
          console.log(err);
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }

        addToast({
          type: "error",
          title: "Erro ao alterar senha",
          description: `Ocorreu um erro ao alterar senha, tente novamente`,
        });
      }
    },

    [addToast, senha]
  );

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
    api.get("usuarios/").then((response) => {
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
  };
  return (
    <div>
      <Header />
      <Container>
        <Blue>
        <div className="formBox"> 
        <h3>Alterar Senha</h3>
          <Form ref={formRef} onSubmit={handleSubmit}>
          <div className="input1">
              

              <h2>Nova Senha</h2>
              <Input
              className="input"
              name="senha"
              icon={FiLock}
              type={inputType}
              value={senha}
              placeholder="Dica: 8 digitos + 1 caractere especial"
              onChange={(e) => setSenha(e.target.value)}
              
            />
             

              <Button
                isLoading={loading}
                className="btn"
                type="submit"
                onClick={() => handleSubmit}
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

export default NovoCadastro;
