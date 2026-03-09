import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useSidebar } from "../contexts/SidebarContext";
import { useAuth } from "../contexts/AuthContext";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";

const SIDEBAR_WIDTH = 256;
const SIDEBAR_COLLAPSED_WIDTH = 80;

export default function DashboardLayout() {

  const { darkMode } = useTheme();
  const { open, hovered } = useSidebar();
  const { user } = useAuth();

  const location = useLocation();

  const role = user?.role;

  const isExpanded = open || hovered;

  const marginLeft = isExpanded
    ? SIDEBAR_WIDTH
    : SIDEBAR_COLLAPSED_WIDTH;

  const pathParts = location.pathname.split("/").filter(Boolean);

  const isDashboardIndexPage =
    pathParts.length === 2 &&
    pathParts[0] === role &&
    pathParts[1] === "dashboard";

  const isMobile = window.innerWidth < 768;

  const shouldShowTopNavbar =
    !(isMobile && isDashboardIndexPage);

  return (
    <div className="min-h-screen w-full flex">

      {/* Sidebar */}
      <Sidebar role={role} />

      {/* Main Area */}
      <div
        className="flex flex-col flex-1 transition-all duration-300"
        style={{
          marginLeft: window.innerWidth >= 768 ? marginLeft : 0
        }}
      >

        {shouldShowTopNavbar && <Navbar/>}

        <main
          className={`flex-1 overflow-y-auto ${
            shouldShowTopNavbar ? "pt-16" : ""
          } pb-2 px-2 md:px-4
          ${
            darkMode
              ? "bg-gray-800 text-gray-200"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          <Outlet />
        </main>

      </div>
    </div>
  );
}