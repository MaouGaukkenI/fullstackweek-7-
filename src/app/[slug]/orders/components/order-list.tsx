"use client";

import { Prisma } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FormatCurrency } from "@/helpers/format_currency";

interface OrderListProps {
  orders: Array<
    Prisma.OrderGetPayload<{
      include: {
        restaurant: {
          select: {
            name: true;
            avatarImageUrl: true;
          };
        };
        orderProducts: {
          select: {
            product: {
              select: {
                name: true;
              };
            };
            quantity: true;
            priece: true;
            id: true;
          };
        };
      };
    }>
  >;
}
const OrderList = ({ orders }: OrderListProps) => {
  const router = useRouter();
  const handleBackClick = router.back;
  return (
    <div className="space-y-6 p-6">
      <Button
        size="icon"
        variant="secondary"
        className="rounded-full"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
      <div className="flex items-center gap-2">
        <ScrollTextIcon />
        <h2 className="text-lg font-semibold"> Meus pedidos</h2>
      </div>
      {orders.map((order) => (
        <div
          key={order.id}
          className="rounded-lg border border-gray-200 p-4 shadow-sm"
        >
          {/* Status do pedido */}
          <div
            className={`inline-block whitespace-nowrap rounded-full px-2 py-1 text-sm font-semibold ${order.status === "PENDING" ? "bg-yellow-500 text-white" : ""} ${order.status === "IN_DELIVERY" ? "bg-red-500 text-white" : ""} ${order.status === "FINISHED" ? "bg-green-500 text-white" : ""} ${order.status === "IN_PREPARING" ? "bg-gray-100 text-gray-600" : ""} `}
          >
            {order.status === "PENDING"
              ? "Aguardando confirmação"
              : order.status === "IN_PREPARING"
                ? "Em preparo"
                : order.status === "IN_DELIVERY"
                  ? "Saiu para entrega"
                  : "Finalizado"}
          </div>

          {/* Nome do restaurante e imagem */}
          <div className="mt-2 flex items-center gap-2">
            <div className="relative h-5 w-5 overflow-hidden rounded-sm">
              <Image
                src={order.restaurant.avatarImageUrl}
                alt={order.restaurant.name}
                fill
              />
            </div>
            <h3 className="text-lg font-semibold">FSW Donald’s</h3>
          </div>
          <Separator />

          {/* Itens do pedido */}
          {order.orderProducts.map((orderProducts) => (
            <div
              key={orderProducts.id}
              className="my-1 flex items-center gap-2"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white">
                {orderProducts.quantity}
              </div>

              {/* Nome do produto */}
              <p className="text-sm">{orderProducts.product.name}</p>
            </div>
          ))}
          <Separator />

          {/* Preço */}
          <p className="mt-2 text-lg font-bold">
            {FormatCurrency(order.total)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
