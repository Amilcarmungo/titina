import { formatKz } from "@/lib/format";
import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import type { Product } from "@/lib/products";
import { SmartImage } from "@/components/SmartImage";

export function ProductCard({
  product,
  aspect = "aspect-[3/4]",
}: {
  product: Product;
  aspect?: string;
}) {
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  return (
    <div className="group block">
      <Link to="/product/$id" params={{ id: product.id }}>
        <SmartImage
          src={product.image}
          alt={product.name}
          rounded="rounded-lg"
          wrapperClassName={aspect}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="mt-2 px-0.5">
        <Link to="/product/$id" params={{ id: product.id }}>
          <h3 className="line-clamp-2 text-xs leading-snug text-foreground">
            {product.name}
          </h3>
        </Link>
        <div className="mt-1 flex items-baseline gap-1.5">
          <span className="text-sm font-bold text-sale">
            {formatKz(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-[11px] text-muted-foreground line-through">
              {formatKz(product.oldPrice)}
            </span>
          )}
        </div>
        {discount > 0 && (
          <span className="mt-1 inline-block rounded-sm bg-sale/10 px-1.5 py-0.5 text-[10px] font-bold text-sale">
            -{discount}%
          </span>
        )}
        <div className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
          <Star className="h-3 w-3 fill-gold text-gold" />
          <span>{product.rating}</span>
          <span>
            ·{" "}
            {product.sold > 1000
              ? `${(product.sold / 1000).toFixed(1)}k`
              : product.sold}{" "}
            vendidos
          </span>
        </div>
      </div>
    </div>
  );
}
