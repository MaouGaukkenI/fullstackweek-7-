import { db } from "@/lib/prisma";

export const getProductByProductId = async (productId: string) => {
  const product = await db.product.findUnique({ where: { id: productId } });
  return product;
};
