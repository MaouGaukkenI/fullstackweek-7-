import { validateCPF } from "@/helpers/cpf";
import { db } from "@/lib/prisma";

import CpfForm from "./components/cpf-form";
import OrderList from "./components/order-list";

interface OrdersPageProps {
  searchParams?: { cpf?: string };
}

// Função para normalizar CPF
const normalizeCPF = (cpf: string) => cpf.replace(/[^\d]/g, "");

const OrdersPage = async ({ searchParams }: OrdersPageProps) => {
  const cpf = searchParams?.cpf || ""; // Garante que não seja undefined
  const cleanCPF = normalizeCPF(cpf);

  if (!cleanCPF || !validateCPF(cleanCPF)) {
    return <CpfForm />;
  }

  const orders = await db.order.findMany({
    where: {
      customerCPF: cleanCPF, // CPF sem formatação
    },
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
        },
      },
      orderProducts: {
        select: {
          product: {
            select: {
              name: true,
            },
          },
          quantity: true,
          priece: true,
          id: true,
        },
      },
    },
  });

  return <OrderList orders={orders} />;
};

export default OrdersPage;
