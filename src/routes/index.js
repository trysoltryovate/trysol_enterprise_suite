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
const AssetsTable = lazy(() => import("../components/AssetsTable"));
const AssetsAddCandidate = lazy(
  () => import("../components/AssetsAddCandidate"),
);
const AssetsEditCandidate = lazy(
  () => import("../components/AssetsEditCandidate"),
);
const AssetsDashboard = lazy(() => import("../components/AssetsDashboard"));
const AssetsStore = lazy(() => import("../components/AssetsStore"));
const AssetsDeleteddataTable = lazy(
  () => import("../components/AssetsDeleteddata"),
);

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
  {
    path: "/assets-table",
    element: LazyLoad(AssetsTable),
  },
  {
    path: "/assetscandidate/add",
    element: LazyLoad(AssetsAddCandidate),
  },
  {
    path: "/assetscandidate/edit/:id",
    element: LazyLoad(AssetsEditCandidate),
  },
  {
    path: "/assets-dashboard",
    element: LazyLoad(AssetsDashboard),
  },
  {
    path: "/dashboard/AssetsStore",
    element: LazyLoad(AssetsStore),
  },
  {
    path: "/assetscandidate/deleted",
    element: LazyLoad(AssetsDeleteddataTable),
  },
]);
