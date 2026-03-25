import { createBrowserRouter } from "react-router";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/register/Register.jsx";
import SchoolRegiForm from "../pages/auth/register/SchoolRegiForm.jsx";
import AdmissionRegiForm from "../pages/auth/register/AdmissionRegiForm.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import SchoolDashboard from "../pages/school/SchoolDashboard.jsx";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login></Login>,
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


  //school dashboard

  {
    path: "/school/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        index: true, element: <SchoolDashboard></SchoolDashboard>
      }
    ]
  },
]);

 