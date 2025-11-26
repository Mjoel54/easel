import { useState, useRef, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { motion } from "framer-motion";

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
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const handleTextChange = (textValue: string) => {
    const cleanValue = textValue.startsWith("#")
      ? textValue.slice(1)
      : textValue;
    onChange(`#${cleanValue}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setIsPickerOpen(false);
      }
    };

    if (isPickerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPickerOpen]);

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
      >
        {label}
      </label>
      <div className="flex items-center gap-3">
        <div className="relative h-11" ref={pickerRef}>
          <motion.button
            type="button"
            onClick={() => setIsPickerOpen(!isPickerOpen)}
            className="h-full w-20 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm cursor-pointer"
            style={{ backgroundColor: value }}
            aria-label="Open color picker"
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.1 }}
          />

          {isPickerOpen && (
            <div className="absolute top-full mt-2 z-[9999] p-3 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 animate-in fade-in slide-in-from-top-2 duration-200">
              <HexColorPicker color={value} onChange={onChange} />
            </div>
          )}
        </div>

        <div className="flex-1 flex items-center h-11 border border-gray-300 hover:border-blue-300 dark:border-gray-600 dark:hover:border-blue-400 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 dark:focus-within:ring-blue-400 dark:focus-within:border-blue-400 bg-white dark:bg-gray-700 transition-colors duration-200">
          <span className="pl-4 pr-1 text-gray-600 dark:text-gray-400 select-none font-mono text-sm">
            #
          </span>
          <input
            id={id}
            type="text"
            value={value.slice(1)}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="8a19cc"
            maxLength={6}
            className="flex-1 px-1 bg-transparent focus:outline-none dark:text-white font-mono text-sm tracking-wide uppercase"
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
