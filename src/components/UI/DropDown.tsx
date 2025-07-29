import { twMerge } from "tailwind-merge";

interface Option {
  label: string;
  value: string | number;
}

type DropdownProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  className?: string;
  options: Option[];
  multiple?: boolean;
};

function Dropdown({
  label,
  name,
  id,
  error,
  options,
  className,
  ...rest
}: DropdownProps) {
  const inputId = id || name;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={inputId} className="font-semibold text-sm">
          {label}
        </label>
      )}
      <select
        id={inputId}
        name={name}
        className={twMerge(
          `w-full border ${
            error ? "border-[#E50000]" : "border-[#3B3A3F]"
          } font-medium text-sm rounded-[6px] p-3 
          focus:border-white focus:outline-none`,
          className
        )}
        {...rest}
      >
        {options.map((option: Option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
