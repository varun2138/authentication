import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import Dashboard from "../components/Dashboard";
import AuthenticationRouter from "./AuthenticationRouter";

const Router = () => {
  return createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: (
        <AuthenticationRouter>
          <Dashboard />
        </AuthenticationRouter>
      ),
    },
  ]);
};
const router = Router();
export default router;
