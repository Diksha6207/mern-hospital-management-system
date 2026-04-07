import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import axios from "axios";

// ✅ Create Context
export const Context = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  admin: {},
  setAdmin: () => {},
});

// ✅ Axios Base URL (VERY IMPORTANT)
axios.defaults.baseURL =
  "https://mern-hospital-management-system-2.onrender.com";

// ✅ Context Provider
const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState({});

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        admin,
        setAdmin,
      }}
    >
      <App />
    </Context.Provider>
  );
};

// ✅ Render App
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);