import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import { useHistory, useLocation } from "react-router-dom";
// import * as auth from '../services/auth'
import api from "../services/api";

interface SignInCredentials {
  email: string;
  senha: string;
}

interface User {
  id_usuario: number;
  nome: string;
  status_usuario: string;
  email: string;
  tipo_conta: string;
  perfil: string;
}

interface AuthState {
  token: string;
  user: User;
}

export interface AuthContextData {
  user: User;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  setAuthData({ token, user }: AuthState): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    async function loadStorageData() {
      // loading
      await new Promise((resolve) => setTimeout(resolve, 500));

      const localStorageToken = localStorage.getItem("@ActionLaw: token");
      const localStorageUser = localStorage.getItem("@ActionLaw: user");

      if (localStorageUser && localStorageToken) {
        const parsedUser = JSON.parse(localStorageUser) as User;

        setData({
          token: localStorageToken,
          user: parsedUser,
        });

        console.log("Aqui dentro");
        history.push(location.pathname);
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, senha }: SignInCredentials) => {
    const response = await api.post("autenticar", {
      email,
      senha,
    });

    const { token, usuario: user } = response.data;
    localStorage.setItem("@ActionLaw: token", token);
    localStorage.setItem("@ActionLaw: user", JSON.stringify(user));
    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("@ActionLaw: token");
    localStorage.removeItem("@ActionLaw: user");
    setData({} as AuthState);
  }, []);

  const setAuthData = useCallback(({ user, token }: AuthState) => {
    localStorage.setItem("@ActionLaw: token", token);
    localStorage.setItem("@ActionLaw: user", JSON.stringify(user));
    setData({ token, user });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        loading,
        signIn,
        signOut,
        setAuthData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used whithin an AuthProvider");
  }
  return context;
}
