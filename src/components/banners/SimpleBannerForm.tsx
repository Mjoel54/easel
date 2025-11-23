import React, { useState } from "react";
import { ColorSelector } from "../forms/ColorSelector.jsx";

interface CreateBannerFormProps {
  onCancel: () => void;
  onGenerate: (html: string) => void;
}

export const SimpleBannerForm: React.FC<CreateBannerFormProps> = ({
  onCancel,
  onGenerate,
}) => {
  const [text, setText] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#8a19cc");

  const generateBannerHTML = (): string => {
    return `<div style="background-color: ${backgroundColor}; padding: 10px 20px; margin-bottom: 1rem; border-radius: 0 15px 0 5px;"><h2 style="font-size: 26px; margin: 0.5rem 0; color: #ffffff;"><strong>${text}</strong></h2></div>`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const html = generateBannerHTML();
    onGenerate(html);
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
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          required
        />
      </div>

      <ColorSelector
        id="bg-color"
        label="Background Colour"
        value={backgroundColor}
        onChange={setBackgroundColor}
      />

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
