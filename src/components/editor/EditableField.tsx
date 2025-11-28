import React from "react";

interface EditableFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  indent?: number;
  type?: "input" | "textarea";
}

export const EditableField: React.FC<EditableFieldProps> = ({
  label,
  value,
  onChange,
  indent = 0,
  type = "input",
}) => {
  const labelClassName = "text-sm font-mono text-gray-500 dark:text-gray-400";

  const inputClassName =
    "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500";

  const rows =
    type === "textarea" ? Math.max(1, Math.ceil(value.length / 80)) : undefined;

  return (
    // 1. **REMOVE** `py-2`, `pr-4`, and the `style` for `paddingLeft`
    //    The wrapper now extends full width without internal padding.
    <div className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
      <div
        // 2. **ADD** padding classes here: `flex`, `items-start`, `gap-4`, `py-2`, `pr-4`
        className="flex items-start gap-4 py-2 pr-4"
        // 3. **APPLY** `paddingLeft` style here for indentation
        style={{ paddingLeft: `${indent}px` }}
      >
        <div className="shrink-0 w-32 pt-2">
          <span className={labelClassName}>{label}</span>
        </div>
        <div className="flex-1 min-w-0">
          {/* ... (input/textarea content is unchanged) ... */}
          {type === "textarea" ? (
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              rows={rows}
              className={`${inputClassName} resize-none`}
            />
          ) : (
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className={inputClassName}
            />
          )}
        </div>
      </div>
    </div>
  );
};
