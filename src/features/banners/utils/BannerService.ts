import {
  SimpleBannerForm,
  GradientBannerForm,
  BorderBannerForm,
} from "../components/index.js";
import { theme } from "../../../utils/theme.js";

export class BannerService {
  static get Simple() {
    return {
      id: 1,
      name: "Simple",
      formComponent: SimpleBannerForm,
      preview: `<div style="background-color: ${theme.primary}; padding: 10px 20px; margin-bottom: 1rem; border-radius: 0 15px 0 5px;"><h2 style="margin: 0.5rem 0; font-size: 28px; color: #ffffff;"><strong>Heading</strong></h2></div>`,
    };
  }

  static get Gradient() {
    return {
      id: 2,
      name: "Gradient",
      formComponent: GradientBannerForm,
      preview: `<div style="position: relative; background: linear-gradient(135deg, ${theme.primary} 0%, ${theme.gradientEnd} 100%); padding: 24px 32px; margin-bottom: 1rem; border-radius: 16px; overflow: hidden;">
  <h2 style="position: relative; margin: 0; color: #ffffff; font-size: 28px;"><strong>Heading</strong></h2>
</div>`,
    };
  }

  static get Border() {
    return {
      id: 3,
      name: "Border",
      formComponent: BorderBannerForm,
      preview: `<div style="background: #f5f7fa; padding: 24px 32px; margin-bottom: 1rem; border-radius: 8px; border-left: ${theme.thickness}px solid ${theme.primary};">
  <h2 style="margin: 0; color: #1e293b; font-size: 26px;"><strong>Heading</strong></h2>
</div>`,
    };
  }

  static get Outline() {
    return {
      id: 4,
      name: "Outline",
      formComponent: BorderBannerForm,
      preview: `<div style="padding: 24px 32px; margin-bottom: 1rem; border-top: ${theme.thickness}px solid ${theme.primary}; border-bottom: ${theme.thickness}px solid ${theme.primary}; background-color: #f8faff;">
        <h2 style="margin: 0; color: ${theme.primary}; font-size: 26px;"><strong>Outline Heading</strong></h2>
      </div>`,
    };
  }
}
