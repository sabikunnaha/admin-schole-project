import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import SchoolForm from './components/ui/SchoolForm.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import ForgetPassword from './pages/auth/ForgetPassword.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element:  <Login></Login>,
  },
  {
    path: "/forget",
    element: <ForgetPassword></ForgetPassword>
  },
    {
    path: "/register",
    element: <Register></Register>,
    children: [
      {
        index: true,
        element: <SchoolForm />,
      },
      // {
      //   path: "admission",
      //   element: <AdmissionForm />,
      // },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <StrictMode>
   <RouterProvider router={router} />,
  </StrictMode>,
  </ThemeProvider>
)
