import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router/dom";
import { router } from './routes/Routes.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { SidebarProvider } from './contexts/SidebarContext.jsx';




createRoot(document.getElementById('root')).render(
  <ThemeProvider>
      <SidebarProvider>
        <StrictMode>
          <RouterProvider router={router} />,
        </StrictMode>,
      </SidebarProvider>
  </ThemeProvider>
)
