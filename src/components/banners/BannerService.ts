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
    preview: `<div style="position: relative; background: linear-gradient(135deg, #8a19cc 0%, #5a0f8c 100%); padding: 24px 32px; margin-bottom: 1rem; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.1) inset;">
  <div style="position: absolute; top: -50%; right: -10%; width: 300px; height: 300px; background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%); border-radius: 50%; pointer-events: none;"></div>
  <div style="position: absolute; bottom: -30%; left: -5%; width: 200px; height: 200px; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%); border-radius: 50%; pointer-events: none;"></div>
  <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.03) 50%, transparent 70%); pointer-events: none;"></div>
  <h2 style="position: relative; margin: 0; color: #ffffff; font-size: 28px; letter-spacing: -0.5px; text-shadow: 0 2px 20px rgba(0,0,0,0.3), 0 0 40px rgba(255,255,255,0.1); line-height: 1.3;"><strong>Heading</strong></h2>
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
