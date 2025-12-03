import { motion } from "framer-motion";

interface ValueSelectorProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  helperText?: string;
}

export function ValueSelector({
  id,
  label,
  value,
  onChange,
  min = 1,
  max = 100,
  helperText,
}: ValueSelectorProps) {
  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
      >
        {label}
      </label>
      <div className="flex items-center gap-3">
        <motion.button
          type="button"
          onClick={handleDecrement}
          disabled={value <= min}
          className="h-11 w-11 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold text-xl hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center cursor-pointer"
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.1 }}
          aria-label="Decrease value"
        >
          −
        </motion.button>

        <input
          id={id}
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={handleInputChange}
          className="flex-1 h-11 px-4 text-center border border-gray-300 hover:border-blue-300 dark:border-gray-600 dark:hover:border-blue-400 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-colors duration-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />

        <motion.button
          type="button"
          onClick={handleIncrement}
          disabled={value >= max}
          className="h-11 w-11 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold text-xl hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center cursor-pointer"
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.1 }}
          aria-label="Increase value"
        >
          +
        </motion.button>
      </div>
      {helperText && (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      )}
    </div>
  );
}
