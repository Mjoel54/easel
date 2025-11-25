import { SimpleBannerForm } from "./SimpleBannerForm.js";
import GradientBannerForm from "./GradientBannerForm.js";
import { BorderBannerForm } from "./BorderBannerForm.js";

const getBrandColor = () => {
  return getComputedStyle(document.documentElement).getPropertyValue('--color-brand').trim() || '#8a19cc';
};

const getBrandColorLight = () => {
  return getComputedStyle(document.documentElement).getPropertyValue('--color-brand-light').trim() || '#a837ea';
};

export class BannerService {
  static get Simple() {
    const brandColor = getBrandColor();
    return {
      id: 1,
      name: "Simple",
      formComponent: SimpleBannerForm,
      preview: `<div style="background-color: ${brandColor}; padding: 10px 20px; margin-bottom: 1rem; border-radius: 0 15px 0 5px;"><h2 style="margin: 0.5rem 0; font-size: 28px; color: #ffffff;"><strong>Heading</strong></h2></div>`,
    };
  }

  static get Gradient() {
    const brandColor = getBrandColor();
    const brandColorLight = getBrandColorLight();
    return {
      id: 2,
      name: "Gradient",
      formComponent: GradientBannerForm,
      preview: `<div style="position: relative; background: linear-gradient(135deg, ${brandColor} 0%, ${brandColorLight} 100%); padding: 24px 32px; margin-bottom: 1rem; border-radius: 16px; overflow: hidden;">
  <h2 style="position: relative; margin: 0; color: #ffffff; font-size: 28px;"><strong>Heading</strong></h2>
</div>`,
    };
  }

  static get Border() {
    const brandColor = getBrandColor();
    return {
      id: 3,
      name: "Border",
      formComponent: BorderBannerForm,
      preview: `<div style="background: #f5f7fa; padding: 24px 32px; margin-bottom: 1rem; border-radius: 8px; border-left: 10px solid ${brandColor};">
  <h2 style="margin: 0; color: #1e293b; font-size: 26px; line-height: 1.3;"><strong>Heading</strong></h2>
</div>`,
    };
  }
}
