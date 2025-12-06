import React, { useState } from "react";
import { ColorSelector, TextSelector, RangeSelector } from "./index.js";
import { CancelButton, SubmitButton } from "../../../components/index.js";
import { theme } from "../../../utils/theme.js";
import { generateSimpleSubheading } from "../utils/generators.js";

interface SimpleSubheadingFormProps {
  onCancel: () => void;
  onGenerate: (html: string) => void;
}

export function SimpleSubheadingForm({
  onCancel,
  onGenerate,
}: SimpleSubheadingFormProps) {
  const [text, setText] = useState("");
  const [color, setColor] = useState(theme.primary);
  const [width, setWidth] = useState(600);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const html = generateSimpleSubheading({ text, color, width });
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
              __html: generateSimpleSubheading({ text, color, width }),
            }}
          />
        </div>
      )}

      <TextSelector
        id="subheading-text"
        label="Subheading Text"
        value={text}
        onChange={setText}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ColorSelector
          id="accent-color"
          label="Colour"
          value={color}
          onChange={setColor}
        />

        <RangeSelector
          id="underline-width"
          label="Underline Width"
          value={width}
          onChange={setWidth}
          min={400}
          max={1600}
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
