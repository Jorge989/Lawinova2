//2846445278933444
import React, { useState, useCallback, useRef } from "react";
import Header from "../../Components/Header";

import { useHistory, useLocation } from "react-router-dom";

import { Container, Blue } from "./styles";

import Button from "../../Components/Button";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";

const Contrato: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const {
    state: {
      plano,
      officeId,
      userId,
      userEmail,
      userPhone,
      userPassword,
      username,
      token,
      isPromo,
    },
  } = useLocation<{
    officeId: number;
    userId: number;
    username: string;
    userEmail: string;
    userPhone: string;
    userPassword?: string;
    plano: string;
    token: string;
    isPromo: boolean;
  }>();

  const handleSubmit = useCallback(async (): Promise<void> => {
    setLoading(true);

    history.push("/dados", {
      contractAccepted: true,
      plano,
      officeId,
      userId,
      userEmail,
      userPhone,
      userPassword,
      username,
      token,
      isPromo,
    });
  }, []);

  return (
    <div>
      <Header />

      <Container>
        <Blue>
          <div className="formBox">
            <h3>Contrato de Assinatura</h3>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <div className="box">
                <div className="input1">
                  <h2 className="texto">
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical Latin literature
                    from 45 BC, making it over 2000 years old. Richard
                    McClintock, a Latin professor at Hampden-Sydney College in
                    Virginia, looked up one of the more obscure Latin words,
                    consectetur, from a Lorem Ipsum passage, and going through
                    the cites of the word in classical literature, discovered
                    the undoubtable source. Lorem Ipsum comes from sections
                    1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The
                    Extremes of Good and Evil) by Cicero, written in 45 BC. This
                    book is a treatise on the theory of ethics, very popular
                    during the Renaissance. The first line of Lorem Ipsum,
                    "Lorem ipsum dolor sit amet..", comes from a line in section
                    1.10.32. The standard chunk of Lorem Ipsum used since the
                    1500s is reproduced below for those interested. Sections
                    1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by
                    Cicero are also reproduced in their exact original form,
                    accompanied by English versions from the 1914 translation by
                    H. Rackham.Contrary to popular belief, Lorem Ipsum is not
                    simply random text. It has roots in a piece of classical
                    Latin literature from 45 BC, making it over 2000 years old.
                    Richard McClintock, a Latin professor at Hampden-Sydney
                    College in Virginia, looked up one of the more obscure Latin
                    words, consectetur, from a Lorem Ipsum passage, and going
                    through the cites of the word in classical literature,
                    discovered the undoubtable source. Lorem Ipsum comes from
                    sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
                    Malorum" (The Extremes of Good and Evil) by Cicero, written
                    in 45 BC. This book is a treatise on the theory of ethics,
                    very popular during the Renaissance. The first line of Lorem
                    Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
                    section 1.10.32.
                  </h2>
                </div>
                <p className="contrato">
                  Ao clicar em "Concordar e Continuar", você confirma que leu o
                  nosso Contrato de
                  <br /> de Assinatura na integra e concorda com ele.
                </p>
                <Button
                  className="btnazul"
                  type="submit"
                  isLoading={loading}
                  onClick={() => handleSubmit}
                >
                  Concordar
                </Button>
              </div>
            </Form>
          </div>
        </Blue>
      </Container>
    </div>
  );
};

export default Contrato;
