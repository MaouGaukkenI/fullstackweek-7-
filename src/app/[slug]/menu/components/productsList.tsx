import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { FormatCurrency } from "@/helpers/format_currency";

interface ProductsProps {
  products: Product[];
}

const Products = ({ products }: ProductsProps) => {
  const { slug } = useParams<{ slug: string }>();
  return (
    <div className="space-y-3 px-1.5 py-3">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/${slug}/menu/${product.id}`}
          className="flex items-center justify-between gap-10 border-b py-3"
        >
          {/* Area da esquerda */}
          <div className="pt-3 text-sm font-semibold">
            <h3 className="text-sm font-medium">{product.name}</h3>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {product.description}
            </p>
            <p>{FormatCurrency(product.price)}</p>
          </div>
          {/* Area da direita */}
          <div className="relative min-h-[82px] min-w-[120px]">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="rounded-lg object-contain"
            ></Image>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Products;
