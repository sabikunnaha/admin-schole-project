import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";

const  SidebarItem=({
    item,
    desktopCollapsed,
    forceExpand = false,
    onResetClick,
    onCashInClick,
})=> {
    const location = useLocation();
    const { darkMode } = useTheme();

    const [open, setOpen] = useState(false);

    const Icon = item.icon;

    const collapsed = desktopCollapsed && !forceExpand;
    const showText = !collapsed;

    // safer base path
    const basePath = location.pathname.split("/").slice(0, 2).join("/");

    // auto open parent if child active
    useEffect(() => {
        if (!item.children) return;

        const activeChild = item.children.some((child) =>
            location.pathname.startsWith(`${basePath}/${child.path}`)
        );

        if (activeChild) setOpen(true);
    }, [location.pathname, item.children, basePath]);

    const handleParentClick = () => {
        if (item.children) {
            setOpen((prev) => !prev);
        }
    };

    const handleChildClick = (child) => {
        if (child.action === "reset") {
            onResetClick?.();
        }

        if (child.action === "cash-in") {
            onCashInClick?.();
        }
    };

    // ================= WITH CHILDREN =================
    if (item.children?.length) {
        return (
            <div>
                {/* Parent */}
                <button
                    type="button"
                    onClick={handleParentClick}
                    className={`flex items-center ${showText ? "justify-start" : "justify-center"
                        } w-full px-3 py-2 rounded-md transition
          ${darkMode ? "text-gray-200" : "text-gray-800"}
          ${open ? (darkMode ? "bg-blue-900" : "bg-blue-50") : ""}
          ${darkMode ? "hover:bg-blue-900" : "hover:bg-blue-50"}`}
                >
                    {Icon && (
                        <span
                            className={`inline-flex items-center justify-center rounded p-1 ${darkMode ? "bg-gray-700" : "bg-gray-200"
                                }`}
                        >
                            <Icon
                                size={16}
                                className={
                                    open ? "text-blue-600" : darkMode ? "text-white" : "text-gray-600"
                                }
                            />
                        </span>
                    )}

                    {showText && (
                        <>
                            <span
                                className={`ml-3 flex-1 text-left text-sm font-medium ${darkMode ? "text-white" : "text-gray-600"
                                    }`}
                            >
                                {item.title}
                            </span>

                            <ChevronDown
                                size={16}
                                className={`transition-transform ${open ? "rotate-180" : ""}`}
                            />
                        </>
                    )}
                </button>

                {/* Children */}
                {showText && open && (
                    <div className="relative ml-[26px] mt-1">
                        <span
                            className={`absolute left-[6px] top-0 h-full w-px ${darkMode ? "bg-gray-600" : "bg-gray-300"
                                }`}
                        />

                        <div className="space-y-[2px]">
                            {item.children.map((sub) => {
                                const fullPath = `${basePath}/${sub.path}`;
                                const isActive = location.pathname.startsWith(fullPath);

                                // modal item
                                if (sub.action) {
                                    return (
                                        <button
                                            key={sub.path}
                                            onClick={() => handleChildClick(sub)}
                                            className={`group relative flex items-center pl-[22px] pr-2 py-[6px]
                      text-[13px] rounded-md transition
                      ${darkMode ? "text-gray-300" : "text-gray-700"}
                      hover:text-blue-600`}
                                        >
                                            <span
                                                className={`absolute left-[3px] top-1/2 -translate-y-1/2
                        w-[6px] h-[6px] rounded-full
                        ${darkMode
                                                        ? "bg-gray-500 group-hover:bg-blue-600"
                                                        : "bg-gray-400 group-hover:bg-blue-600"
                                                    }`}
                                            />

                                            {sub.title}
                                        </button>
                                    );
                                }

                                // normal nav link
                                return (
                                    <NavLink
                                        key={sub.path}
                                        to={fullPath}
                                        className={`group relative flex items-center pl-[22px] pr-2 py-[6px]
                    text-[13px] rounded-md transition
                    ${isActive
                                                ? "text-blue-600 font-medium"
                                                : darkMode
                                                    ? "text-gray-300"
                                                    : "text-gray-700"
                                            }
                    hover:text-blue-600`}
                                    >
                                        <span
                                            className={`absolute left-[3px] top-1/2 -translate-y-1/2
                      w-[6px] h-[6px] rounded-full
                      ${isActive
                                                    ? "bg-blue-600"
                                                    : darkMode
                                                        ? "bg-gray-500 group-hover:bg-blue-600"
                                                        : "bg-gray-400 group-hover:bg-blue-600"
                                                }`}
                                        />

                                        {sub.title}
                                    </NavLink>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // ================= WITHOUT CHILDREN =================
    return (
        <NavLink
            to={`${basePath}/${item.path}`}
            end
            className={({ isActive }) =>
                `flex items-center ${showText ? "justify-start" : "justify-center"
                } ${collapsed ? "px-2" : "px-3"} py-2 rounded-lg transition
        ${isActive
                    ? darkMode
                        ? "bg-blue-900 text-white"
                        : "bg-blue-50 text-blue-600"
                    : darkMode
                        ? "text-white hover:bg-blue-900"
                        : "text-gray-600 hover:bg-blue-50"
                }`
            }
        >
            {({ isActive }) => (
                <div className="flex items-center">
                    {Icon && (
                        <span
                            className={`inline-flex items-center justify-center rounded p-1 ${darkMode ? "bg-gray-700" : "bg-gray-200"
                                }`}
                        >
                            <Icon
                                size={16}
                                className={
                                    isActive
                                        ? "text-blue-600"
                                        : darkMode
                                            ? "text-white"
                                            : "text-gray-600"
                                }
                            />
                        </span>
                    )}

                    {showText && (
                        <span className="ml-3 text-sm font-medium">{item.title}</span>
                    )}
                </div>
            )}
        </NavLink>
    );
}

export default SidebarItem;