import { PageHeader } from "../components/index.js";
import LibraryList from "../components/LibraryList.jsx";

export default function Banners() {
  return (
    <>
      <PageHeader
        title="Banner Components"
        description="Ready-to-use components for your Canvas LMS pages"
      />
      <LibraryList />
    </>
  );
}
