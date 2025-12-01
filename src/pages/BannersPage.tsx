import { Header } from "../components/index.js";
import ComponentList from "../features/generators/components/ComponentList.js";
import { bannerData } from "../features/generators/bannerData.js";

export function BannersPage() {
  return (
    <>
      <Header
        title="Banner Components"
        description="Create striking banners that establish visual hierarchy"
      />
      <ComponentList components={bannerData} title="Your Banner HTML" />
    </>
  );
}
