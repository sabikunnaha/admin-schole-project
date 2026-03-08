import { createBrowserRouter } from "react-router";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/register/Register.jsx";
import SchoolRegiForm from "../pages/auth/register/SchoolRegiForm.jsx";
import ForgetPassword from "../pages/auth/ForgetPassword.jsx";
import AdmissionRegiForm from "../pages/auth/register/AdmissionRegiForm.jsx";



export const router = createBrowserRouter([
  {
    path: "/",
    element:  <Login></Login>,
  },
  {
    path: "/forget",
    element: <ForgetPassword></ForgetPassword>
  },
    {
    path: "register",
    element: <Register></Register>,
    children: [
      {
        index: true,
        element: <SchoolRegiForm />,
      },
      {
        path: "admission",
        element: <AdmissionRegiForm />,
      },
    ],
  },
]);