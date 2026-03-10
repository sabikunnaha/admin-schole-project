import { useState, useEffect, useRef } from "react";

export default function FormModal({
  open,
  title = "Form",
  fields = [],
  initialValues = {},
  onClose,
  onValuesChange,
  onSubmit,
  darkMode = false,
}) {
  const [formData, setFormData] = useState(initialValues);
  const [activeField, setActiveField] = useState(null);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const containerRef = useRef(null);
  const dropdownRef = useRef(null);
  const fieldRefs = useRef({});

  // Reset form when modal opens and prevent body scroll
  useEffect(() => {
    if (open) {
      setFormData({ ...initialValues });
      setActiveField(null);
      // Prevent body scroll when modal opens
      document.body.style.overflow = "hidden";
    } else {
      // Restore body scroll when modal closes
      document.body.style.overflow = "";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, initialValues]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setActiveField(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleFieldChange = (key, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [key]: value };
      onValuesChange?.(updated);
      return updated;
    });
  };

  const openDropdown = (key) => {
    if (activeField === key) {
      setActiveField(null);
      return;
    }

    const el = fieldRefs.current[key];
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const dropdownHeight = 240;
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
    setActiveField(key);
  };

  // Debug: Log fieldArray changes (before early return)
  useEffect(() => {
    if (open && formData.fees_type) {
      console.log("FormModal - Current formData:", formData);
    }
  }, [formData, open]);

  if (!open) return null;

  // Get fields array - handle both static array and dynamic function
  const fieldArray = typeof fields === "function" ? fields(formData) : fields;

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center px-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" onClick={onClose}></div>

      {/* Modal */}
      <div
        ref={containerRef}
        className={`relative w-72 max-h-[70vh] overflow-y-auto p-6 text-xs border rounded
          ${
            darkMode
              ? "bg-gray-800 border-gray-600 text-gray-100"
              : "bg-white border-gray-200 text-gray-800"
          }`}
      >
        <h3 className="text-lg font-semibold text-center mb-4">{title}</h3>

        <div className="space-y-4">
          {fieldArray && fieldArray.length > 0 ? (
            fieldArray.map((field, index) => {
              const fieldKey = field.name || field.key;
              if (!fieldKey) {
                console.warn("Field without name or key:", field);
                return null;
              }
              return (
                <div key={`${fieldKey}-${index}`} className="relative w-full">
                  {field.type === "select" ? (
                    <button
                      ref={(el) => (fieldRefs.current[fieldKey] = el)}
                      onClick={() => openDropdown(fieldKey)}
                      className={`w-full h-8 px-3 flex justify-between items-center border text-left
          ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-gray-100"
              : "bg-white border-gray-300 text-gray-600"
          }`}
                    >
                      <span>
                        {Array.isArray(formData[fieldKey])
                          ? formData[fieldKey].join(", ") || field.placeholder
                          : formData[fieldKey] || field.placeholder}
                      </span>
                      <span>▾</span>
                    </button>
                  ) : (
                    <div className="relative">
                      <input
                        type={field.type || "text"}
                        id={fieldKey}
                        value={formData[fieldKey] || ""}
                        onChange={(e) =>
                          handleFieldChange(fieldKey, e.target.value)
                        }
                        placeholder=" "
                        readOnly={field.readOnly || false}
                        className={`peer w-full h-8 px-3 border focus:outline-none focus:ring-0 focus:border-gray-300
            ${
              field.readOnly
                ? darkMode
                  ? "bg-gray-700 border-gray-600 text-gray-100"
                  : "bg-gray-100 text-gray-600 border-gray-300"
                : darkMode
                  ? "bg-gray-700 border-gray-600 text-gray-100"
                  : "bg-white border-gray-300 text-gray-600"
            }`}
                      />
                      <label
                        htmlFor={fieldKey}
                        className={`absolute left-2 top-1/2 -translate-y-1/2 text-[8px] text-gray-600
          pointer-events-none transition-all duration-300
          peer-placeholder-shown:top-1/2
          peer-placeholder-shown:-translate-y-1/2
          peer-placeholder-shown:text-[12px]
          peer-placeholder-shown:text-gray-600
          peer-placeholder-shown:bg-white
          peer-focus:-top-0.5
          peer-focus:text-[12px]
          peer-focus:text-gray-600
          ${darkMode ? "peer-focus:bg-gray-300" : "peer-focus:bg-white "}
          peer-focus:px-1
          peer-not-placeholder-shown:-top-1
          peer-not-placeholder-shown:text-[12px]
          ${darkMode ? "peer-not-placeholder-shown:bg-white text-gray-200" : "peer-not-placeholder-shown:bg-white text-gray-600"}
          peer-not-placeholder-shown:px-1`}
                      >
                        {field.label}
                      </label>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500">No fields to display</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-5">
          <button
            onClick={onClose}
            className="w-1/2 h-8 border border-gray-300 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit(formData)}
            className="w-1/2 h-8 bg-green-600 text-white text-sm"
          >
            Save
          </button>
        </div>
      </div>

      {/* Dropdown */}
      {activeField && (
        <div ref={dropdownRef} style={dropdownStyle}>
          <div
            className={`max-h-30 overflow-y-auto border text-xs z-50
              ${
                darkMode
                  ? "bg-gray-800 border-gray-00 text-gray-100"
                  : "bg-white border-gray-300 text-gray-600"
              }`}
          >
            <ul>
              {fieldArray.find((f) => (f.name || f.key) === activeField)
                ?.options?.length > 0 ? (
                fieldArray
                  .find((f) => (f.name || f.key) === activeField)
                  .options.map((opt) => {
                    const field = fieldArray.find(
                      (f) => (f.name || f.key) === activeField,
                    );
                    const isSelected =
                      field.multiple && formData[activeField]?.includes(opt);
                    return (
                      <li
                        key={opt}
                        className={`px-3 h-8 flex items-center cursor-pointer hover:bg-blue-50 active:bg-blue-100 ${
                          isSelected ? "bg-blue-100 font-semibold" : ""
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();

                          if (field.multiple) {
                            let updatedArr = formData[activeField] || [];
                            if (updatedArr.includes(opt)) {
                              updatedArr = updatedArr.filter((v) => v !== opt);
                            } else {
                              updatedArr.push(opt);
                            }
                            handleFieldChange(activeField, updatedArr);
                          } else {
                            handleFieldChange(activeField, opt);
                            setActiveField(null); // single select auto close
                          }
                        }}
                      >
                        {opt}
                      </li>
                    );
                  })
              ) : (
                <li className="px-3 h-8 flex items-center text-gray-400">
                  {
                    fieldArray.find((f) => (f.name || f.key) === activeField)
                      ?.placeholder
                  }
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
