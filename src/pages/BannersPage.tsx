import { Header } from "../components/index.js";
import ComponentList from "../features/banners/components/ComponentList.js";
import { BANNER_TYPES } from "../features/banners/bannerConfig.js";

export function BannersPage() {
  return (
    <>
      <Header title="Banner Components" />
      <ComponentList components={BANNER_TYPES} title="Your Banner HTML" />
    </>
  );
}
