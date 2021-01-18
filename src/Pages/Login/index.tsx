//2846445278933444
import React, { useState, useCallback, useRef } from 'react';

import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import getValidationErrors from '../../utils/getValidationErros';
import FacebookLogin from 'react-facebook-login';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import * as Yup from 'yup';

import { FiEyeOff } from 'react-icons/fi';
import Header from '../../Components/Header';
import Button from '../../Components/Button';
import { FormHandles } from '@unform/core';
import Input from '../../Components/Input';
import { Link } from 'react-router-dom';
import { FiMail } from 'react-icons/fi';
import { FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';

import {
  Container,
  Blue,
  GoogleLogin,
  Googleicon,
  Facebokcion,
} from './styles';

interface SigInFormData {
  email: string;
  senha: string;
}
const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const { signIn, setAuthData } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SigInFormData): Promise<void> => {
      setLoading(true);

      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string().required('E-mail obrigatório'),
          senha: Yup.string()
            .trim()
            .matches(
              /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1}).*$/,
              'senha deve conter pelo menos 8 caracteres, um número e um caractere especial'
            )
            .min(8, 'No minimo 8 dígitos'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          senha: data.senha,
        });
      } catch (err) {
        setLoading(false);
        if (err instanceof Yup.ValidationError) {
          console.log(err);
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        });
      }
    },

    [signIn, addToast]
  );

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [url, setUrl] = useState('');

  const responseGoogle = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ): Promise<void> => {
    if (!('profileObj' in response)) return;
    setName(response.profileObj.name);
    setEmail(response.profileObj.email);
    setUrl(response.profileObj.imageUrl);
    const { data } = await api.post('/autenticar', {
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
    const { data } = await api.post('/autenticar', {
      email: response.userID + '@facebook.com',
    });
    setAuthData({ user: data.usuario, token: data.token });
  };

  const componetClicked = (data: any) => {
    console.warn(data);
  };

  const eye = <FiEyeOff />;
  const [passwordShown, setPasswordShown] = useState(false);
  const [inputType, setInputType] = useState('password');
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown === true ? false : true);
    setInputType(inputType === 'password' ? 'text' : 'password');
  };

  <i onClick={togglePasswordVisiblity}>{eye}</i>;

  return (
    <div>
      <Header />

      <Container>
        <Blue>
          <div className='formBox'>
            <h3>Entrar</h3>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <div className='input1'>
                <h2>Email</h2>
                <Input
                  className='input'
                  name='email'
                  icon={FiMail}
                  type='email'
                  placeholder='email'
                />

                <h2>Senha</h2>

                <Input
                  className='input'
                  name='senha'
                  icon={FiLock}
                  type={inputType}
                  placeholder='Dica: 8 digitos + 1 caractere especial'
                />

                <Button
                  className='btnazul'
                  type='submit'
                  isLoading={loading}
                  onClick={() => handleSubmit}
                >
                  Entrar
                </Button>
              </div>
              <h4>ou acesse rapidamente !</h4>
              <div className='redessociais'>
                <GoogleLogin
                  clientId='211368015593-fucd3no6bv208m9iuf809l9f72ulmejr.apps.googleusercontent.com'
                  render={(renderProps) => (
                    <button
                      className='btngoogle'
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      <Googleicon />
                    </button>
                  )}
                  buttonText='Login'
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                />
                <FacebookLogin
                  appId='2846445278933444'
                  autoLoad={false}
                  fields='name,email,picture'
                  onClick={componetClicked}
                  callback={responseFacebook}
                  icon={<Facebokcion />}
                  textButton=''
                  cssClass='facebook'
                />
              </div>

              <button className='cadastre'>
                <a href={`/novocadastro/plano=pro`}>Cadastre-se</a>
              </button>
              <button className="esqueci">
            <a href="esquecisenha">Esqueceu sua senha?</a>
          </button>
            </Form>
          </div>
        </Blue>
        {
          /* 
            <button onClick={togglePasswordVisiblity} type="button" className="eye">
              {passwordShown ? <FiEye size={21} /> : <FiEyeOff size={21} />}
            </button>  
          */
        }
      </Container>
    </div>
  );
};

export default Login;
