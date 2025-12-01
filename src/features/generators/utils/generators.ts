// Simple Banner Generator
export interface SimpleBannerData {
  text: string;
  backgroundColor: string;
}

export const generateSimpleBanner = ({
  text,
  backgroundColor,
}: SimpleBannerData): string => {
  return `<div style="background-color: ${backgroundColor}; padding: 10px 20px; margin-bottom: 1rem; border-radius: 0 15px 0 5px;"><h2 style="font-size: 26px; margin: 0.5rem 0; color: #ffffff;"><strong>${text}</strong></h2></div>`;
};

// Gradient Banner Generator
const adjustColor = (hex: string, percent: number): string => {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + percent));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + percent));
  const b = Math.max(0, Math.min(255, (num & 0x0000ff) + percent));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
};

export interface GradientBannerData {
  text: string;
  gradientDirection: "lighter" | "darker" | "custom";
  startColour: string;
  customEndColor: string;
}

export const generateGradientBanner = ({
  text,
  gradientDirection,
  startColour,
  customEndColor,
}: GradientBannerData): string => {
  let endColor: string;

  if (gradientDirection === "custom") {
    endColor = customEndColor;
  } else {
    const adjustment = gradientDirection === "darker" ? -30 : 30;
    endColor = adjustColor(startColour, adjustment);
  }

  return `<div style="position: relative; background: linear-gradient(135deg, ${startColour} 0%, ${endColor} 100%); padding: 24px 32px; margin-bottom: 1rem; border-radius: 16px; overflow: hidden;">
  <h2 style="position: relative; margin: 0; color: #ffffff; font-size: 28px;"><strong>${text}</strong></h2>
</div>`;
};

// Border Banner Generator
export interface BorderBannerData {
  text: string;
  accentColor: string;
  thickness: number;
}

export const generateBorderBanner = ({
  text,
  accentColor,
  thickness,
}: BorderBannerData): string => {
  return `<div style="background: #f5f7fa; padding: 24px 32px; margin-bottom: 1rem; border-radius: 8px; border-left: ${thickness}px solid ${accentColor};">
  <h2 style="margin: 0; color: #1e293b; font-size: 26px;"><strong>${text}</strong></h2>
</div>`;
};
