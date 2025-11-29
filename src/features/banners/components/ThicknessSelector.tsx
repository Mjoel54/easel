import { motion } from "framer-motion";

interface ThicknessSelectorProps {
  id: string;
  label: string;
  value: number;
  onChange: (thickness: number) => void;
  min?: number;
  max?: number;
  helperText?: string;
}

export function ThicknessSelector({
  id,
  label,
  value,
  onChange,
  min = 3,
  max = 30,
}: ThicknessSelectorProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
        <motion.div
          key={value}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-semibold"
        >
          {value}px
        </motion.div>
      </div>

      <div className="relative">
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500"
            style={{ width: `${percentage}%` }}
            transition={{ duration: 0 }}
          />
        </div>
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute top-0 w-full h-2 opacity-0 cursor-pointer"
          style={{ margin: 0 }}
        />
        <motion.div
          className="absolute top-1/2 w-5 h-5 bg-white dark:bg-gray-800 border-2 border-blue-500 dark:border-blue-400 rounded-full shadow-lg pointer-events-none"
          style={{
            left: `calc(${percentage}% - 10px)`,
            transform: "translateY(-50%)",
          }}
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </div>
  );
}
