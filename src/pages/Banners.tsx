import { PageHeader } from "../components/index.js";
import ComponentList from "../components/ComponentList.js";

export default function Banners() {
  return (
    <>
      <PageHeader
        title="Banner Components"
        description="Ready-to-use components for your Canvas LMS pages"
      />
      <ComponentList />
    </>
  );
}
