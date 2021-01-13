//2846445278933444
import React, { useState, useCallback, useRef, useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";
import Logo from "../../assets/logolaw.svg";
import Header2 from "../../Components/Header";
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { Link } from "react-router-dom";

import {
  Container,
  Lockicon1,
  Blue,
  Draw,
  GoogleLogin,
  Googleicon,
  Facebokcion,
} from "./styles";
import FacebookLogin from "react-facebook-login";

import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { FiMail } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import {  useHistory } from "react-router-dom";
import { Form } from "@unform/web";
import getValidationErrors from "../../utils/getValidationErros";
import * as Yup from "yup";
import { FormHandles } from "@unform/core";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { useAuth } from "../../hooks/auth";
import { useToast } from "../../hooks/toast";
import api from "../../services/api";
// async function handleSignIn(){
//   console.log('Logar');
// }

interface SigInFormData {
  email: string;
  senha: string;
}
const Meuplano: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const { signIn, setAuthData } = useAuth();
  const history = useHistory();
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

        const response = await api.put("escritorio",{

          plano: "fredwdwe"
        });
        history.push("/dados", {
          
        });
        
        // addToast({
        //   type: "sucess",
        //   title: "Cadastro realizado com sucesso",
        // });

   
      } catch (err) {
        console.log(err);
        setLoading(false);
        if (err instanceof Yup.ValidationError) {
          console.log(err);
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          // addToast({
          //   type: "error",
          //   title: "Erro na cadastro",
          //   description: `Ocorreu um erro ao fazer cadastro, tente novamente.`,
          // });
          
        }
        // if (err.response?.data) {
        //   addToast({
        //     type: "error",
        //     title: "Erro na cadastro",
        //     description: `Usuário já cadastrado.
        //     `,
        //   });
        // }
      }
    },
    [addToast]
  );

 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");

  const responseGoogle = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ): Promise<void> => {
    if (!("profileObj" in response)) return;
    setName(response.profileObj.name);
    setEmail(response.profileObj.email);
    setUrl(response.profileObj.imageUrl);
    const { data } = await api.post("/autenticar", {
      email: response.profileObj.email,
    });
    setAuthData({ user: data.usuario, token: data.token });

    console.log(data);
  };

  const responseGoogleFailed = (response: GoogleLoginResponse): void => {
    console.log(response);
  };

  const responseFacebook = async (response: any) => {
    console.log(response);
    const { data } = await api.post("/autenticar", {
      email: response.userID + "@facebook.com",
    });
    setAuthData({ user: data.usuario, token: data.token });
  };

  const componetClicked = (data: any) => {
    console.warn(data);
  };

  const eye = <FiEyeOff />;
  const [passwordShown, setPasswordShown] = useState(false);
  const [inputType, setInputType] = useState("password");
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown === true ? false : true);
    setInputType(inputType === "password" ? "text" : "password");
  };

  <i onClick={togglePasswordVisiblity}>{eye}</i>;

  return (
    <div className="ehad">
      <Header2>
        
      </Header2>
    <Container>

      <Blue>
  

      

        <Form ref={formRef} onSubmit={handleSubmit}>
       
       
          
        
            <section className="pricing-container">
<h1>Meu Plano</h1>
<p>SMART</p>
<div className="plans-container">
  <div className="plan">
    <ul>
  
      <li className="plan-name">INDIVIDUAL</li>
      
      <div className="hr" />
      <div className="Valores">
                    <h4 className="grana">R$50</h4>
                    <h4 className="grana1">/Mês</h4>
                  </div>
      <li>ILIMITADO</li>
      <li>ADICIONAR PROCESSOS</li>
      <li>CONTROLE DE EQUIPE</li>
      <li>CONTROLE DE CLIENTES</li>
      <li>CONTROLE DE DESPESAS</li>
         <li>ATUALIZAÇÃO HISTÓRICO DE PROCESSOS</li>
         <li>CONTROLE DE HONORÁRIOS</li>
         <li>DASHBOARD GERENCIAL</li>
         <li>ALERTAS</li>
         <li>MAPA</li>

    </ul>
  </div>
  <div className="plan">
    <ul>
    
      <li className="plan-name">PRO</li>
      <div className="hr" />
      <div className="Valores">
                    <h4 className="grana">R$100</h4>
                    <h4 className="grana1">/Mês</h4>
                  </div>
      <li>ILIMITADO</li>
      <li>ADICIONAR PROCESSOS</li>
      <li>CONTROLE DE EQUIPE</li>
      <li>CONTROLE DE CLIENTES</li>
      <li>CONTROLE DE DESPESAS</li>
         <li>ATUALIZAÇÃO HISTÓRICO DE PROCESSOS</li>
         <li>CONTROLE DE HONORÁRIOS</li>
         <li>DASHBOARD GERENCIAL</li>
         <li>ALERTAS</li>
         <li>MAPA</li>
 
    </ul>
  </div>
  <div className="plan">
    <ul>
     
      <li className="plan-name">PREMIUM</li>
      <div className="hr" />
      <div className="Valores">
                    <h4 className="grana">R$150</h4>
                    <h4 className="grana1">/Mês</h4>
                  </div>
                  <li>ILIMITADO</li>
      <li>ADICIONAR PROCESSOS</li>
      <li>CONTROLE DE EQUIPE</li>
      <li>CONTROLE DE CLIENTES</li>
      <li>CONTROLE DE DESPESAS</li>
         <li>ATUALIZAÇÃO HISTÓRICO DE PROCESSOS</li>
         <li>CONTROLE DE HONORÁRIOS</li>
         <li>DASHBOARD GERENCIAL</li>
         <li>ALERTAS</li>
         <li>MAPA</li>
     
    </ul>
    
  </div>
        
   </div>
  
          </section>
    
          <div className="btnblue">
     
          <Button
                  className="btnazul1"
                  isLoading={loading}
                  type="submit"
                  onClick={() => {
                    handleSubmit
              
                  }}
                >
                Cancelar Plano
                </Button>
          <Button
                  className="btnazul"
                  isLoading={loading}
                  type="submit"
                  onClick={() => {
                    handleSubmit
                 
                  }}
                >
                  Confirmar
                </Button>

   </div>
        </Form>

  
      </Blue>
     
    </Container>
    </div>
  );
};

export default Meuplano;
