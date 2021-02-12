//2846445278933444
import React, { useState, useCallback, useRef, useEffect } from "react";
import { BsFillQuestionOctagonFill } from "react-icons/bs";
// import DownLoadFile,{DownloadFileProps} from 'react-downloader-file';
import Header from "../../Components/Header";
import { FiPlus } from "react-icons/fi";
import { useAuth } from "../../hooks/auth";
import { FiMinus } from "react-icons/fi";
import { FiUser } from "react-icons/fi";

import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import {
  Container,
  // Sair,
  // Blue,
  DropdownContainer,
  DropdownMenu,
  DropdownItem,
  Layout,
  Main,
  MainHeader,
  Content,
  Title,
  TextContainer,
  Subtitle,
  DateContainer,
  DateText,
  RemainingDaysText,
  ButtonsContainer,
  AppStoreButton,
  GoogleStoreButton,
  StoreButtonsContainer,
  StoreLogo,
  FaqButton,
  QAContainer,
  QuestionContainer,
  QuestionButton,
  Question,
  AnswerContainer,
  Answer,
  QuestionContent,
  DropdownToggle,
} from "./styles";

import Person from "../../assets/person.svg";
import Appstore from "../../assets/aple1.svg";
import Playstore from "../../assets/play1.svg";
import api from "../../services/api";
import { useToast } from "../../hooks/toast";
import { useHistory } from "react-router-dom";

interface ReturnDate {
  time: string;
}

const qaData = [
  {
    id: "0",
    question: "O escritório atua em outras áreas, além da tributária?",
    answer: `Lorem Ipsum é simplesmente uma simulação de texto da
  indústria tipográfica e de impressos, e vem sendo
  utilizado desde o século XVI, quando um impressor
  desconhecido pegou uma bandeja de tipos e os embaralhou
  para fazer um livro de modelos de tipos. Lorem Ipsum
  sobreviveu não só a cinco séculos, como também ao salto
  para a editoração eletrônica, permanecendo
  essencialmente inalterado. Se popularizou na década de
  60, quando a Letraset lançou decalques contendo
  passagens de Lorem Ipsum, e mais recentemente quando
  passou a ser integrado a softwares de editoração
  eletrônica como Aldus PageMaker.`,
  },
  {
    id: "1",
    question: "O que devo fazer para contratar um advogado?",
    answer: `Lorem Ipsum é simplesmente uma simulação de texto da
  indústria tipográfica e de impressos, e vem sendo
  utilizado desde o século XVI, quando um impressor
  desconhecido pegou uma bandeja de tipos e os embaralhou
  para fazer um livro de modelos de tipos. Lorem Ipsum
  sobreviveu não só a cinco séculos, como também ao salto
  para a editoração eletrônica, permanecendo
  essencialmente inalterado. Se popularizou na década de
  60, quando a Letraset lançou decalques contendo
  passagens de Lorem Ipsum, e mais recentemente quando
  passou a ser integrado a softwares de editoração
  eletrônica como Aldus PageMaker.`,
  },
  {
    id: "2",
    question: "Como é a cobrança de honorários?",
    answer: `Lorem Ipsum é simplesmente uma simulação de texto da
  indústria tipográfica e de impressos, e vem sendo
  utilizado desde o século XVI, quando um impressor
  desconhecido pegou uma bandeja de tipos e os embaralhou
  para fazer um livro de modelos de tipos. Lorem Ipsum
  sobreviveu não só a cinco séculos, como também ao salto
  para a editoração eletrônica, permanecendo
  essencialmente inalterado. Se popularizou na década de
  60, quando a Letraset lançou decalques contendo
  passagens de Lorem Ipsum, e mais recentemente quando
  passou a ser integrado a softwares de editoração
  eletrônica como Aldus PageMaker.`,
  },
  {
    id: "3",
    question: "Como faço para contatar o escritório?",
    answer: `Lorem Ipsum é simplesmente uma simulação de texto da
  indústria tipográfica e de impressos, e vem sendo
  utilizado desde o século XVI, quando um impressor
  desconhecido pegou uma bandeja de tipos e os embaralhou
  para fazer um livro de modelos de tipos. Lorem Ipsum
  sobreviveu não só a cinco séculos, como também ao salto
  para a editoração eletrônica, permanecendo
  essencialmente inalterado. Se popularizou na década de
  60, quando a Letraset lançou decalques contendo
  passagens de Lorem Ipsum, e mais recentemente quando
  passou a ser integrado a softwares de editoração
  eletrônica como Aldus PageMaker.`,
  },
];

const Home: React.FC = () => {
  const [isShow, setIsShow] = useState(false);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [isTrial, setIsTrial] = useState(false);
  const [officeData, setOfficeData] = useState<{
    id_escritorio: number;
    telefone: number;
  }>();
  const [endDate, setEndDate] = useState("");
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const { signOut, user } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();
  const token = localStorage.getItem("@ActionLaw: token");

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

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date().toLocaleDateString());
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const plans = ["plano1", "plano2", "plano3", "promo1", "promo2", "promo3"];

  useEffect(() => {
    api.get(`escritorios?nome=${user?.nome}`).then((response) => {
      console.log("PLANO: ", response.data[0].plano);
      setOfficeData(response.data[0]);
      setIsTrial(!plans.some((plan) => plan === response.data[0].plano));
      // setEndDate(convertISOToDate(response.data[0].data_final_trial));
      setEndDate(response.data[0].data_final_trial);
    });
  }, []);

  const convertISOToFormattedDate = (date: string) =>
    `${date.split("T")[0]}T00:00:00Z`;

  // muda sempre as 21:00:00
  const today = new Date(
    convertISOToFormattedDate(new Date(Date.now()).toISOString())
  ).getTime();
  console.log("Today", new Date(today).toLocaleDateString());

  const formattedEndDate = new Date(endDate).getTime() + 3_600_000 * 3;
  const difference = formattedEndDate - today;

  const daysRemaining =
    difference < 0 ? 0 : Number((difference / 86_400_000).toFixed(0));

  console.log("daysRemaining", daysRemaining);

  useEffect(() => {
    if (daysRemaining === 0 && isTrial) {
      const data = {
        plano: "plano1",
        token,
        officeId: officeData?.id_escritorio,
        userId: user?.id_usuario,
        username: user?.nome,
        userEmail: user?.email,
        userPhone: officeData?.telefone,
      };
      console.log("Data", data);
      history.replace("/planos", data);
      addToast({
        type: "info",
        title: "Seu tempo de teste acabou",
        description: "você será redirecionado para a tela de planos",
      });
    }
  }, [daysRemaining]);

  return (
    <Layout>
      <Header>
        <DropdownToggle onClick={() => setIsShowMenu(!isShowMenu)}>
          <FiUser size={24} className="logo2" />
        </DropdownToggle>
        {isShowMenu && (
          <DropdownContainer>
            <DropdownMenu>
              <DropdownItem>
                <a
                  href="/trocarsenha"
                  className="cool-DropdownItDropdownItemnk1"
                >
                  Trocar Senha
                </a>
                <hr className="linha" />
              </DropdownItem>
              <DropdownItem>
                <a href="/meuplano" className="cool-link1">
                  Meu Plano
                </a>
                <hr className="linha" />
              </DropdownItem>
              <DropdownItem>
                <a href="/login" onClick={signOut} className="cool-link1">
                  Sair
                </a>
                <hr className="linha" />
              </DropdownItem>
            </DropdownMenu>
          </DropdownContainer>
        )}
      </Header>
      <Container>
        <Main>
          <MainHeader>
            {daysRemaining !== 0 && isTrial && (
              <RemainingDaysText>
                {daysRemaining} dias para o fim do Teste Grátis
              </RemainingDaysText>
            )}
            <DateContainer>
              <DateText>Data: {date}</DateText>
              <DateText>Hora: {time}</DateText>
            </DateContainer>
          </MainHeader>

          <Content>
            <TextContainer>
              <Title>Bem-Vindo</Title>
              <Subtitle>
                Faça o download do app InovaJuris no seu celular e personalize
                seu escritório.
              </Subtitle>
            </TextContainer>
            <ButtonsContainer>
              <StoreButtonsContainer>
                <GoogleStoreButton
                  className="play"
                  href="https://play.google.com/store/apps/details?id=com.actionsys.inventario"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <StoreLogo src={Playstore} className="playlog" />
                  Google Play
                </GoogleStoreButton>
                <AppStoreButton
                  className="apple"
                  href="https://play.google.com/store/apps/details?id=com.dts.freefireth"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <StoreLogo src={Appstore} className="applelog" />
                  App Store
                </AppStoreButton>
              </StoreButtonsContainer>

              <FaqButton
                href="https://inova.blob.core.windows.net/uploadinova/file-02613ae6-5720-466c-b697-ec26a67e2097.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <BsFillQuestionOctagonFill
                  size={24}
                  color="#941AF9"
                  style={{
                    marginRight: 12,
                  }}
                />
                (Manual do aplicativo)
              </FaqButton>
            </ButtonsContainer>
            <QAContainer>
              {qaData.map((qa) => (
                <QuestionContainer key={qa.id}>
                  <QuestionContent
                    onClick={() => {
                      setIsShow(selectedId === qa.id ? !isShow : true);
                      setSelectedId(qa.id);
                    }}
                  >
                    <QuestionButton>
                      {isShow && selectedId === qa.id ? (
                        <FiMinus size={28} color="#941AF9" />
                      ) : (
                        <FiPlus size={28} color="#941AF9" />
                      )}
                    </QuestionButton>

                    <Question>{qa.question}</Question>
                  </QuestionContent>
                  {isShow && selectedId === qa.id && (
                    <AnswerContainer>
                      <Answer>{qa.answer}</Answer>
                    </AnswerContainer>
                  )}
                </QuestionContainer>
              ))}
            </QAContainer>
          </Content>
        </Main>
      </Container>
    </Layout>
  );
};

export default Home;
