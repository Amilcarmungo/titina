import { useEffect, useMemo, useState } from "react";
import { X, Minus, Plus, Check } from "lucide-react";
import { formatKz } from "@/lib/format";
import { colorName } from "@/lib/colors";
import type { Product } from "@/lib/products";
import { SmartImage } from "@/components/SmartImage";

export type ChosenOptions = {
  size: string;
  color: string;
  qty: number;
  variantId?: string;
  variantLabel?: string;
  unitPrice: number;
  image: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  product: Product;
  mode: "cart" | "buy";
  onConfirm: (opts: ChosenOptions) => void;
};

/** Bottom sheet used on the product page to pick colour / size / quantity before adding to the cart. */
export function ProductOptionsSheet({
  open,
  onClose,
  product,
  mode,
  onConfirm,
}: Props) {
  const variants = product.variants ?? [];
  const [variantId, setVariantId] = useState<string | undefined>(
    variants[0]?.id,
  );
  const [color, setColor] = useState(product.colors[0] ?? "");
  const [size, setSize] = useState(product.sizes[0] ?? "");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (!open) return;
    setVariantId(variants[0]?.id);
    setColor(product.colors[0] ?? "");
    setSize(
      (variants[0]?.sizes?.length ? variants[0].sizes[0] : product.sizes[0]) ??
        "",
    );
    setQty(1);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, product.id]);

  const variant = useMemo(
    () => variants.find((v) => v.id === variantId),
    [variants, variantId],
  );
  const unitPrice = variant?.price ?? product.price;
  const oldPrice = variant?.oldPrice ?? product.oldPrice;
  const image = variant?.image || product.image;
  const activeColor = variant?.color ?? color;
  const sizeList = variant?.sizes?.length ? variant.sizes : product.sizes;
  const extraPhotos = variant?.images ?? [];

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center md:items-center"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div className="relative flex max-h-[88vh] w-full max-w-lg flex-col rounded-t-3xl bg-background shadow-2xl duration-300 animate-in slide-in-from-bottom md:rounded-3xl md:zoom-in-95">
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-muted/80 backdrop-blur"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header preview */}
        <div className="flex gap-3 border-b border-border p-4 pr-14">
          <SmartImage
            src={image}
            alt={product.name}
            rounded="rounded-xl"
            wrapperClassName="h-24 w-24 shrink-0 ring-1 ring-border"
            className="object-cover"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-black text-sale">
                {formatKz(unitPrice)}
              </span>
              {oldPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatKz(oldPrice)}
                </span>
              )}
            </div>
            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
              {product.name}
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              {variant?.label || colorName(activeColor)}
              {size ? ` · ${size}` : ""}
            </p>
          </div>
        </div>

        {/* Options */}
        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-4">
          {variants.length > 0 && (
            <section>
              <p className="text-xs text-muted-foreground">
                Opção:{" "}
                <span className="font-bold text-foreground">
                  {variant?.label || colorName(variant?.color) || "Padrão"}
                </span>
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setVariantId(v.id)}
                    className={`flex items-center gap-2 rounded-xl border-2 p-1 pr-3 text-xs font-bold transition ${
                      variantId === v.id
                        ? "border-brand-strong bg-brand/15"
                        : "border-border hover:border-foreground/40"
                    }`}
                  >
                    <SmartImage
                      src={v.image || product.image}
                      alt={v.label || colorName(v.color)}
                      rounded="rounded-lg"
                      wrapperClassName="h-10 w-10"
                      className="object-cover"
                    />
                    <span className="max-w-[110px] truncate">
                      {v.label || colorName(v.color) || "Padrão"}
                    </span>
                  </button>
                ))}
              </div>
              {extraPhotos.length > 0 && (
                <div className="no-scrollbar mt-2 flex gap-2 overflow-x-auto">
                  {[variant?.image, ...extraPhotos]
                    .filter(Boolean)
                    .map((src, i) => (
                      <SmartImage
                        key={i}
                        src={src as string}
                        alt={product.name}
                        rounded="rounded-lg"
                        wrapperClassName="h-14 w-14 shrink-0 ring-1 ring-border"
                        className="object-cover"
                      />
                    ))}
                </div>
              )}
            </section>
          )}

          {variants.length === 0 && product.colors.length > 0 && (
            <section>
              <p className="text-xs text-muted-foreground">
                Cor:{" "}
                <span className="font-bold text-foreground">
                  {colorName(color)}
                </span>
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    aria-label={colorName(c)}
                    className={`flex items-center gap-2 rounded-full border-2 py-1 pl-1 pr-3 text-xs font-semibold transition ${
                      color === c
                        ? "border-brand-strong bg-brand/15"
                        : "border-border hover:border-foreground/40"
                    }`}
                  >
                    <SmartImage
                      src={
                        product.images?.[product.colors.indexOf(c)] ||
                        product.image
                      }
                      alt={colorName(c)}
                      rounded="rounded-lg"
                      wrapperClassName="h-7 w-7 shrink-0 ring-1 ring-border"
                      className="object-cover"
                    />
                    {colorName(c)}
                  </button>
                ))}
              </div>
            </section>
          )}

          {sizeList.length > 0 && (
            <section>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  Tamanho:{" "}
                  <span className="font-bold text-foreground">{size}</span>
                </p>
                <span className="text-[11px] text-muted-foreground">
                  Guia de tamanhos
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {sizeList.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`min-w-14 rounded-full border-2 px-4 py-2 text-sm font-semibold transition ${
                      size === s
                        ? "border-brand-strong bg-brand text-brand-foreground"
                        : "border-border hover:border-foreground/40"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </section>
          )}

          <section className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Quantidade</p>
            <div className="flex items-center rounded-full border border-border">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Diminuir"
                className="grid h-9 w-9 place-items-center"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-8 text-center text-sm font-bold">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(99, q + 1))}
                aria-label="Aumentar"
                className="grid h-9 w-9 place-items-center"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="border-t border-border p-3">
          <button
            onClick={() =>
              onConfirm({
                size,
                color: activeColor,
                qty,
                variantId: variant?.id,
                variantLabel: variant?.label,
                unitPrice,
                image,
              })
            }
            className="flex w-full items-center justify-center gap-2 rounded-full bg-brand py-3.5 text-sm font-black text-brand-foreground"
          >
            <Check className="h-4 w-4" />
            {mode === "buy" ? "Comprar agora" : "Adicionar ao carrinho"} ·{" "}
            {formatKz(unitPrice * qty)}
          </button>
        </div>
      </div>
    </div>
  );
}
