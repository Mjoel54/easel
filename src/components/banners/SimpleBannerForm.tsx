import React, { useState } from "react";
import { ColorSelector, TitleSelector, CancelButton, SubmitButton } from "../forms/index.js";

interface CreateBannerFormProps {
  onCancel: () => void;
  onGenerate: (html: string) => void;
}

const getBrandColor = () => {
  return getComputedStyle(document.documentElement).getPropertyValue('--color-brand').trim() || '#8a19cc';
};

export const SimpleBannerForm: React.FC<CreateBannerFormProps> = ({
  onCancel,
  onGenerate,
}) => {
  const [text, setText] = useState("");
  const [backgroundColor, setBackgroundColor] = useState(getBrandColor());

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
        label="Background Colour"
        value={backgroundColor}
        onChange={setBackgroundColor}
      />

      <div className="flex gap-3 pt-4">
        <CancelButton onClick={onCancel} />
        <SubmitButton disabled={!text.trim()}>
          Generate HTML
        </SubmitButton>
      </div>
    </form>
  );
};
