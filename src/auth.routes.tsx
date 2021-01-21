import React from "react";

import { Route, BrowserRouter } from "react-router-dom";

import Login from "./Pages/Login";
import NovoCadastro from "./Pages/NovoCadastro";
import Cadastroinfo from "./Pages/Cadastroinfo";
import Homepage from "./Pages/Home";

const AuthRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path="/login" exact component={Login} />s
      <Route path="/novocadastro" exact component={NovoCadastro} />
      <Route path="/cadastroinfo" exact component={Cadastroinfo} />
    </BrowserRouter>
  );
};

export default AuthRoutes;
  
