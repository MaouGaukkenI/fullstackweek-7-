import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FormatCurrency } from "@/helpers/format_currency";

import { CartContext } from "../context/cart";
import CartItem from "./cart-product-item";

const CartSheet = () => {
  const { isOpen, togleCart, products, total } = useContext(CartContext);

  return (
    <Sheet open={isOpen} onOpenChange={togleCart}>
      <SheetTrigger></SheetTrigger>
      <SheetContent className="w-[86%]">
        <SheetHeader>
          <SheetTitle>Voce esta absolutamente bem!</SheetTitle>
          <SheetDescription>Que bom bora la!</SheetDescription>
        </SheetHeader>
        <div className="flex h-full flex-col pb-10 pt-5">
          <div className="flex-auto overflow-hidden">
            {products.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </div>
          <Card className="mb-6">
            <CardContent className="p-5">
              <div className="flex justify-between">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-sm font-semibold">{FormatCurrency(total)}</p>
              </div>
            </CardContent>
          </Card>
          <Button className="mb-4 w-full rounded-full">Finalizar pedido</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default CartSheet;
