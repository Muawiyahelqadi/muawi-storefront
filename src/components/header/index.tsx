import { fetchHeaderByType } from "@/src/sanity/queries/header";
import HeaderClient from "@/src/components/header/headerClient";

const Header = async () => {
  const header = await fetchHeaderByType();
  return <HeaderClient {...header} />;
};

export default Header;
