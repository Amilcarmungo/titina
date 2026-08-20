import { toast } from "sonner";
import { Check } from "lucide-react";

/** Alerta compacto e elegante ao adicionar no carrinho — centrado e responsivo. */
export function toastAdded(label = "Adicionado") {
  toast.custom(
    () => (
      <div className="mx-auto flex w-fit max-w-[80vw] flex-col items-center gap-1.5 rounded-2xl bg-white/95 px-5 py-3 text-center shadow-[0_12px_32px_-12px_rgba(0,0,0,0.35)] ring-1 ring-black/5 backdrop-blur">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-emerald-500 shadow-[0_6px_18px_-6px_rgba(16,185,129,0.8)]">
          <Check className="h-5 w-5 text-white" strokeWidth={3} />
        </span>
        <span className="whitespace-nowrap text-[13px] font-bold text-neutral-900">
          {label}
        </span>
      </div>
    ),
    { duration: 1600 },
  );
}
