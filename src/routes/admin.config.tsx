import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { useHomeConfig, homeConfigActions } from "@/lib/home-config";
import { categoryActions } from "@/lib/categories-store";
import { productActions } from "@/lib/products-store";
import { seedProducts } from "@/lib/products";

export const Route = createFileRoute("/admin/config")({
  component: ConfigPage,
});

function ConfigPage() {
  const cfg = useHomeConfig();

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-2xl font-black">Configurações</h1>
        <p className="text-xs text-muted-foreground">Preferências gerais da loja.</p>
      </div>

      <section className="rounded-2xl bg-background p-5 shadow-[var(--shadow-card)] space-y-3">
        <label className="block">
          <span className="text-xs font-semibold">Nome da loja</span>
          <input value={cfg.storeName} onChange={(e) => homeConfigActions.update({ storeName: e.target.value })}
            className="mt-1 w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm outline-none" />
        </label>
        <label className="block">
          <span className="text-xs font-semibold">Moeda</span>
          <input value={cfg.currency} onChange={(e) => homeConfigActions.update({ currency: e.target.value })}
            className="mt-1 w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm outline-none" />
        </label>
      </section>

      <section className="rounded-2xl bg-background p-5 shadow-[var(--shadow-card)] space-y-3">
        <h2 className="text-sm font-black">Dados de demonstração</h2>
        <p className="text-xs text-muted-foreground">
          O site mostra apenas o que existe no banco de dados. Use estes botões para semear
          exemplos e depois editá-los em Produtos e Categorias.
        </p>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => { categoryActions.seed(); toast.success("Categorias de exemplo criadas"); }}
            className="rounded-full border border-border px-4 py-2 text-xs font-bold">Semear categorias</button>
          <button
            onClick={async () => {
              try {
                await productActions.seed(seedProducts);
                toast.success("Produtos de exemplo publicados");
              } catch (err) {
                toast.error((err as Error)?.message ?? "Não foi possível publicar");
              }
            }}
            className="rounded-full border border-border px-4 py-2 text-xs font-bold">Semear produtos</button>
          <button onClick={() => { homeConfigActions.reset(); toast.success("Home restaurada"); }}
            className="rounded-full border border-border px-4 py-2 text-xs font-bold">Restaurar home</button>
        </div>
      </section>
    </div>
  );
}
