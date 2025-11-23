import React, { useState } from "react";
import { ColorSelector } from "../forms/ColorSelector.jsx";

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
    return `<div style="position: relative; background: linear-gradient(135deg, ${backgroundColor} 0%, ${darkerColor} 100%); padding: 24px 32px; margin-bottom: 1rem; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.1) inset;">
  <div style="position: absolute; top: -50%; right: -10%; width: 300px; height: 300px; background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%); border-radius: 50%; pointer-events: none;"></div>
  <div style="position: absolute; bottom: -30%; left: -5%; width: 200px; height: 200px; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%); border-radius: 50%; pointer-events: none;"></div>
  <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.03) 50%, transparent 70%); pointer-events: none;"></div>
  <h2 style="position: relative; margin: 0; color: #ffffff; font-size: 28px; letter-spacing: -0.5px; text-shadow: 0 2px 20px rgba(0,0,0,0.3), 0 0 40px rgba(255,255,255,0.1);"><strong>${text}</strong></h2>
</div>`;
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
