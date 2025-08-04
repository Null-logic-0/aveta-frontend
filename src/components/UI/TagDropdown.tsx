import { useState, useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";

interface Option {
  label: string;
  value: string;
}

interface TagDropdownProps {
  label?: string;
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  error?: string | string[];
  className?: string;
  defaultValue?: string[] | string;
}

function TagDropdown({
  label,
  options,
  defaultValue = [],
  selectedValues,
  onChange,
  error,
  className,
}: TagDropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  // Initialize selectedValues with defaultValue once
  useEffect(() => {
    if (
      !initialized.current &&
      selectedValues.length === 0 &&
      defaultValue !== undefined &&
      (Array.isArray(defaultValue)
        ? defaultValue.length > 0
        : defaultValue.length > 0)
    ) {
      const normalizedDefault = Array.isArray(defaultValue)
        ? defaultValue
        : [defaultValue];
      onChange(normalizedDefault);
      initialized.current = true;
    }
  }, [defaultValue, selectedValues, onChange]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle tag selection
  const toggleValue = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  // Remove single tag
  const removeTag = (value: string) => {
    onChange(selectedValues.filter((v) => v !== value));
  };

  return (
    <div className={twMerge("relative w-full", className)} ref={dropdownRef}>
      {label && <label className="font-semibold text-sm ">{label}</label>}

      <div
        className={twMerge(
          `min-h-[44px] border rounded-md p-2 flex flex-wrap items-center gap-2 cursor-pointer
          ${error ? "border-[#E50000]" : "border-[#3B3A3F]"}`
        )}
        onClick={() => setOpen((o) => !o)}
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setOpen((o) => !o)}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {selectedValues.map((val) => {
          const option = options.find((o) => o.value === val);

          return (
            <div
              key={val}
              className="bg-[#8A38F5] text-white rounded-[6px] px-2 py-0.5 flex items-center gap-1"
            >
              <span className="select-none">{option?.label || val}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(val);
                }}
                className="font-bold hover:text-gray-300"
                aria-label={`Remove tag ${option?.label || val}`}
              >
                ×
              </button>
            </div>
          );
        })}
      </div>

      {open && (
        <ul
          className="absolute z-20 max-h-60 w-full overflow-y-auto mt-1 bg-[#1E1E25] border border-[#3B3A3F] rounded-md shadow-lg"
          role="listbox"
        >
          {options.map(({ label, value }) => (
            <li
              key={value}
              className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-[#3B3A3F]"
              onClick={() => toggleValue(value)}
              role="option"
              aria-selected={selectedValues.includes(value)}
            >
              <input
                type="checkbox"
                checked={selectedValues.includes(value)}
                onChange={() => toggleValue(value)}
                onClick={(e) => e.stopPropagation()}
                tabIndex={-1}
                className="cursor-pointer appearance-none"
              />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      )}

      {error && <p className="text-sm text-[#E50000] font-medium">{error}</p>}
    </div>
  );
}

export default TagDropdown;
