interface TitleSelectorProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
}

export function TitleSelector({
  id,
  label,
  value,
  onChange,
  required = true,
  placeholder = "",
}: TitleSelectorProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
      >
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 border-brand border-gray-300 hover:border-hover dark:border-gray-600 dark:hover:border-hover-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
        required={required}
      />
    </div>
  );
}
