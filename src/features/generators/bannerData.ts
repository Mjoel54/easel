// features/banners/bannerConfig.ts
import {
  SimpleBannerForm,
  GradientBannerForm,
  BorderBannerForm,
} from "./components/index.js";
import {
  generateSimpleBanner,
  generateGradientBanner,
  generateBorderBanner,
  type SimpleBannerData,
  type GradientBannerData,
  type BorderBannerData,
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
] as const;
