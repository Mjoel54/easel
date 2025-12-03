import { SimpleSubheadingForm } from "./components/index.js";
import {
  generateResponsiveGrid,
  type ResponsiveGridData,
} from "./utils/generators.js";
import { theme } from "../../utils/theme.js";

export const layoutData = [
  {
    id: 1,
    name: "Responsive Grid",
    FormComponent: SimpleSubheadingForm,
    generate: generateResponsiveGrid,
    defaultData: {
      numberOfCards: 2,
      backgroundColor: theme.gray,
    } as ResponsiveGridData,
  },
] as const;
