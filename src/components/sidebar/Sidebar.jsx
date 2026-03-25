
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import sidebarLogo from "../../assets/images/sidebarLogo.avif"
import { useTheme } from "../../contexts/ThemeContext";
import { useSidebar } from "../../contexts/SidebarContext";
import SidebarItem from "./SidebarItem";
import { sidebarMenu } from "../../data/sidebarMenu";


const Sidebar = ({ role }) => {

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

    // sidebar menu items is here
    const menuItems = sidebarMenu(role);

    const [showResetModal, setShowResetModal] = useState(false);
    const [showCashInModal, setShowCashInModal] = useState(false); 
    const location = useLocation();

    useEffect(() => {
        if (location.state?.openResetModal) {
            setShowResetModal(true);
        }
    }, [location]);

    return (
        <>
            {/* overlay */}
            {mobileOpen && (
                <div
                    onClick={toggleMobileSidebar}
                    className="fixed inset-0 z-30 md:hidden"
                />
            )}

            <aside
                onMouseEnter={() => window.innerWidth >= 768 && !open && setHovered(true)}
                onMouseLeave={() => window.innerWidth >= 768 && !open && setHovered(false)}
                className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300  
          ${darkMode ? "bg-gray-900 border-r border-gray-700" : "bg-white border-r border-gray-200"}
          ${isExpanded ? "w-64" : "w-24"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
            >
                {/* header */}
                <div
                    className={`h-16 flex items-center px-4 border-b
          ${darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}
          ${isExpanded ? "justify-between" : "justify-center"}`}
                >
                    {isExpanded && (
                        <img src={sidebarLogo} alt="Logo" className="w-10 h-10 rounded-full ml-4" />
                    )}

                    <button onClick={toggleSidebar} className="hidden md:block text-xl text-gray-800">
                        {open ? "×" : "☰"}
                    </button>

                    <button onClick={toggleMobileSidebar} className="md:hidden text-xl text-gray-800">
                        ×
                    </button>
                </div>

                {/* menu */}
                <div className={`pt-3 pb-12 space-y-2 overflow-y-auto h-[calc(100vh-64px)] ${isExpanded ? "px-6" : "px-4"}`}>
                    {menuItems.map((section, idx) => (
                        <SidebarItem
                            key={idx}
                            item={section}
                            desktopCollapsed={!isExpanded}
                            forceExpand={mobileOpen}
                            onResetClick={() => setShowResetModal(true)}
                            onCashInClick={() => setShowCashInModal(true)} // ✅ ADD
                        />
                    ))}
                </div>
            </aside>

        </>
    );
};

export default Sidebar;