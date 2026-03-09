import { createContext, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const user = {
    role: localStorage.getItem("role") || "student"
  };

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);