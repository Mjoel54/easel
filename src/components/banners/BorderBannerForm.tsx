import React, { useState } from "react";
import { ColorSelector, TitleSelector } from "../forms/index.js";

interface BorderBannerBannerFormProps {
  onCancel: () => void;
  onGenerate: (html: string) => void;
}

export const BorderBannerForm: React.FC<BorderBannerBannerFormProps> = ({
  onCancel,
  onGenerate,
}) => {
  const [text, setText] = useState("");
  const [accentColor, setAccentColor] = useState("#8a19cc");
  const [thickness, setThickness] = useState(10);

  const generateBannerHTML = (): string => {
    return `<div style="background: #f5f7fa; padding: 24px 32px; margin-bottom: 1rem; border-radius: 8px; border-left: ${thickness}px solid ${accentColor};">
  <h2 style="margin: 0; color: #1e293b; font-size: 26px;"><strong>${text}</strong></h2>
</div>`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const html = generateBannerHTML();
    onGenerate(html);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <TitleSelector
        id="banner-text"
        label="Title"
        value={text}
        onChange={setText}
      />

      <ColorSelector
        id="accent-color"
        label="Accent Colour"
        value={accentColor}
        onChange={setAccentColor}
        helperText="Choose a brand colour for the left accent bar"
      />

      <div>
        <label
          htmlFor="thickness"
          className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
        >
          Accent Edge Thickness: {thickness}px
        </label>
        <div className="max-w-md">
          <input
            id="thickness"
            type="range"
            min="3"
            max="25"
            value={thickness}
            onChange={(e) => setThickness(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>3px (Subtle)</span>
            <span>25px (Bold)</span>
          </div>
        </div>
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
