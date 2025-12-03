import { ResponsiveGridForm } from "./components/index.js";
import {
  generateResponsiveGrid,
  type ResponsiveGridData,
} from "./utils/generators.js";
import { theme } from "../../utils/theme.js";

export const layoutData = [
  {
    id: 1,
    name: "Responsive Grid",
    FormComponent: ResponsiveGridForm,
    generate: generateResponsiveGrid,
    defaultData: {
      numberOfCards: 3,
      backgroundColor: theme.gray,
    } as ResponsiveGridData,
  },
] as const;
