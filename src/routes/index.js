import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import LazyLoad from "../components/LazyLoader";

const LoginPage = lazy(() => import("../pages/auth/Login"));
const HomePage = lazy(() => import("../pages/Home"));

export const routes = createBrowserRouter([
  {
    path: "/",
    element: LazyLoad(LoginPage),
  },
  {
    path: "/home",
    element: LazyLoad(HomePage),
  },
]);
