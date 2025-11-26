import React, { useState } from "react";
import {
  ColorSelector,
  TitleSelector,
  CancelButton,
  SubmitButton,
  ThicknessSelector,
} from "../forms/index.js";
import { theme } from "../../utils/theme.js";

interface BorderBannerBannerFormProps {
  onCancel: () => void;
  onGenerate: (html: string) => void;
}

export const BorderBannerForm: React.FC<BorderBannerBannerFormProps> = ({
  onCancel,
  onGenerate,
}) => {
  const [text, setText] = useState("");
  const [accentColor, setAccentColor] = useState(theme.primary);
  const [thickness, setThickness] = useState(theme.thickness);

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <ColorSelector
            id="accent-color"
            label="Accent Colour"
            value={accentColor}
            onChange={setAccentColor}
            // helperText="Choose a brand colour for the left accent bar"
          />
        </div>
        <div>
          <ThicknessSelector
            id="thickness"
            label="Accent Edge Thickness"
            value={thickness}
            onChange={setThickness}
            min={3}
            max={30}
            helperText="true"
          />
        </div>
      </div>
      <div className="flex gap-3 pt-4">
        <CancelButton onClick={onCancel} />
        <SubmitButton disabled={!text.trim()}>Generate HTML</SubmitButton>
      </div>
    </form>
  );
};
