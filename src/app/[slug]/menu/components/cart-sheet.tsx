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
import CartItem from "./cart-product-item";

const CartSheet = () => {
  const { isOpen, togleCart, products } = useContext(CartContext);

  return (
    <Sheet open={isOpen} onOpenChange={togleCart}>
      <SheetTrigger></SheetTrigger>
      <SheetContent className="w-[86%]">
        <SheetHeader>
          <SheetTitle>Voce esta absolutamente bem!</SheetTitle>
          <SheetDescription>Que bom bora la!</SheetDescription>
        </SheetHeader>
        <div className="py-5">
          {products.map((product) => (
            <CartItem key={product.id} product={product} />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default CartSheet;
