import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import sidebarLogo from "../../assets/images/sidebarLogo.avif";
import SidebarItem from "./SidebarItem";
import { useSidebar } from "../../contexts/SidebarContext";
import { useTheme } from "../../contexts/ThemeContext";
import { sidebarMenu } from ".";
// import ResetModal from "../modal/ResetModal";
// import CashInModal from "../modal/CashInModal";


const SIDEBAR_WIDTH = "w-64";
const SIDEBAR_COLLAPSED_WIDTH = "w-24";

export default function Sidebar() {

  const { darkMode } = useTheme();

  const {
    open,
    hovered,
    setHovered,
    mobileOpen,
    toggleSidebar,
    toggleMobileSidebar,
  } = useSidebar();

  const isExpanded = open || hovered || mobileOpen;

  const menuItems = sidebarMenu();

  const [showResetModal, setShowResetModal] = useState(false);
  const [showCashInModal, setShowCashInModal] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.state?.openResetModal) {
      setShowResetModal(true);
    }
  }, [location]);

  const handleMouseEnter = () => {
    if (window.innerWidth >= 768 && !open) {
      setHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768 && !open) {
      setHovered(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          onClick={toggleMobileSidebar}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        />
      )}

      <aside
        role="navigation"
        aria-label="Sidebar Navigation"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`fixed top-0 left-0 z-40 h-screen transition-[width,transform] duration-300
        ${
          darkMode
            ? "bg-gray-900 border-r border-gray-700"
            : "bg-white border-r border-gray-200"
        }
        ${isExpanded ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED_WIDTH}
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Header */}
        <div
          className={`h-17 flex items-center px-4 border-b
          ${
            darkMode
              ? "bg-gray-900 border-gray-700"
              : "bg-white border-gray-200"
          }
          ${isExpanded ? "justify-between" : "justify-center"}`}
        >
          {isExpanded && (
            <img
              src={sidebarLogo}
              alt="Sidebar Logo"
              className="w-10 h-10 rounded-full ml-4"
            />
          )}

          {/* Desktop Toggle */}
          <button
            onClick={toggleSidebar}
            className="hidden md:block text-xl text-gray-700"
          >
            {open ? "×" : "☰"}
          </button>

          {/* Mobile Close */}
          <button
            onClick={toggleMobileSidebar}
            className="md:hidden text-xl"
          >
            ×
          </button>
        </div>

        {/* Menu */}
        <div
          className={`pt-3 pb-12 space-y-2 overflow-y-auto h-[calc(100vh-64px) ]
          ${isExpanded ? "px-6" : "px-4"}`}
        >
          {menuItems.map((section) => (
            <SidebarItem 
              key={section.title}
              item={section}
              desktopCollapsed={!isExpanded}
              forceExpand={mobileOpen}
              onResetClick={() => setShowResetModal(true)}
              onCashInClick={() => setShowCashInModal(true)}
            />
          ))}
        </div>
      </aside>

      {/* Modals */}
      {showResetModal && (
        <ResetModal onClose={() => setShowResetModal(false)} />
      )}

      {showCashInModal && (
        <CashInModal onClose={() => setShowCashInModal(false)} />
      )}
    </>
  );
}