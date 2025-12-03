import { Header } from "../components/index.js";
import ComponentList from "../features/generators/components/ComponentList.js";
import { layoutData } from "../features/generators/layoutData.js";

export function LayoutsPage() {
  return (
    <>
      <Header
        title="Layout Components"
        description="Build responsive and flexible layouts with ease"
      />
      <ComponentList components={layoutData} title="Your Layout HTML" />
    </>
  );
}
