// features/banners/bannerConfig.ts
import {
  SimpleBannerForm,
  GradientBannerForm,
  BorderBannerForm,
  AdminBannerForm,
} from "./components/index.js";
import {
  generateSimpleBanner,
  generateGradientBanner,
  generateBorderBanner,
  generateAdminBanner,
  type SimpleBannerData,
  type GradientBannerData,
  type BorderBannerData,
  type AdminBannerData,
} from "./utils/generators.js";
import { theme } from "../../utils/theme.js";

export const bannerData = [
  {
    id: 1,
    name: "Simple",
    FormComponent: SimpleBannerForm,
    generate: generateSimpleBanner,
    defaultData: {
      text: "Heading",
      backgroundColor: theme.primary,
    } as SimpleBannerData,
  },
  {
    id: 2,
    name: "Gradient",
    FormComponent: GradientBannerForm,
    generate: generateGradientBanner,
    defaultData: {
      text: "Heading",
      gradientDirection: "custom",
      startColour: theme.primary,
      customEndColor: theme.gradientEnd,
    } as GradientBannerData,
  },
  {
    id: 3,
    name: "Border",
    FormComponent: BorderBannerForm,
    generate: generateBorderBanner,
    defaultData: {
      text: "Heading",
      accentColor: theme.primary,
      thickness: 15,
    } as BorderBannerData,
  },
  {
    id: 4,
    name: "Admin",
    FormComponent: AdminBannerForm,
    generate: generateAdminBanner,
    defaultData: {
      text: "Heading",
      backgroundColor: theme.primary,
      textColor: "#ffffff",
      borderWidth: 0,
      borderColor: "#000000",
      borderRadius: 8,
      boxShadow: "none",
    } as AdminBannerData,
  },
] as const;
