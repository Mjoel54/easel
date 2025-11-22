import React, { useState } from "react";

interface ModernProfessionalBannerFormProps {
  onCancel: () => void;
  onGenerate: (html: string) => void;
}

export const ModernBannerForm: React.FC<ModernProfessionalBannerFormProps> = ({
  onCancel,
  onGenerate,
}) => {
  const [text, setText] = useState("");
  const [accentColor, setAccentColor] = useState("#8a19cc");

  const generateBannerHTML = (): string => {
    return `<div style="background: #f5f7fa; padding: 24px 32px; margin-bottom: 1rem; border-radius: 8px; border-left: 6px solid ${accentColor};">
  <h2 style="margin: 0; font-weight: 600; color: #1e293b; font-size: 26px; line-height: 1.3; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;">${text}</h2>
</div>`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const html = generateBannerHTML();
    onGenerate(html);
  };

  const handleColorChange = (value: string) => {
    const cleanValue = value.startsWith("#") ? value.slice(1) : value;
    setAccentColor(`#${cleanValue}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="banner-text"
          className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
        >
          Banner Title
        </label>
        <input
          id="banner-text"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter banner title"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          required
        />
      </div>

      <div>
        <label
          htmlFor="accent-color"
          className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
        >
          Accent Color
        </label>
        <div className="flex gap-3">
          <input
            id="accent-color"
            type="color"
            value={accentColor}
            onChange={(e) => setAccentColor(e.target.value)}
            className="h-11 w-20 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
          />
          <div className="flex-1 flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 bg-white dark:bg-gray-700">
            <span className="pl-4 pr-1 text-gray-600 dark:text-gray-400 select-none font-mono">
              #
            </span>
            <input
              type="text"
              value={accentColor.slice(1)}
              onChange={(e) => handleColorChange(e.target.value)}
              placeholder="2563eb"
              maxLength={6}
              className="flex-1 px-1 py-2 bg-transparent focus:outline-none dark:text-white font-mono"
            />
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Choose a brand color for the left accent bar
        </p>
      </div>

      {text && (
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            Preview
          </p>
          <div dangerouslySetInnerHTML={{ __html: generateBannerHTML() }} />
        </div>
      )}

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          disabled={!text.trim()}
        >
          Generate HTML
        </button>
      </div>
    </form>
  );
};
