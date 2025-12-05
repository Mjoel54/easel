import React, { useState } from "react";
import { ColorSelector, TitleSelector, UserSelector } from "./index.js";
import { CancelButton, SubmitButton } from "../../../components/index.js";
import { theme } from "../../../utils/theme.js";
import { generateSimpleBanner } from "../utils/generators.js";

interface SimpleBannerFormProps {
  onCancel: () => void;
  onGenerate: (html: string) => void;
}

export const SimpleBannerForm: React.FC<SimpleBannerFormProps> = ({
  onCancel,
  onGenerate,
}) => {
  const [userRole, setUserRole] = useState<"teacher" | "administrator">("teacher");
  const [text, setText] = useState("");
  const [backgroundColor, setBackgroundColor] = useState(theme.primary);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const html = generateSimpleBanner({ text, backgroundColor });
    onGenerate(html);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <UserSelector
        id="canvas-role"
        label="Which Canvas role are you using?"
        value={userRole}
        onChange={setUserRole}
      />

      {text && (
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            Preview
          </p>
          <div
            dangerouslySetInnerHTML={{
              __html: generateSimpleBanner({ text, backgroundColor }),
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

      <ColorSelector
        id="bg-color"
        label="Background Colour"
        value={backgroundColor}
        onChange={setBackgroundColor}
      />

      <div className="flex gap-3 pt-4">
        <CancelButton onClick={onCancel} />
        <SubmitButton disabled={!text.trim()}>Generate HTML</SubmitButton>
      </div>
    </form>
  );
};
