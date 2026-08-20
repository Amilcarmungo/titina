/**
 * Folha de partilha — abre por baixo no mobile (bottom sheet) e como cartão
 * centrado no desktop. Usa sempre o link canónico de bazarixy.com.
 */
import { useEffect, useState } from "react";
import { Check, Copy, Link2, Mail, MessageCircle, Send, Share2, X } from "lucide-react";
import { toast } from "sonner";

export type ShareTarget = { url: string; title: string; text?: string; image?: string };

function encode(v: string) {
  return encodeURIComponent(v);
}

const NETWORKS = (t: ShareTarget) => {
  const msg = `${t.text ?? t.title} ${t.url}`;
  return [
    { key: "whatsapp", label: "WhatsApp", tint: "bg-[#25D366] text-white", Icon: MessageCircle, href: `https://wa.me/?text=${encode(msg)}` },
    { key: "facebook", label: "Facebook", tint: "bg-[#1877F2] text-white", Icon: Share2, href: `https://www.facebook.com/sharer/sharer.php?u=${encode(t.url)}` },
    { key: "telegram", label: "Telegram", tint: "bg-[#229ED9] text-white", Icon: Send, href: `https://t.me/share/url?url=${encode(t.url)}&text=${encode(t.text ?? t.title)}` },
    { key: "x", label: "X", tint: "bg-foreground text-background", Icon: Share2, href: `https://twitter.com/intent/tweet?url=${encode(t.url)}&text=${encode(t.text ?? t.title)}` },
    { key: "email", label: "Email", tint: "bg-muted text-foreground", Icon: Mail, href: `mailto:?subject=${encode(t.title)}&body=${encode(msg)}` },
  ];
};

/** Abre a partilha nativa quando existe; caso contrário devolve false. */
export async function nativeShare(t: ShareTarget): Promise<boolean> {
  if (typeof navigator === "undefined" || !("share" in navigator)) return false;
  try {
    await (navigator as Navigator).share({ title: t.title, text: t.text, url: t.url });
    return true;
  } catch {
    return false;
  }
}

export function ShareSheet({ open, onClose, target }: { open: boolean; onClose: () => void; target: ShareTarget }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(target.url);
      setCopied(true);
      toast.success("Link copiado");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Não foi possível copiar");
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-end justify-center bg-black/50 backdrop-blur-[2px] animate-fade-in md:items-center" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-t-3xl bg-background p-5 pb-7 shadow-2xl animate-slide-in-bottom md:rounded-3xl md:pb-5"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Partilhar"
      >
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-border md:hidden" />
        <div className="flex items-start gap-3">
          {target.image && (
            <img src={target.image} alt="" className="h-14 w-14 shrink-0 rounded-xl object-cover" />
          )}
          <div className="min-w-0 flex-1">
            <p className="font-display text-base font-black leading-tight">Partilhar</p>
            <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{target.title}</p>
          </div>
          <button onClick={onClose} aria-label="Fechar" className="rounded-full p-1.5 hover:bg-muted"><X className="h-4 w-4" /></button>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
          {NETWORKS(target).map(({ key, label, tint, Icon, href }) => (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex flex-col items-center gap-1.5"
            >
              <span className={`grid h-12 w-12 place-items-center rounded-full ${tint}`}>
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-[11px] font-semibold text-muted-foreground">{label}</span>
            </a>
          ))}
          <button onClick={copy} className="flex flex-col items-center gap-1.5">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-gold text-white">
              {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
            </span>
            <span className="text-[11px] font-semibold text-muted-foreground">{copied ? "Copiado" : "Copiar"}</span>
          </button>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-xl border border-border bg-muted/40 px-3 py-2.5">
          <Link2 className="h-4 w-4 shrink-0 text-muted-foreground" />
          <p className="min-w-0 flex-1 truncate text-xs text-muted-foreground">{target.url}</p>
        </div>
      </div>
    </div>
  );
}

/** Hook simples: partilha nativa no telemóvel, folha de opções quando não há. */
export function useShare(target: ShareTarget) {
  const [open, setOpen] = useState(false);
  const share = async () => {
    if (await nativeShare(target)) return;
    setOpen(true);
  };
  return { open, setOpen, share, sheet: <ShareSheet open={open} onClose={() => setOpen(false)} target={target} /> };
}
