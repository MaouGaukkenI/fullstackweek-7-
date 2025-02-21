import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { FormatCurrency } from "@/helpers/format_currency";

import { CartContext, CartProducts } from "../context/cart";

interface CartProductItemProps {
  product: CartProducts;
}

const CartProductItem = ({ product }: CartProductItemProps) => {
  const { decreaseCartProductQuantity, addCartProductQuantity } =
    useContext(CartContext);
  return (
    <div className="flex items-center justify-between">
      {/* ESQUERDA */}
      <div className="flex items-center gap-3">
        <div className="relative h-20 w-20 rounded-xl bg-gray-100">
          <Image src={product.imageUrl} alt={product.name} fill />
        </div>
        {/* DETALHES DO PRODUTO DO CARRINHO */}
        <div className="space-y-1">
          <p className="max-w-[90%] truncate text-ellipsis text-xs">
            {product.name}
          </p>
          <p className="text-sm font-semibold">
            {FormatCurrency(product.price)}
          </p>
          {/* QUANTIDADE */}
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              className="h-8 w-8 rounded-xl"
              onClick={() => decreaseCartProductQuantity(product.id)}
            >
              <ChevronLeftIcon />
            </Button>
            <p className="w-4">{product.quantity}</p>
            <Button
              variant="destructive"
              className="h-8 w-8 rounded-xl"
              onClick={() => addCartProductQuantity(product.id)}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </div>
      {/* DIREITA */}
      <div className="">
        {/* BOTÃO DE DELETAR */}
        <Button className="h-7 w-7 rounded-lg" variant="outline">
          <TrashIcon />
        </Button>
      </div>
    </div>
  );
};

export default CartProductItem;
