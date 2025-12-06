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
  const [boxShadow, setBoxShadow] = useState<
    "none" | "option1" | "option2" | "option3"
  >("none");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (userRole === "administrator") {
      const { html, css } = generateSimpleBannerClasses({
        text: "Your banner text here",
        classPrefix,
        backgroundColor,
        boxShadow,
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
                  } }</style><div class="preview-banner" style="background-color: ${backgroundColor}; padding: 10px 20px; margin-bottom: 1rem; border-radius: 0 15px 0 5px;"><h2 style="font-size: 26px; margin: 0.5rem 0; color: #ffffff;"><strong>${
                    text || "Your banner text here"
                  }</strong></h2></div>`
                : generateSimpleBanner({
                    text: text || "Your banner text here",
                    backgroundColor,
                  }),
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userRole === "teacher" && (
          <TextSelector
            id="banner-text"
            label="Banner Text"
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
              LMS (e.g., "my-school" creates "my-school-simple-banner")
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
};
