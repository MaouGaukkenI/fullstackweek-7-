"use server";

import { ConsumptionMode } from "@prisma/client";
import { redirect } from "next/navigation";

import { db } from "@/lib/prisma";

interface CreateOrderInput {
  customerName: string;
  customerCPF: string;
  products: Array<{
    id: string;
    quantity: number;
  }>;
  consumptionMethod: ConsumptionMode;
  slug: string;
}

export const createOrder = async (input: CreateOrderInput) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      slug: input.slug,
    },
  });
  if (!restaurant) {
    throw new Error(`Restaurante não encontrado.`);
  }
  const productWithPrice = await db.product.findMany({
    where: {
      id: {
        in: input.products.map((product) => product.id),
      },
    },
    select: {
      id: true,
      price: true,
    },
  });

  const productsWhithPrieceAndQuantity = input.products.map((product) => {
    const foundProduct = productWithPrice.find((p) => p.id === product.id);
    if (!foundProduct) {
      throw new Error(`Produto com ID ${product.id} não encontrado.`);
    }
    return {
      productId: product.id,
      quantity: product.quantity,
      priece: foundProduct.price,
    };
  });

  await db.order.create({
    data: {
      status: "PENDING",
      customerName: input.customerName,
      customerCPF: input.customerCPF,
      total: productsWhithPrieceAndQuantity.reduce(
        (acc, product) => acc + product.priece * product.quantity,
        0,
      ),
      consumptionMode: input.consumptionMethod,
      restaurantId: restaurant.id,
      orderProducts: {
        createMany: {
          data: productsWhithPrieceAndQuantity,
        },
      },
    },
  });
  redirect(`/${input.slug}/orders`);
};
