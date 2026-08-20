import { useEffect, useState } from "react";
import { ImageOff } from "lucide-react";

type Props = {
  src?: string | null;
  alt: string;
  /** Classes aplicadas à imagem (o wrapper reserva o espaço). */
  className?: string;
  /** Classes do contentor — use aspect-* / h-* para reservar o espaço e evitar CLS. */
  wrapperClassName?: string;
  eager?: boolean;
  draggable?: boolean;
  rounded?: string;
};

/**
 * Imagem com Skeleton/Shimmer enquanto carrega.
 * - o esqueleto fica visível até o `onLoad` confirmar o carregamento total;
 * - se falhar, mostra um estado elegante em vez do ícone quebrado do browser;
 * - fade-in suave ao aparecer e `loading="lazy"` por omissão.
 */
/**
 * Cache inteligente de imagens já carregadas.
 * Uma imagem vista antes nesta sessão aparece de imediato (sem shimmer nem
 * novo pedido), evitando o "recarregar" constante ao navegar entre páginas.
 */
const LOADED_KEY = "img_cache_v1";
const loaded = new Set<string>(
  (() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(sessionStorage.getItem(LOADED_KEY) || "[]") as string[];
    } catch {
      return [];
    }
  })(),
);
function rememberLoaded(src: string) {
  if (loaded.has(src)) return;
  loaded.add(src);
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(LOADED_KEY, JSON.stringify([...loaded].slice(-400)));
  } catch {
    /* quota */
  }
}

export function SmartImage({
  src,
  alt,
  className = "",
  wrapperClassName = "",
  eager,
  draggable,
  rounded = "",
}: Props) {
  // Sem `src` ainda (dados a chegar do banco) → apenas esqueleto, nunca erro.
  const [state, setState] = useState<"loading" | "ready" | "error">(() =>
    src && loaded.has(src) ? "ready" : "loading",
  );

  useEffect(() => {
    if (src && loaded.has(src)) {
      setState("ready");
      return;
    }
    setState("loading");
  }, [src]);

  return (
    <div
      className={`relative overflow-hidden bg-muted ${rounded} ${wrapperClassName}`}
    >
      {state !== "ready" && (
        <div className={`absolute inset-0 shimmer ${rounded}`} aria-hidden />
      )}
      {state === "error" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-muted-foreground">
          <ImageOff className="h-4 w-4 opacity-60" />
        </div>
      )}
      {src && state !== "error" && (
        <img
          src={src}
          alt={alt}
          draggable={draggable}
          loading={eager ? "eager" : "lazy"}
          decoding={eager ? "sync" : "async"}
          fetchPriority={eager ? "high" : "auto"}
          onLoad={() => {
            rememberLoaded(src);
            setState("ready");
          }}
          onError={() => setState("error")}

          className={`h-full w-full transition-opacity duration-500 ${state === "ready" ? "opacity-100" : "opacity-0"} ${className}`}
        />
      )}
    </div>
  );
}

/** Bloco de esqueleto genérico para textos, cartões e listas. */
export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`shimmer rounded-md ${className}`} aria-hidden />;
}
