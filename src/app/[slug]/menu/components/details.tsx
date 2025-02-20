"use client";
import { Prisma } from "@prisma/client";
import { ChefHat, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FormatCurrency } from "@/helpers/format_currency";
interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
          avatarImageUrl: true;
        };
      };
    };
  }>;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const handleAddItem = () => {
    setQuantity((prev) => prev + 1);
  };
  const handleRemoveItem = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };
  return (
    <div className="relativ z-50 mt-[-1.5rem] flex flex-auto flex-col overflow-hidden rounded-t-3xl p-5">
      <div className="flex-auto">
        {/* RESTAURANTE */}
        <div className="flex items-center gap-1.5">
          <Image
            src={product.restaurant.avatarImageUrl}
            alt={product.restaurant.name}
            width={16}
            height={16}
            className="rounded-full"
          ></Image>
          <p className="text-xs text-muted-foreground">
            {product.restaurant.name}
          </p>
        </div>
        {/* NOME DO PRODUTO */}
        <h2 className="text-xl font-semibold">{product.name}</h2>
        {/* PREÇO E QUANTIDADE */}
        <div className="mt-3 flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {FormatCurrency(product.price)}
          </h3>
          <div className="flex items-center gap-3 text-center">
            <Button
              variant="outline"
              className="h-8 w-8 rounded-xl"
              onClick={handleRemoveItem}
            >
              <ChevronLeftIcon />
            </Button>
            <p className="w-4">{quantity}</p>
            <Button
              variant="destructive"
              className="h-8 w-8 rounded-xl"
              onClick={handleAddItem}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </div>
      <ScrollArea className="h-full">
        <div className="overflow-hidden">
          {/* SOBRE */}
          <div className="mt-6 space-y-3">
            <h4 className="font-semibold">Sobre</h4>
            <p className="text-sm text-muted-foreground">
              {product.description}
            </p>
          </div>
          {/* INGREDIENTES */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-1">
                <ChefHat size={18} />
                <h4 className="font-semibold">Ingredientes</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                {product.ingredients.map(
                  (ingredient: string, index: number) => (
                    <span key={index} className="block">
                      • {ingredient}
                    </span>
                  ),
                )}
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
      {/* ADICIONAR À SACOLA */}
      <Button className="mt-2 w-full rounded-full"> Adicionar à sacola</Button>
    </div>
  );
};

export default ProductDetails;
