import React, { useState } from "react";
import {
  ColorSelector,
  TextSelector,
  UserSelector,
  BoxShadowSelector,
} from "./index.js";
import { CancelButton, SubmitButton } from "../../../components/index.js";
import { theme } from "../../../utils/theme.js";
import {
  generateGradientBanner,
  generateGradientBannerClasses,
} from "../../generators/utils/generators.js";

interface GradientBannerFormProps {
  onCancel: () => void;
  onGenerate: (html: string, css?: string) => void;
}

export function GradientBannerForm({
  onCancel,
  onGenerate,
}: GradientBannerFormProps) {
  const [userRole, setUserRole] = useState<"teacher" | "administrator">(
    "teacher"
  );
  const [text, setText] = useState("");
  const [classPrefix, setClassPrefix] = useState("");
  const [gradientDirection, setGradientDirection] = useState<
    "lighter" | "darker" | "custom"
  >("custom");
  const [startColour, setstartColour] = useState(theme.primary);
  const [customEndColor, setCustomEndColor] = useState(theme.gradientEnd);
  const [boxShadow, setBoxShadow] = useState<
    "none" | "option1" | "option2" | "option3"
  >("none");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (userRole === "administrator") {
      const { html, css } = generateGradientBannerClasses({
        text: "Your banner text here",
        classPrefix,
        gradientDirection,
        startColour,
        customEndColor,
        boxShadow,
      });
      onGenerate(html, css);
    } else {
      const html = generateGradientBanner({
        text,
        gradientDirection,
        startColour,
        customEndColor,
      });
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
                ? (() => {
                    let endColor: string;
                    if (gradientDirection === "custom") {
                      endColor = customEndColor;
                    } else {
                      const adjustment = gradientDirection === "darker" ? -30 : 30;
                      const num = parseInt(startColour.replace("#", ""), 16);
                      const r = Math.max(0, Math.min(255, (num >> 16) + adjustment));
                      const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + adjustment));
                      const b = Math.max(0, Math.min(255, (num & 0x0000ff) + adjustment));
                      endColor = `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
                    }
                    return `<style>.preview-banner { ${
                      theme.boxShadows[boxShadow]
                    } }</style><div class="preview-banner" style="position: relative; background: linear-gradient(135deg, ${startColour} 0%, ${endColor} 100%); padding: 24px 32px; margin-bottom: 1rem; border-radius: 16px; overflow: hidden;"><h2 style="position: relative; margin: 0; color: #ffffff; font-size: 28px;"><strong>${
                      text || "Your banner text here"
                    }</strong></h2></div>`;
                  })()
                : generateGradientBanner({
                    text: text || "Your banner text here",
                    gradientDirection,
                    startColour,
                    customEndColor,
                  }),
          }}
        />
      </div>

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
            LMS (e.g., "my-school" creates "my-school-gradient-banner")
          </p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Gradient End Style
        </label>
        <div className="flex gap-4 flex-wrap">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="gradientDirection"
              value="custom"
              checked={gradientDirection === "custom"}
              onChange={(e) =>
                setGradientDirection(
                  e.target.value as "lighter" | "darker" | "custom"
                )
              }
              className="w-4 h-4 text-blue-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Custom Colour
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="gradientDirection"
              value="lighter"
              checked={gradientDirection === "lighter"}
              onChange={(e) =>
                setGradientDirection(
                  e.target.value as "lighter" | "darker" | "custom"
                )
              }
              className="w-4 h-4 text-blue-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Lighter
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="gradientDirection"
              value="darker"
              checked={gradientDirection === "darker"}
              onChange={(e) =>
                setGradientDirection(
                  e.target.value as "lighter" | "darker" | "custom"
                )
              }
              className="w-4 h-4 text-blue-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Darker
            </span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ColorSelector
          id="gradient-start-color"
          label="Start Colour"
          value={startColour}
          onChange={setstartColour}
        />

        {gradientDirection === "custom" && (
          <ColorSelector
            id="gradient-end-color"
            label="End Colour"
            value={customEndColor}
            onChange={setCustomEndColor}
            // helperText="Choose a custom end colour for your gradient"
          />
        )}
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
