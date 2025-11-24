import React, { useState } from "react";
import { ColorSelector, TitleSelector } from "../forms/index.js";

interface GradientBannerFormProps {
  onCancel: () => void;
  onGenerate: (html: string) => void;
}

export default function GradientBannerForm({
  onCancel,
  onGenerate,
}: GradientBannerFormProps) {
  const [text, setText] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#8a19cc");

  const adjustColor = (hex: string, percent: number): string => {
    const num = parseInt(hex.replace("#", ""), 16);
    const r = Math.max(0, Math.min(255, (num >> 16) + percent));
    const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + percent));
    const b = Math.max(0, Math.min(255, (num & 0x0000ff) + percent));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
  };

  const generateBannerHTML = (): string => {
    const darkerColor = adjustColor(backgroundColor, -30);
    return `<div style="position: relative; background: linear-gradient(135deg, ${backgroundColor} 0%, ${darkerColor} 100%); padding: 24px 32px; margin-bottom: 1rem; border-radius: 16px; overflow: hidden;">
  <h2 style="position: relative; margin: 0; color: #ffffff; font-size: 28px;"><strong>${text}</strong></h2>
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
        id="bg-color"
        label="Gradient Start Colour"
        value={backgroundColor}
        onChange={setBackgroundColor}
        helperText="The gradient will automatically transition to a darker shade"
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
}
