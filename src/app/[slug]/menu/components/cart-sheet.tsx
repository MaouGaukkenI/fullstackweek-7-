import { useContext } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { CartContext } from "../context/cart";

const CartSheet = () => {
  const { isOpen, togleCart, products } = useContext(CartContext);

  return (
    <Sheet open={isOpen} onOpenChange={togleCart}>
      <SheetTrigger></SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Voce esta absolutamente bem!</SheetTitle>
          <SheetDescription>Que bom bora la!</SheetDescription>
        </SheetHeader>
        {products.map((product) => (
          <h1 key={product.id}>
            {product.name} - {product.quantity}
          </h1>
        ))}
      </SheetContent>
    </Sheet>
  );
};
export default CartSheet;
