import React from "react";

import { Route, BrowserRouter } from "react-router-dom";

import Login from "./Pages/Login";
import NovoCadastro from "./Pages/NovoCadastro";

import Homepage from "./Pages/Home";

const AuthRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path="/login" exact component={Login} />s
      <Route path="/novocadastro" exact component={NovoCadastro} />

    </BrowserRouter>
  );
};

export default AuthRoutes;
