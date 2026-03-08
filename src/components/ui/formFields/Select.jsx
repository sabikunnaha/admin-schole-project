import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from "react-dom";
import { useTheme } from '../../../contexts/ThemeContext';

const Select = ({
    label,
    name,
    value = "",
    onChange,
    options = [],
    error,
    disabled = false,
    className = "",
}) => {

    const { darkMode } = useTheme();
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef(null);
    const selectRef = useRef(null);
    const [dropdownStyle, setDropdownStyle] = useState({});

    useEffect(() => {
        const handler = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("click", handler);
        return () => document.removeEventListener("click", handler);
    }, []);

    const updateDropdownPosition = () => {
        if (!selectRef.current) return;

        const rect = selectRef.current.getBoundingClientRect();
        const dropdownHeight = 192;
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;

        const style = {
            position: "fixed",
            left: rect.left,
            width: rect.width,
            zIndex: 50,
        };

        if (spaceBelow < dropdownHeight && spaceAbove > rect.height) {
            style.bottom = window.innerHeight - rect.top + 4;
        } else {
            style.top = rect.bottom + 4;
        }

        setDropdownStyle(style);
    };

    useEffect(() => {
        if (open) {
            updateDropdownPosition();
            window.addEventListener("scroll", updateDropdownPosition);
            window.addEventListener("resize", updateDropdownPosition);

            return () => {
                window.removeEventListener("scroll", updateDropdownPosition);
                window.removeEventListener("resize", updateDropdownPosition);
            };
        }
    }, [open]);


    return (
        <div className="relative w-full" ref={wrapperRef}>
            <div
                ref={selectRef}
                onClick={() => !disabled && setOpen(!open)}
                className={`
          h-[39px] px-2 text-[12px] flex items-center justify-between border
          ${darkMode
                        ? "bg-gray-700 text-gray-200 border-gray-600"
                        : "bg-white text-gray-900 border-gray-300"
                    }
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          ${error ? "border-red-500" : ""}
          ${className}
        `}
            >
                <span className={value ? "" : "text-gray-500"}>
                    {value || label}
                </span>

                <span>▼</span>
            </div>

            {open &&
                createPortal(
                    <ul
                        style={dropdownStyle}
                        className={`
              max-h-48 overflow-y-auto border shadow-lg
              ${darkMode
                                ? "bg-gray-700 border-gray-600"
                                : "bg-white border-gray-300"
                            }
            `}
                    >
                        {options.map((opt, i) => (
                            <li
                                key={i}
                                onClick={(e) => {
                                    
                                    onChange({
                                        target: {
                                            name: name,
                                            value: opt
                                        }
                                    });
                                    setOpen(false);
                                }}
                                className={`px-2 py-1 text-[12px] cursor-pointer ${darkMode ? "hover:bg-gray-600 text-gray-200" : "hover:bg-indigo-100 text-gray-600"
                                    }`}
                            >
                                {opt}
                            </li>
                        ))}
                    </ul>,
                    document.body
                )}

            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
};

export default Select;