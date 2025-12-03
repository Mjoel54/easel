import React, { useState } from "react";
import { ColorSelector } from "./index.js";
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
      <div>
        <label
          htmlFor="number-of-cards"
          className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
        >
          Number of Cards
        </label>
        <input
          id="number-of-cards"
          type="number"
          min={1}
          max={12}
          value={numberOfCards}
          onChange={(e) => setNumberOfCards(Number(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400"
        />
      </div>

      <ColorSelector
        id="bg-color"
        label="Background Colour"
        value={backgroundColor}
        onChange={setBackgroundColor}
      />

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
