import { SimpleBannerForm } from "./SimpleBannerForm.js";
import GradientBannerForm from "./GradientBannerForm.js";
import { BorderBannerForm } from "./BorderBannerForm.js";

export class BannerService {
  static readonly Simple = {
    id: 1,
    name: "Simple",
    formComponent: SimpleBannerForm,
    preview: `<div style="background-color: #8a19cc; padding: 10px 20px; margin-bottom: 1rem; border-radius: 0 15px 0 5px;"><h2 style="margin: 0.5rem 0; font-size: 28px; color: #ffffff;"><strong>Heading</strong></h2></div>`,
  };

  static readonly Gradient = {
    id: 2,
    name: "Gradient",
    formComponent: GradientBannerForm,
    preview: `<div style="position: relative; background: linear-gradient(135deg, #8a19cc 0%, #5a0f8c 100%); padding: 24px 32px; margin-bottom: 1rem; border-radius: 16px; overflow: hidden;">
  <h2 style="position: relative; margin: 0; color: #ffffff; font-size: 28px;"><strong>Heading</strong></h2>
</div>`,
  };

  static readonly Border = {
    id: 3,
    name: "Border",
    formComponent: BorderBannerForm,
    preview: `<div style="background: #f5f7fa; padding: 24px 32px; margin-bottom: 1rem; border-radius: 8px; border-left: 10px solid #8a19cc;">
  <h2 style="margin: 0; color: #1e293b; font-size: 26px; line-height: 1.3;"><strong>Heading</strong></h2>
</div>`,
  };
}
