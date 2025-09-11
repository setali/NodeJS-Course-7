import React from "react";
import request, { requestWithoutAuth } from "../tools/request";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
  setRefreshToken,
} from "../tools/utils";
import { useState } from "react";
import AuthContext from "../contexts/AuthContext";
import { useEffect } from "react";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  function login(data) {
    return requestWithoutAuth.post("/api/login", data).then(({ data }) => {
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      getUser();
    });
  }

  function getUser() {
    setLoading(true);
    request("/api/user")
      .then(({ data }) => {
        setUser(data);
        setIsLoggedIn(true);
      })
      .finally(() => setLoading(false));
  }

  function logout() {
    setIsLoggedIn(false);
    removeAccessToken();
  }

  useEffect(() => {
    getAccessToken() ? getUser() : setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        user,
        loading,
        isLoggedIn,
        getUser,
        removeAccessToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
