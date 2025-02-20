import { notFound } from "next/navigation";

import { getProductAndRestaurantByProductId } from "@/data/get_product_and_restaurant_by_productId";

import ProductDetails from "../components/details";
import ProductHeader from "./components/header";

interface ProductPageProps {
  params: Promise<{ productId: string; slug: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { productId, slug } = await params;
  const product = await getProductAndRestaurantByProductId(productId);
  if (!product) {
    return notFound();
  }
  if (product.restaurant.slug.toUpperCase() != slug.toUpperCase()) {
    return notFound();
  }
  return (
    <div className="flex h-full flex-col">
      <ProductHeader product={product} />
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductPage;
