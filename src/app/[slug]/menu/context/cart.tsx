"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

export interface CartProducts
  extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  products: CartProducts[];
  togleCart: () => void;
  addProduct: (Product: CartProducts) => void;
  decreaseCartProductQuantity: (ProductId: string) => void;
  addCartProductQuantity: (ProductId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  togleCart: () => {},
  addProduct: () => {},
  decreaseCartProductQuantity: () => {},
  addCartProductQuantity: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProducts[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const togleCart = () => [setIsOpen((prev) => !prev)];
  const addProduct = (product: CartProducts) => {
    setProducts((prevProducts) => {
      const existingProduct = prevProducts.find(
        (prevProduct) => prevProduct.id === product.id,
      );

      if (existingProduct) {
        // Se o produto já existe, atualiza a quantidade
        return prevProducts.map((prevProduct) =>
          prevProduct.id === product.id
            ? {
                ...prevProduct,
                quantity: prevProduct.quantity + product.quantity,
              }
            : prevProduct,
        );
      } else {
        // Se não existe, adiciona ao carrinho
        return [...prevProducts, product];
      }
    });
  };
  const decreaseCartProductQuantity = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id === productId) {
          return {
            ...prevProduct,
            quantity:
              prevProduct.quantity > 1
                ? prevProduct.quantity - 1
                : prevProduct.quantity,
          };
        }
        return prevProduct;
      });
    });
  };
  const addCartProductQuantity = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id === productId) {
          return { ...prevProduct, quantity: prevProduct.quantity + 1 };
        }
        return prevProduct;
      });
    });
  };
  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        togleCart,
        addProduct,
        decreaseCartProductQuantity,
        addCartProductQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
