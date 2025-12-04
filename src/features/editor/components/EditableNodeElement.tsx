interface EditableNodeElementProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  indent?: number;
  type?: "input" | "textarea";
}

export function EditableNodeElement({
  label,
  value,
  onChange,
  indent = 0,
  type = "input",
}: EditableNodeElementProps) {
  const labelClassName = "text-md font-mono text-gray-500 dark:text-gray-400";

  const inputClassName =
    "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500";

  const rows =
    type === "textarea" ? Math.max(1, Math.ceil(value.length / 80)) : undefined;

  return (
    <div className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors pl-1">
      <div
        className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 py-2 pr-4"
        style={{ paddingLeft: `${indent}px` }}
      >
        <div className="sm:shrink-0 sm:w-32 sm:pt-2">
          <span className={labelClassName}>{label}</span>
        </div>
        <div className="flex-1 min-w-0">
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
}
