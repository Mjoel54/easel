import React, { useState } from "react";
import { ColorSelector, TitleSelector, RangeSelector, BoxShadowSelector } from "./index.js";
import { CancelButton, SubmitButton } from "../../../components/index.js";
import { theme } from "../../../utils/theme.js";
import { generateAdminBanner } from "../utils/generators.js";

interface AdminBannerFormProps {
  onCancel: () => void;
  onGenerate: (html: string) => void;
}

export function AdminBannerForm({
  onCancel,
  onGenerate,
}: AdminBannerFormProps) {
  const [text, setText] = useState("");
  const [backgroundColor, setBackgroundColor] = useState(theme.primary);
  const [textColor, setTextColor] = useState("#ffffff");

  // Border options
  const [borderWidth, setBorderWidth] = useState(0);
  const [borderColor, setBorderColor] = useState("#000000");
  const [borderRadius, setBorderRadius] = useState(8);

  // Box shadow options
  const [boxShadow, setBoxShadow] = useState<"none" | "option1" | "option2" | "option3">("none");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const html = generateAdminBanner({
      text,
      backgroundColor,
      textColor,
      borderWidth,
      borderColor,
      borderRadius,
      boxShadow,
    });
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
              __html: generateAdminBanner({
                text,
                backgroundColor,
                textColor,
                borderWidth,
                borderColor,
                borderRadius,
                boxShadow,
              }),
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

      {/* Color Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Colors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ColorSelector
            id="bg-color"
            label="Background Color"
            value={backgroundColor}
            onChange={setBackgroundColor}
          />
          <ColorSelector
            id="text-color"
            label="Text Color"
            value={textColor}
            onChange={setTextColor}
          />
        </div>
      </div>

      {/* Border Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Border</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RangeSelector
            id="border-width"
            label="Border Width"
            value={borderWidth}
            onChange={setBorderWidth}
            min={0}
            max={20}
            helperText="true"
          />
          <RangeSelector
            id="border-radius"
            label="Border Radius"
            value={borderRadius}
            onChange={setBorderRadius}
            min={0}
            max={50}
            helperText="true"
          />
        </div>

        {borderWidth > 0 && (
          <ColorSelector
            id="border-color"
            label="Border Color"
            value={borderColor}
            onChange={setBorderColor}
          />
        )}
      </div>

      {/* Box Shadow Section */}
      <BoxShadowSelector
        id="box-shadow"
        label="Box Shadow"
        value={boxShadow}
        onChange={setBoxShadow}
      />

      <div className="flex gap-3 pt-4">
        <CancelButton onClick={onCancel} />
        <SubmitButton disabled={!text.trim()}>Generate HTML</SubmitButton>
      </div>
    </form>
  );
}
