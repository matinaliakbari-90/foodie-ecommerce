import Features from "@/components/Features";
import ProductsTab from "@/components/products/ProductsTab";
import { getFetch } from "@/utils/Fetch";

export default async function Home() {

  const productsTab = await getFetch('/products/products-tabs');

  return (
    <>
      <Features />
      <ProductsTab tabList={productsTab.tabList} tabPanel={productsTab.tabPanel} />
    </>
  );
}
