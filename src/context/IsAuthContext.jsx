import { createContext, useEffect, useState } from "react";

export const IsAuthContext = createContext();

export const IsAuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuth(true);
    }
  }, []);

  const login = () => {
    setIsAuth(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
  };

  return (
    <IsAuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </IsAuthContext.Provider>
  );
};
