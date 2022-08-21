import React, { useState, ReactNode, useEffect } from "react";
import { createContext, useContext, useMemo } from "react";
import { useNavigate, Navigate, Outlet } from "react-router-dom";
import { user } from "../../../server/models/user";
import { get, post } from "../../utilities";

type authContext = {
  user: user | null;
  login: () => void;
  logout: () => void;
};

const authContext = createContext<authContext>({
  user: null,
  login: () => ({}),
  logout: () => ({}),
});

type ProtectedRouteProps = {
  redirectPath?: string;
  children?: JSX.Element;
};

export const ProtectedRoute = ({
  redirectPath = "/",
  children,
}: ProtectedRouteProps): JSX.Element => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<user | null>(null);
  authContext.displayName = "AUTHORIZATION!";

  useEffect(() => {
    console.log("getting user again!:", user);
    get<user, null>("/api/auth/whoami").then((user) => {
      console.log("user found is", user);
      setUser(user ? user : null);
    });
  }, []);

  const login = () => {
    window.location.href = "https://nvdesk.mit.edu/Session";
  };

  const logout = () => {
    console.log("user is", user);
    post("/api/auth/logout")
      .then(
        () => fetch("https://nvdesk.mit.edu/Shibboleth.sso/Logout")
        // (window.location.href = "https://nvdesk.mit.edu/Shibboleth.sso/Logout")
      )
      .then(() => setUser(null))
      .then(() => console.log("finished logging out!", user));
  };

  const auth = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

// useAuth hook that allows us to access user login + login methods without passing them in explicitly in each component
export const useAuth = () => {
  return useContext(authContext);
};
