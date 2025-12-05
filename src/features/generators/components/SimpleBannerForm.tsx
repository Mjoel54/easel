import React, { useState } from "react";
import { ColorSelector, TitleSelector, UserSelector } from "./index.js";
import { CancelButton, SubmitButton } from "../../../components/index.js";
import { theme } from "../../../utils/theme.js";
import {
  generateSimpleBanner,
  generateSimpleBannerClasses,
} from "../utils/generators.js";

interface SimpleBannerFormProps {
  onCancel: () => void;
  onGenerate: (html: string, css?: string) => void;
}

export const SimpleBannerForm: React.FC<SimpleBannerFormProps> = ({
  onCancel,
  onGenerate,
}) => {
  const [userRole, setUserRole] = useState<"teacher" | "administrator">(
    "teacher"
  );
  const [text, setText] = useState("");
  const [classPrefix, setClassPrefix] = useState("");
  const [backgroundColor, setBackgroundColor] = useState(theme.primary);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (userRole === "administrator") {
      const { html, css } = generateSimpleBannerClasses({
        text: "Your banner text here",
        classPrefix,
        backgroundColor,
      });
      onGenerate(html, css);
    } else {
      const html = generateSimpleBanner({ text, backgroundColor });
      onGenerate(html);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <UserSelector
        id="canvas-role"
        label="Which Canvas role are you using?"
        value={userRole}
        onChange={setUserRole}
      />

      <div>
        <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
          Preview
        </p>
        <div
          dangerouslySetInnerHTML={{
            __html: generateSimpleBanner({
              text: text || "Your banner text here",
              backgroundColor,
            }),
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userRole === "teacher" && (
          <TitleSelector
            id="banner-text"
            label="Banner Text"
            value={text}
            onChange={setText}
          />
        )}

        {userRole === "administrator" && (
          <div>
            <TitleSelector
              id="class-prefix"
              label="Class Prefix"
              value={classPrefix}
              onChange={setClassPrefix}
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Choose a unique prefix to avoid class name collisions with your
              LMS (e.g., "my-school" creates "my-school-banner")
            </p>
          </div>
        )}

        <ColorSelector
          id="bg-color"
          label="Background Colour"
          value={backgroundColor}
          onChange={setBackgroundColor}
        />
      </div>

      <div className="flex gap-3 pt-4">
        <CancelButton onClick={onCancel} />
        <SubmitButton
          disabled={userRole === "teacher" ? !text.trim() : !classPrefix.trim()}
        >
          Generate {userRole === "administrator" ? "CSS" : "HTML"}
        </SubmitButton>
      </div>
    </form>
  );
};
