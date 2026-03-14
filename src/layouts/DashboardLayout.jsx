
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import { useSidebar } from "../contexts/SidebarContext";
import TopNavbar from "../components/navbar/TopNavbar";
import { useTheme } from "../contexts/ThemeContext";


const DashboardLayout = () => {

    // Dark mode implimentation using custom hook
    const { darkMode } = useTheme();

    const { open, hovered } = useSidebar();
    const isExpanded = open || hovered;


    const role = localStorage.getItem("role");




    // Window width state for responsive margin
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Determine marginLeft based on screen size and sidebar state
    const marginLeft = windowWidth >= 768 ? (isExpanded ? 256 : 80) : 0; // md breakpoint=768px
    const isMobile = windowWidth < 768;

    // Check if current page is dashboard index page

    // Show TopNavbar on all pages 
   const shouldShowTopNavbar = true;

    return (
        <div className={`min-h-screen w-full `}>

            {/* Sidebar is here */}
              <Sidebar role={role} />

            <div
                className="flex flex-col min-h-screen transition-all duration-300 relative z-10"
                style={{ marginLeft }}
            >
                {/* Show TopNavbar on all pages except mobile dashboard index (blue navbar) */}
                {shouldShowTopNavbar && <TopNavbar/>}

                <main
                    className={`flex-1 overflow-y-auto ${shouldShowTopNavbar ? "pt-16" : "pt-0"} pb-2 px-1.5 md:px-1 ${darkMode
                            ? "bg-gray-800 text-gray-200"
                            : "bg-gray-100 shadow-2xl text-gray-800"
                        }`}
                >

                    {/* Outlet for changeable componant */}
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;