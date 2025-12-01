import { Header } from "../components/index.js";
import ComponentList from "../features/generators/components/ComponentList.js";
import { headingData } from "../features/generators/headingData.js";

export function SubheadingsPage() {
  return (
    <>
      <Header
        title="Subheading Components"
        description="Break up text blocks with styled subheadings"
      />
      <ComponentList components={headingData} title="Your Subheading HTML" />
    </>
  );
}
