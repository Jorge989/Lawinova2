import React from "react";

import { BrowserRouter, Switch } from "react-router-dom";
import Route from "./Route";

import Login from "./Pages/Login";
import NovoCadastro from "./Pages/NovoCadastro";
import TesteCadastro from "./Pages/TesteCadastro";
import Cadastroinfo from "./Pages/Cadastroinfo";
import TrocarSenha from "./Pages/TrocarSenha";
import Homepage from "./Pages/Home";
import Planos from "./Pages/Planos";
import Meuplano from "./Pages/Meuplano";
import Dados from "./Pages/Dados";
import Contrato from "./Pages/Contrato";
import Detalhes from "./Pages/Detalhes";
import Faq from "./Pages/Faq";
import Esquecisenha from "./Pages/EsqueciSenha";
import Recuperarsenha from "./Pages/RecuperarSenha";
import Faq2 from "./Pages/Faq2";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
     
      <Route path="/login" exact component={Login} />
      <Route path="/novocadastro/plano=:plano" exact component={NovoCadastro} />
      <Route path="/testecadastro/plano=:plano" exact component={TesteCadastro} />
      <Route path="/cadastroinfo" exact component={Cadastroinfo} />
      <Route path="/faq" exact component={Faq} />
      <Route path="/faq2" exact component={Faq2} />
      <Route path="/esquecisenha" exact component={Esquecisenha} />
      <Route
        path="/recuperarsenha/token=:token"
        exact
        component={Recuperarsenha}
      />
      <Route path="/home" exact component={Homepage}/>
      <Route path="/trocarsenha" exact component={TrocarSenha}  />
      {<Route path="/planos" exact component={Planos} />}
      {<Route path="/meuplano" exact component={Meuplano} />}
      {<Route path="/dados" exact component={Dados} />}
      {<Route path="/contrato" exact component={Contrato} />}
      {<Route path="/detalhes" exact component={Detalhes} />}
    </BrowserRouter>
  );
};

export default Routes;
