"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

interface CartProducts extends Product {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  products: CartProducts[];
  togleCart: () => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  togleCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setproducts] = useState<CartProducts[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const togleCart = () => [setIsOpen((prev) => !prev)];

  console.log(isOpen);
  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        togleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
