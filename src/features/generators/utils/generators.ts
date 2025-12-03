// ----- Banner Generators -----

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

// ----- Subheading Generators -----

// Simple Subheading Generator
export interface SimpleSubheadingData {
  text: string;
  color: string;
  width: number;
}

export const generateSimpleSubheading = ({
  text,
  color,
  width,
}: SimpleSubheadingData): string => {
  return `<h3 style="color: ${color}; font-size: 26px; margin: 20px 0 10px 0;"><strong>${text}</strong></h3>
<hr style="width: ${width}px; max-width: 100%; border: 0; border-top: 3px solid ${color}; margin: 10px 0;" />`;
};

// ----- Layout Generators -----
export interface ResponsiveGridData {
  numberOfCards: number;
  backgroundColor: string;
}

export const generateResponsiveGrid = ({
  numberOfCards,
  backgroundColor,
}: ResponsiveGridData): string => {
  const cards = Array.from(
    { length: numberOfCards },
    (_, i) => `
  <div style="flex: 1 1 300px; padding: 10px; min-width: 0; display: flex;">
    <div style="background: ${backgroundColor}; padding: 20px; border: 1px solid #ddd; border-radius: 8px; width: 100%;">
      <h3 style="margin: 0 0 10px 0; color: #333;"><strong>Card ${
        i + 1
      }</strong></h3>
      <p style="margin: 0; line-height: 1.6;">Add your content here. This text can be edited using the HTML Editor.</p>
    </div>
  </div>`
  ).join("");

  return `<div style="display: flex; flex-wrap: wrap; margin: 0 -10px;">${cards}
</div>`;
};
