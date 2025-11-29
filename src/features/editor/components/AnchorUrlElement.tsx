interface AnchorUrlElementProps {
  value: string;
  onChange: (value: string) => void;
  indent?: number;
}

export function AnchorUrlElement({
  value,
  onChange,
  indent = 0,
}: AnchorUrlElementProps) {
  const labelClassName = "text-sm font-mono text-gray-500 dark:text-gray-400";

  const inputClassName =
    "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
      <div
        className="flex items-start gap-4 py-2 pr-4"
        style={{ paddingLeft: `${indent}px` }}
      >
        <div className="shrink-0 w-32 pt-2">
          <span className={labelClassName}>Link URL</span>
        </div>
        <div className="flex-1 min-w-0">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={inputClassName}
            placeholder="https://..."
          />
        </div>
      </div>
    </div>
  );
}
