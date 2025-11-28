import React from "react";

interface EditableLinkTextProps {
  innerHTML: string;
  onChange: (innerHTML: string) => void;
  indent?: number;
}

export const EditableLinkText: React.FC<EditableLinkTextProps> = ({
  innerHTML,
  onChange,
  indent = 0,
}) => {
  const labelClassName = "text-sm font-mono text-gray-500 dark:text-gray-400";

  const inputClassName =
    "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500";

  // Extract plain text from innerHTML for display
  const extractTextContent = (html: string): string => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || "";
  };

  // Update innerHTML by replacing text content while preserving structure
  const updateInnerHTML = (newText: string): string => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = innerHTML;
    tempDiv.textContent = newText;
    return tempDiv.innerHTML;
  };

  const textContent = extractTextContent(innerHTML);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    const newInnerHTML = updateInnerHTML(newText);
    onChange(newInnerHTML);
  };

  return (
    <div className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
      <div
        className="flex items-start gap-4 py-2 pr-4"
        style={{ paddingLeft: `${indent}px` }}
      >
        <div className="shrink-0 w-32 pt-2">
          <span className={labelClassName}>Link text</span>
        </div>
        <div className="flex-1 min-w-0">
          <input
            type="text"
            value={textContent}
            onChange={handleChange}
            className={inputClassName}
            placeholder="Enter link text..."
          />
        </div>
      </div>
    </div>
  );
};
