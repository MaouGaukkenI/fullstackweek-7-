"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

interface CartProducts
  extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  products: CartProducts[];
  togleCart: () => void;
  addProduct: (Product: CartProducts) => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  togleCart: () => {},
  addProduct: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setproducts] = useState<CartProducts[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const togleCart = () => [setIsOpen((prev) => !prev)];
  const addProduct = (product: CartProducts) => {
    setproducts((prev) => [...prev, product]);
  };
  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        togleCart,
        addProduct: addProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
