//2846445278933444
import React, { useState, useCallback, useRef, useEffect } from "react";
import { BsFillQuestionOctagonFill } from "react-icons/bs";
import Header from "../../Components/Header";
import { FiPlus } from "react-icons/fi";
import { useAuth } from "../../hooks/auth";
import { FiMinus } from "react-icons/fi";
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import {
  Container,
Sair,
  Blue,
 
} from "./styles";

import Person from "../../assets/person.svg";
import Appstore from "../../assets/Appstore.svg";
import Playstore from "../../assets/Playstore.svg";

interface ReturnDate {
  time: string;
}
const Login: React.FC = () => {
  const [isShow, setIsShow] = useState(false);
  const [isShow1, setIsShow1] = useState(false);
  const [isShow2, setIsShow2] = useState(false);
  const [isShow3, setIsShow3] = useState(false);
  const [isShow4, setIsShow4] = useState(false);
  const [isShow5, setIsShow5] = useState(false);
  const { signOut, user: any } = useAuth();
    const responseGoogleFailed = (response: GoogleLoginResponse): void => {};
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://embed.tawk.to/5fc6bb0ba1d54c18d8ef660f/default";
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  setInterval(() => {
    setDate(new Date().toLocaleDateString());
    setTime(new Date().toLocaleTimeString());
  }, 1000);
  return (
    <div>
      <Header>
    
      <Sair>
          <button onClick={signOut}>Sair</button>
          <button onClick={() => setIsShow(!isShow)}>
          <h1 className="menuzinho">Menu</h1>
          </button>
          </Sair>
      </Header>
     
      <Container>
        <Blue>
       
          <div className="formBox">
            <div className="ajustetudo">
            <h2 className="dias">7 dias para o fim do Teste Grátis</h2>
            <h3 className="bemvindo">Bem-Vindo</h3>
          <div className="hora">
          <div className="input1">
              <h3 className="date">Data:</h3>
              <h3>{date}</h3>
            </div>
            <div className="input2">
            <h3 className="date">Hora:</h3>
            <h3>{time}</h3>
            </div>
          
            </div>
        
         
          <div className="topo">
         
        
        <p className="subtopo">Para começar a configurar o app, 
selecione o Painel no menu Para ver as próximas etapas.</p>
<div className="all">
        <div className="btn1">
        <a  className="playstore" href="https://play.google.com/store/apps/details?id=com.actionsys.inventario">
        {/* <button className="playstore"> */}
          <img className="logoplay" src={Playstore}></img>

          <h3 className="baixar">Baixar no</h3>
          <h3 className="google">Google Play</h3>
        {/* </button> */}
        </a>
        </div>
        <div className="btn2">
        <a  className="appstore" href="https://play.google.com/store/apps/details?id=com.dts.freefireth">
       
          <img className="logoapp" src={Appstore}></img>
          <h3 className="baixara">Baixar no</h3>
          <h3 className="googlea">App Store</h3>
          </a>

          </div>
          </div>
          <button className="faq">
              <a href="/faq2" className="faqlink">
                {/* {" "} */}
                <BsFillQuestionOctagonFill
                  size={25}
                  style={{
                    color: "#4040FF",
                    width: "22px",
                    marginLeft: "0px",
                    marginTop: "0px",
                  }}
                />
               <h4 className="faqtext">(Manual do aplicativo)</h4>
              </a>
            </button>
            <div className="perguntaserespostas">
            <button onClick={() => setIsShow(!isShow)}>
          {isShow ? 
            <FiMinus

              size={30}
              style={{
                color: "#444444",
                width: "30px",
                position: "absolute",
                marginLeft: "20px",
                marginTop: "1px",
                cursor:"pointer",
                display: "none",
              }}

            />
:
               <FiPlus
              size={30}
              style={{
                color: "#444444",
                width: "30px",
                position: "absolute",
                marginLeft: "-214.5px",
                marginTop: "-3px",
                cursor:"pointer",
                display: "none"
              }} 
              
            />}
 

        
          </button>
         
                  <h1>O escritório atua em outras áreas, além da tributária?
</h1>
           
          {isShow1 && (
            <div className="Menu">
              <h1>
                Lorem Ipsum é simplesmente uma simulação de texto da indústria
                tipográfica e de impressos, e vem sendo utilizado desde o século
                XVI, quando um impressor desconhecido pegou uma bandeja de tipos
                e os embaralhou para fazer um livro de modelos de tipos. Lorem
                Ipsum sobreviveu não só a cinco séculos, como também ao salto
                para a editoração eletrônica, permanecendo essencialmente
                inalterado. Se popularizou na década de 60, quando a Letraset
                lançou decalques contendo passagens de Lorem Ipsum, e mais
                recentemente quando passou a ser integrado a softwares de
                editoração eletrônica como Aldus PageMaker.
              </h1>
            </div>
          )}
             <button onClick={() => setIsShow1(!isShow1)}>
          {isShow1 ? 
            <FiMinus

              size={24}
              style={{
                color: "#444444",
                width: "30px",
                position: "absolute",
                marginLeft: "-37px",
                marginTop: "-118px",
                cursor:"pointer"
              }}

            />
:
               <FiPlus
              size={24}
              style={{
                color: "#444444",
                width: "30px",
                position: "absolute",
                marginLeft: "-37px",
                marginTop: "-38px",
                cursor:"pointer"
              }} 
              
            />}


        
          </button>
          <h1>O que devo fazer para contratar um advogado?
</h1>
           
          {isShow2 && (
            <div className="Menu">
              <h1>
                Lorem Ipsum é simplesmente uma simulação de texto da indústria
                tipográfica e de impressos, e vem sendo utilizado desde o século
                XVI, quando um impressor desconhecido pegou uma bandeja de tipos
                e os embaralhou para fazer um livro de modelos de tipos. Lorem
                Ipsum sobreviveu não só a cinco séculos, como também ao salto
                para a editoração eletrônica, permanecendo essencialmente
                inalterado. Se popularizou na década de 60, quando a Letraset
                lançou decalques contendo passagens de Lorem Ipsum, e mais
                recentemente quando passou a ser integrado a softwares de
                editoração eletrônica como Aldus PageMaker.
              </h1>
            </div>
          )}
             <button onClick={() => setIsShow2(!isShow2)}>
          {isShow2 ? 
            <FiMinus

              size={24}
              style={{
                color: "#444444",
                width: "30px",
                position: "absolute",
                marginLeft: "-37px",
                marginTop: "-118px",
                cursor:"pointer"
              }}

            />
:
               <FiPlus
              size={24}
              style={{
                color: "#444444",
                width: "30px",
                position: "absolute",
                marginLeft: "-37px",
                marginTop: "-38px",
                cursor:"pointer"
              }} 
              
            />}


        
          </button>
          <h1>Como é a cobrança de honorários?
</h1>
           
          {isShow3 && (
            <div className="Menu">
              <h1>
                Lorem Ipsum é simplesmente uma simulação de texto da indústria
                tipográfica e de impressos, e vem sendo utilizado desde o século
                XVI, quando um impressor desconhecido pegou uma bandeja de tipos
                e os embaralhou para fazer um livro de modelos de tipos. Lorem
                Ipsum sobreviveu não só a cinco séculos, como também ao salto
                para a editoração eletrônica, permanecendo essencialmente
                inalterado. Se popularizou na década de 60, quando a Letraset
                lançou decalques contendo passagens de Lorem Ipsum, e mais
                recentemente quando passou a ser integrado a softwares de
                editoração eletrônica como Aldus PageMaker.
              </h1>
            </div>
          )}
             <button onClick={() => setIsShow3(!isShow3)}>
          {isShow3 ? 
            <FiMinus

            size={24}
            style={{
              color: "#444444",
              width: "30px",
              position: "absolute",
              marginLeft: "-37px",
              marginTop: "-118px",
              cursor:"pointer"
            }}

          />
:
             <FiPlus
            size={24}
            style={{
              color: "#444444",
              width: "30px",
              position: "absolute",
              marginLeft: "-37px",
              marginTop: "-38px",
              cursor:"pointer"
            }} 
            
          />}


        
          </button>
          <h1>Como faço para contatar o escritório? 
</h1>
           
          {isShow5 && (
            <div className="Menu">
              <h1>
                Lorem Ipsum é simplesmente uma simulação de texto da indústria
                tipográfica e de impressos, e vem sendo utilizado desde o século
                XVI, quando um impressor desconhecido pegou uma bandeja de tipos
                e os embaralhou para fazer um livro de modelos de tipos. Lorem
                Ipsum sobreviveu não só a cinco séculos, como também ao salto
                para a editoração eletrônica, permanecendo essencialmente
                inalterado. Se popularizou na década de 60, quando a Letraset
                lançou decalques contendo passagens de Lorem Ipsum, e mais
                recentemente quando passou a ser integrado a softwares de
                editoração eletrônica como Aldus PageMaker.
              </h1>
            </div>
          )}
             <button onClick={() => setIsShow5(!isShow5)}>
          {isShow5 ? 
             <FiMinus

             size={24}
             style={{
               color: "#444444",
               width: "30px",
               position: "absolute",
               marginLeft: "-37px",
               marginTop: "-118px",
               cursor:"pointer"
             }}

           />
:
              <FiPlus
             size={24}
             style={{
               color: "#444444",
               width: "30px",
               position: "absolute",
               marginLeft: "-37px",
               marginTop: "-38px",
               cursor:"pointer"
             }} 
             
           />}


        
          </button>
          <h1>O escritório atua em outras áreas, além da tributária?
</h1>
           
          {isShow && (
            <div className="Menu">
              <h1>
                Lorem Ipsum é simplesmente uma simulação de texto da indústria
                tipográfica e de impressos, e vem sendo utilizado desde o século
                XVI, quando um impressor desconhecido pegou uma bandeja de tipos
                e os embaralhou para fazer um livro de modelos de tipos. Lorem
                Ipsum sobreviveu não só a cinco séculos, como também ao salto
                para a editoração eletrônica, permanecendo essencialmente
                inalterado. Se popularizou na década de 60, quando a Letraset
                lançou decalques contendo passagens de Lorem Ipsum, e mais
                recentemente quando passou a ser integrado a softwares de
                editoração eletrônica como Aldus PageMaker.
              </h1>
            </div>
          )}
             <button onClick={() => setIsShow(!isShow)}>
          {isShow ? 
              <FiMinus

              size={24}
              style={{
                color: "#444444",
                width: "30px",
                position: "absolute",
                marginLeft: "-37px",
                marginTop: "-118px",
                cursor:"pointer"
              }}

            />
:
               <FiPlus
              size={24}
              style={{
                color: "#444444",
                width: "30px",
                position: "absolute",
                marginLeft: "-37px",
                marginTop: "-38px",
                cursor:"pointer"
              }} 
              
            />}


        
          </button>
  
          
 
          </div>
          
          </div>
        
        </div>
        
          </div>
        </Blue>
      </Container>
    </div>
    
  );
};

export default Login;
