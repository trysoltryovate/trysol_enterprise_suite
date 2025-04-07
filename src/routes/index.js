
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import LazyLoad from "../components/LazyLoader";

const LoginPage = lazy(() => import("../pages/auth/Login"));
const HomePage = lazy(() => import("../pages/Home"));
const CandidateTable = lazy(() => import("../components/Table")); // Import the CandidateTable component

export const routes = createBrowserRouter([
  {
    path: "/",
    element: LazyLoad(LoginPage),
  },
  
  {
    path: "/home",
    element: LazyLoad(HomePage),
  },
  {
    path: "/candidates",
    element: LazyLoad(CandidateTable), // Add the CandidateTable component to the /candidates route
  },
]);