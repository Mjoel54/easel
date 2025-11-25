import React, { useState } from "react";
import { ColorSelector, TitleSelector, CancelButton, SubmitButton } from "../forms/index.js";

interface GradientBannerFormProps {
  onCancel: () => void;
  onGenerate: (html: string) => void;
}

const getBrandColor = () => {
  return getComputedStyle(document.documentElement).getPropertyValue('--color-brand').trim() || '#8a19cc';
};

export default function GradientBannerForm({
  onCancel,
  onGenerate,
}: GradientBannerFormProps) {
  const [text, setText] = useState("");
  const [backgroundColor, setBackgroundColor] = useState(getBrandColor());
  const [gradientDirection, setGradientDirection] = useState<
    "lighter" | "darker"
  >("lighter");

  const adjustColor = (hex: string, percent: number): string => {
    const num = parseInt(hex.replace("#", ""), 16);
    const r = Math.max(0, Math.min(255, (num >> 16) + percent));
    const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + percent));
    const b = Math.max(0, Math.min(255, (num & 0x0000ff) + percent));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
  };

  const generateBannerHTML = (): string => {
    const adjustment = gradientDirection === "darker" ? -30 : 30;
    const endColor = adjustColor(backgroundColor, adjustment);
    return `<div style="position: relative; background: linear-gradient(135deg, ${backgroundColor} 0%, ${endColor} 100%); padding: 24px 32px; margin-bottom: 1rem; border-radius: 16px; overflow: hidden;">
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
      {text && (
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            Preview
          </p>
          <div dangerouslySetInnerHTML={{ __html: generateBannerHTML() }} />
        </div>
      )}

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
      />

      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Gradient Direction
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="gradientDirection"
              value="lighter"
              checked={gradientDirection === "lighter"}
              onChange={(e) =>
                setGradientDirection(e.target.value as "lighter" | "darker")
              }
              className="w-4 h-4 text-blue-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Lighter
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="gradientDirection"
              value="darker"
              checked={gradientDirection === "darker"}
              onChange={(e) =>
                setGradientDirection(e.target.value as "lighter" | "darker")
              }
              className="w-4 h-4 text-blue-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Darker
            </span>
          </label>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <CancelButton onClick={onCancel} />
        <SubmitButton disabled={!text.trim()}>
          Generate HTML
        </SubmitButton>
      </div>
    </form>
  );
}
