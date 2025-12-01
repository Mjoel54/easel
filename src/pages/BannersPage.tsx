import { Header } from "../components/index.js";
import ComponentList from "../features/generators/components/ComponentList.js";
import { BANNER_TYPES } from "../features/generators/bannerConfig.js";

export function BannersPage() {
  return (
    <>
      <Header title="Banner Components" />
      <ComponentList components={BANNER_TYPES} title="Your Banner HTML" />
    </>
  );
}
