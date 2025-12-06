import React, { useState } from "react";
import {
  ColorSelector,
  TextSelector,
  UserSelector,
  RangeSelector,
  BoxShadowSelector,
} from "./index.js";
import { CancelButton, SubmitButton } from "../../../components/index.js";
import { theme } from "../../../utils/theme.js";
import {
  generateBorderBanner,
  generateBorderBannerClasses,
} from "../utils/generators.js";

interface BorderBannerFormProps {
  onCancel: () => void;
  onGenerate: (html: string, css?: string) => void;
}

export function BorderBannerForm({
  onCancel,
  onGenerate,
}: BorderBannerFormProps) {
  const [userRole, setUserRole] = useState<"teacher" | "administrator">(
    "teacher"
  );
  const [text, setText] = useState("");
  const [classPrefix, setClassPrefix] = useState("");
  const [accentColor, setAccentColor] = useState(theme.primary);
  const [thickness, setThickness] = useState(theme.thickness);
  const [boxShadow, setBoxShadow] = useState<
    "none" | "option1" | "option2" | "option3"
  >("none");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (userRole === "administrator") {
      const { html, css } = generateBorderBannerClasses({
        text: "Your banner text here",
        classPrefix,
        accentColor,
        thickness,
        boxShadow,
      });
      onGenerate(html, css);
    } else {
      const html = generateBorderBanner({ text, accentColor, thickness });
      onGenerate(html);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <UserSelector
        id="lms-role"
        label="Which LMS role are you using?"
        value={userRole}
        onChange={setUserRole}
      />

      <div>
        <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
          Preview
        </p>
        <div
          dangerouslySetInnerHTML={{
            __html:
              userRole === "administrator" && boxShadow !== "none"
                ? `<style>.preview-banner { ${
                    theme.boxShadows[boxShadow]
                  } }</style><div class="preview-banner" style="background: #f5f7fa; padding: 24px 32px; margin-bottom: 1rem; border-radius: 8px; border-left: ${thickness}px solid ${accentColor};"><h2 style="margin: 0; color: #1e293b; font-size: 26px;"><strong>${
                    text || "Your banner text here"
                  }</strong></h2></div>`
                : generateBorderBanner({
                    text: text || "Your banner text here",
                    accentColor,
                    thickness,
                  }),
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userRole === "teacher" && (
          <TextSelector
            id="banner-text"
            label="Title"
            value={text}
            onChange={setText}
          />
        )}

        {userRole === "administrator" && (
          <div>
            <TextSelector
              id="class-prefix"
              label="Class Prefix"
              value={classPrefix}
              onChange={setClassPrefix}
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Choose a unique prefix to avoid class name collisions with your
              LMS (e.g., "my-school" creates "my-school-border-banner")
            </p>
          </div>
        )}

        <ColorSelector
          id="accent-color"
          label="Accent Colour"
          value={accentColor}
          onChange={setAccentColor}
        />

        <RangeSelector
          id="thickness"
          label="Accent Edge Thickness"
          value={thickness}
          onChange={setThickness}
          min={3}
          max={30}
          helperText="true"
        />
      </div>

      {userRole === "administrator" && (
        <BoxShadowSelector
          id="box-shadow"
          label="Box Shadow"
          value={boxShadow}
          onChange={setBoxShadow}
        />
      )}

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
}
