// eslint-disable-next-line
import React from "react";
import {
  RouteProps as ReactDOMRouteProps,
  Redirect,
  Route,
  RouteComponentProps,
} from "react-router-dom";
import { useAuth } from "./hooks/auth";

interface RouteProps extends ReactDOMRouteProps {
  component: React.FC<RouteComponentProps>;
}

const PrivateRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { user, loading } = useAuth();
  console.log("User", !!user);
  console.log("Loading", loading);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#ffffff",
          width: "100vw",
          height: "100vh",
          position: "absolute",
          top: 0,
          zIndex: 9999,
        }}
      >
        <h1>Carregando</h1>
      </div>
    );
  }

  console.log("Aqui depois de loading");

  return (
    <Route
      {...rest}
      render={(props: RouteComponentProps) => {
        console.log("PROPS", props);
        return !!user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: !!user ? "/home" : "/login",
            }}
          />
        );
      }}
    />
  );
};
export default PrivateRoute;
