import React, { useState } from "react";
import { ColorSelector, TitleSelector, ThicknessSelector } from "./index.js";
import { CancelButton, SubmitButton } from "../../../components/index.js";
import { theme } from "../../../utils/theme.js";
import { generateBorderBanner } from "../utils/generators.js";

interface BorderBannerFormProps {
  onCancel: () => void;
  onGenerate: (html: string) => void;
}

export function BorderBannerForm({
  onCancel,
  onGenerate,
}: BorderBannerFormProps) {
  const [text, setText] = useState("");
  const [accentColor, setAccentColor] = useState(theme.primary);
  const [thickness, setThickness] = useState(theme.thickness);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const html = generateBorderBanner({ text, accentColor, thickness });
    onGenerate(html);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {text && (
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            Preview
          </p>
          <div
            dangerouslySetInnerHTML={{
              __html: generateBorderBanner({ text, accentColor, thickness }),
            }}
          />
        </div>
      )}

      <TitleSelector
        id="banner-text"
        label="Title"
        value={text}
        onChange={setText}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ColorSelector
          id="accent-color"
          label="Accent Colour"
          value={accentColor}
          onChange={setAccentColor}
          // helperText="Choose a brand colour for the left accent bar"
        />

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
      <div className="flex gap-3 pt-4">
        <CancelButton onClick={onCancel} />
        <SubmitButton disabled={!text.trim()}>Generate HTML</SubmitButton>
      </div>
    </form>
  );
}
