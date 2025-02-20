import { notFound } from "next/navigation";

import { getProductByProductId } from "@/data/get_product_by_productId";

import ProductHeader from "./components/header";

interface ProductPageProps {
    params: Promise<{ slug: string, productId: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
    const { slug, productId } =  await params;
    const product = await getProductByProductId(productId);
    if(!product){
        return notFound();
    }
    return (
        <>
          <ProductHeader product={product} />

          <h1>{slug}</h1>
        </>
    )
}
 
export default ProductPage;