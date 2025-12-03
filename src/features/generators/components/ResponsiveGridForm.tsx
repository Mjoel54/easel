import React, { useState } from "react";
import { ColorSelector, ValueSelector } from "./index.js";
import { CancelButton, SubmitButton } from "../../../components/index.js";
import { theme } from "../../../utils/theme.js";
import { generateResponsiveGrid } from "../utils/generators.js";

interface ResponsiveGridFormProps {
  onCancel: () => void;
  onGenerate: (html: string) => void;
}

export function ResponsiveGridForm({
  onCancel,
  onGenerate,
}: ResponsiveGridFormProps) {
  const [numberOfCards, setNumberOfCards] = useState(3);
  const [backgroundColor, setBackgroundColor] = useState(theme.gray);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const html = generateResponsiveGrid({ numberOfCards, backgroundColor });
    onGenerate(html);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ValueSelector
          id="number-of-cards"
          label="Number of Cards"
          value={numberOfCards}
          onChange={setNumberOfCards}
          min={1}
          max={12}
        />

        <ColorSelector
          id="bg-color"
          label="Background Colour"
          value={backgroundColor}
          onChange={setBackgroundColor}
        />
      </div>

      <div>
        <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
          Preview
        </p>
        <div
          dangerouslySetInnerHTML={{
            __html: generateResponsiveGrid({ numberOfCards, backgroundColor }),
          }}
        />
      </div>

      <div className="flex gap-3 pt-4">
        <CancelButton onClick={onCancel} />
        <SubmitButton>Generate HTML</SubmitButton>
      </div>
    </form>
  );
}
