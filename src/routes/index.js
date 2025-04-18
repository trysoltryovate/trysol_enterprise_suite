import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import LazyLoad from "../components/LazyLoader";

const LoginPage = lazy(() => import("../pages/auth/Login"));
const HomePage = lazy(() => import("../pages/Home"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword"));
const CandidateTable = lazy(() => import("../components/Table"));
const AddCandidate = lazy(() => import("../components/AddCandidate"));
const EditCandidate = lazy(() => import("../components/EditCandidate"));
const SignUpForm = lazy(() => import("../pages/auth/SignUpForm"));

export const routes = createBrowserRouter([
  {
    path: "/",
    element: LazyLoad(LoginPage),
  },
  {
    path: "/signup", 
    element: LazyLoad(SignUpForm),
  },

  {
    path: "/home",
    element: LazyLoad(HomePage),
  },
  {
    path: "/candidates",
    element: LazyLoad(CandidateTable),
  },
  {
    path: "/candidates/add",
    element: LazyLoad(AddCandidate),
  },
  {
    path: "/forgot-password",
    element: LazyLoad(ForgotPassword),
  },
  {
    path: "/candidates/edit/:id",
    element: LazyLoad(EditCandidate),
  },
]);