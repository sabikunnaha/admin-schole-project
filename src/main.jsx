import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router/dom";
import { router } from './routes/Routes.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { SidebarProvider } from './contexts/SidebarContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';



createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <AuthProvider>
      <SidebarProvider>
        <StrictMode>
          <RouterProvider router={router} />,
        </StrictMode>,
      </SidebarProvider>
    </AuthProvider>
  </ThemeProvider>
)
