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
    const existingProductOnTheCart = products.some(
      (prevProduct) => prevProduct.id === product.id,
    );
    if (!existingProductOnTheCart) {
      // Produto já existe, atualiza a quantidade
      return [...products, product];
    }
    setproducts((prevProduct) => {
      // Produto não existe, adiciona ao carrinho
      return prevProduct.map((prevProduct) => {
        if (prevProduct.id === product.id) {
          return {
            ...prevProduct,
            quantity: prevProduct.quantity + product.quantity,
          };
        }
      });
    });
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
