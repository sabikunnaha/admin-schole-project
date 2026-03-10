import { createContext, useContext, useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";

// Sidebar Context
const SidebarContext = createContext(null);

export function SidebarProvider({ children }) {
  // Desktop sidebar toggle
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Mobile sidebar toggle
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Toggle functions
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const toggleMobileSidebar = () => setIsMobileSidebarOpen(prev => !prev);

  // Debounce helper
  const debounce = (fn, delay = 100) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  };

  // Handle window resize
  const handleResize = useCallback(
    debounce(() => {
      if (window.innerWidth >= 768) {
        setIsMobileSidebarOpen(false); // reset mobile
        setIsHovered(false);            // reset hover
      }
    }, 150),
    []
  );

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return (
    <SidebarContext.Provider
      value={{
        open: isSidebarOpen,
        hovered: isHovered,
        setHovered: setIsHovered,
        mobileOpen: isMobileSidebarOpen,
        toggleSidebar,
        toggleMobileSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

// Custom hook for easier access
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

// PropTypes
SidebarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};