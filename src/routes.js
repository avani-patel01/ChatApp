import React, { useEffect, useState } from "react";
import { Navigate, useRoutes } from "react-router";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Chat from "./pages/chat/Chat";
import { jwtDecode } from "jwt-decode";

const Routes = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (e) {
        localStorage.removeItem("token");
        setUser(null);
      }
    }
  }, [token]);

  let element = useRoutes([
    {
      element: <AuthLayout />,
      children: [
        {
          path: "/",
          element: !user ? <Login /> : <Navigate to="/chat" />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/chat",
      element: user ? <Chat user={user} /> : <Navigate to="/" />,
    },
  ]);

  return element;
};

export default Routes;
