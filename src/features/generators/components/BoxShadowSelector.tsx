interface BoxShadowSelectorProps {
  id: string;
  label: string;
  value: "none" | "option1" | "option2" | "option3";
  onChange: (value: "none" | "option1" | "option2" | "option3") => void;
}

export function BoxShadowSelector({
  id,
  label,
  value,
  onChange,
}: BoxShadowSelectorProps) {
  const options = [
    { value: "none" as const, label: "None" },
    { value: "option1" as const, label: "Subtle" },
    { value: "option2" as const, label: "Layered" },
    { value: "option3" as const, label: "Elevated" },
  ];

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
      >
        {label}
      </label>
      <div className="flex gap-4 flex-wrap">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="radio"
              id={`${id}-${option.value}`}
              name={id}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="w-4 h-4 text-blue-600 focus:outline-none focus:ring-0 border-gray-300 dark:border-gray-600 cursor-pointer"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
