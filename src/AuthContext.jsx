import { createContext, useContext, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");

  const signup = async (Credential) => {
    try {
      const response = await fetch(API + "/singup", {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(Credentials),
      });
      const result = await response.json();
      setToken(result.token);
      setLocation("TABLET");
    } catch (e) {
      console.error(e);
    }
  };
  const auth = async () => {
    try {
      if (!token) throw Error("no token found");
      const response = await fetch(API + "/authenticate", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw Error("authentication fail");
      setLocation("TUNNEL");
    } catch (e) {
      console.error(e);
    }
  };

  const value = { signup, auth, location };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
