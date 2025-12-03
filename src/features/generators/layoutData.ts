import { SimpleSubheadingForm } from "./components/index.js";
import {
  generateSimpleSubheading,
  type SimpleSubheadingData,
} from "./utils/generators.js";
import { theme } from "../../utils/theme.js";

export const layoutData = [
  {
    id: 1,
    name: "Underline",
    FormComponent: SimpleSubheadingForm,
    generate: generateSimpleSubheading,
    defaultData: {
      text: "Heading",
      color: theme.primary,
      width: 600,
    } as SimpleSubheadingData,
  },
] as const;
