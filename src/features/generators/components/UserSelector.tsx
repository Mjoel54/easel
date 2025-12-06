interface UserSelectorProps {
  id: string;
  label: string;
  value: "teacher" | "administrator";
  onChange: (value: "teacher" | "administrator") => void;
}

export function UserSelector({
  id,
  label,
  value,
  onChange,
}: UserSelectorProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
      >
        {label}
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Teacher Option */}
        <label
          className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
            value === "teacher"
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
              : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-blue-300 dark:hover:border-blue-400"
          }`}
        >
          <input
            type="radio"
            id={`${id}-teacher`}
            name={id}
            value="teacher"
            checked={value === "teacher"}
            onChange={() => onChange("teacher")}
            className="mt-1 h-4 w-4 text-blue-600 focus:outline-none focus:ring-0 border-gray-300 dark:border-gray-600 cursor-pointer"
          />
          <div className="ml-3 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900 dark:text-white">
                Teacher
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                (most users)
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              Creates HTML ready to paste into LMS pages
            </p>
          </div>
        </label>

        {/* Administrator Option */}
        <label
          className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
            value === "administrator"
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
              : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-blue-300 dark:hover:border-blue-400"
          }`}
        >
          <input
            type="radio"
            id={`${id}-administrator`}
            name={id}
            value="administrator"
            checked={value === "administrator"}
            onChange={() => onChange("administrator")}
            className="mt-1 h-4 w-4 text-blue-600 focus:outline-none focus:ring-0 border-gray-300 dark:border-gray-600 cursor-pointer"
          />
          <div className="ml-3 flex-1">
            <span className="font-semibold text-gray-900 dark:text-white">
              Administrator
            </span>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              Creates reusable CSS classes to import into your theme
            </p>
          </div>
        </label>
      </div>
    </div>
  );
}
