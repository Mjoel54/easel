interface ThicknessSelectorProps {
  id: string;
  label: string;
  value: number;
  onChange: (thickness: number) => void;
  min?: number;
  max?: number;
  helperText?: string;
}

export default function ThicknessSelector({
  id,
  label,
  value,
  onChange,
  min = 3,
  max = 30,
  helperText,
}: ThicknessSelectorProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
      >
        {label}: {value}px
      </label>
      <div className="max-w-md">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        {helperText && (
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>{min}px (Subtle)</span>
            <span>{max}px (Bold)</span>
          </div>
        )}
      </div>
    </div>
  );
}
