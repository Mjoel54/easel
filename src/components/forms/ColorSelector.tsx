interface ColorSelectorProps {
  id: string;
  label: string;
  value: string;
  onChange: (color: string) => void;
  helperText?: string;
}

export default function ColorSelector({
  id,
  label,
  value,
  onChange,
  helperText,
}: ColorSelectorProps) {
  const handleTextChange = (textValue: string) => {
    const cleanValue = textValue.startsWith("#")
      ? textValue.slice(1)
      : textValue;
    onChange(`#${cleanValue}`);
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
      >
        {label}
      </label>
      <div className="flex gap-3">
        <input
          id={id}
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 w-20 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
        />
        <div className="flex-1 flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 bg-white dark:bg-gray-700">
          <span className="pl-4 pr-1 text-gray-600 dark:text-gray-400 select-none font-mono">
            #
          </span>
          <input
            type="text"
            value={value.slice(1)}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="8a19cc"
            maxLength={6}
            className="flex-1 px-1 py-2 bg-transparent focus:outline-none dark:text-white font-mono"
          />
        </div>
      </div>
      {helperText && (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      )}
    </div>
  );
}
