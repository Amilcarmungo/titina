import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import {
  ChevronRight,
  QrCode,
  ArrowUp,
  Check,
  Copy,
  Share2,
  UserPlus,
} from "lucide-react";
import { actions, useStore } from "@/lib/store";
import { toast } from "sonner";
import {
  activeSignInMethods,
  authErrorMessage,
  ensurePasswordMethod,
  linkGoogleToCurrentAccount,
} from "@/lib/firebase/auth";
import { referralLink, POINTS_PER_REFERRAL } from "@/lib/firebase/referrals";
import { usePointsState } from "@/lib/points";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Configurações — Bazarixy" },
      { name: "description", content: "Configurações da sua conta Bazarixy." },
    ],
  }),
  component: SettingsPage,
});

type Item = {
  label: string;
  right?: React.ReactNode;
  to?: string;
  onClick?: () => void;
};

function Row({ label, right, to, onClick }: Item) {
  const inner = (
    <div className="flex items-center justify-between bg-white px-4 py-4">
      <span className="text-[15px] text-foreground">{label}</span>
      <div className="flex items-center gap-1.5 text-muted-foreground">
        {right}
        <ChevronRight className="h-4 w-4" />
      </div>
    </div>
  );
  if (to) return <Link to={to}>{inner}</Link>;
  return (
    <button onClick={onClick} className="block w-full text-left">
      {inner}
    </button>
  );
}

function Section({ title, items }: { title: string; items: Item[] }) {
  return (
    <div className="mt-2">
      <h2 className="bg-muted/40 px-4 py-3 text-[15px] font-bold">{title}</h2>
      <div className="divide-y divide-border">
        {items.map((it) => (
          <Row key={it.label} {...it} />
        ))}
      </div>
    </div>
  );
}

function Picker({
  open,
  title,
  options,
  value,
  onSelect,
  onClose,
}: {
  open: boolean;
  title: string;
  options: string[];
  value: string;
  onSelect: (v: string) => void;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 md:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-t-2xl bg-white md:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 py-3 text-center text-sm font-bold border-b border-border">
          {title}
        </div>
        <div className="max-h-[60vh] overflow-y-auto">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onSelect(opt);
                onClose();
              }}
              className="flex w-full items-center justify-between px-4 py-3 text-left text-sm hover:bg-muted/50"
            >
              <span>{opt}</span>
              {value === opt && <Check className="h-4 w-4 text-gold" />}
            </button>
          ))}
        </div>
        <button
          onClick={onClose}
          className="w-full py-3 text-sm font-semibold text-muted-foreground border-t border-border"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

function PasswordDialog({
  open,
  hasPassword,
  onClose,
}: {
  open: boolean;
  hasPassword: boolean;
  onClose: () => void;
}) {
  const [pw, setPw] = useState("");
  const [busy, setBusy] = useState(false);
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 md:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-t-2xl bg-white p-5 md:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-display text-lg font-black">
          {hasPassword ? "Alterar senha" : "Adicionar senha"}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          O login com Google continua activo. Poderá entrar com qualquer um dos
          métodos.
        </p>
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="Nova senha (mínimo 8 caracteres)"
          className="mt-4 w-full border border-border bg-transparent px-3 py-2.5 text-sm outline-none focus:border-gold"
        />
        <button
          disabled={busy || pw.length < 8}
          onClick={async () => {
            setBusy(true);
            try {
              await ensurePasswordMethod(pw);
              toast.success(
                hasPassword
                  ? "Senha actualizada"
                  : "Senha adicionada à sua conta",
              );
              onClose();
            } catch (err) {
              toast.error(authErrorMessage(err));
            } finally {
              setBusy(false);
            }
          }}
          className="mt-3 w-full bg-foreground py-3 text-sm font-bold text-background disabled:opacity-50"
        >
          {busy ? "A guardar…" : "Guardar"}
        </button>
        <button
          onClick={onClose}
          className="mt-2 w-full py-2 text-sm font-semibold text-muted-foreground"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

function SettingsPage() {
  const { user } = useStore();
  const router = useRouter();
  const username =
    user?.name?.trim() || user?.email?.split("@")[0] || "convidado";
  const [currency, setCurrency] = useState("KZ");
  const [language, setLanguage] = useState("Português");
  const [pickCurrency, setPickCurrency] = useState(false);
  const [pickLanguage, setPickLanguage] = useState(false);
  const [methods, setMethods] = useState({ password: false, google: false });
  const [pwOpen, setPwOpen] = useState(false);
  const { referrals } = usePointsState();
  const link = user?.uid ? referralLink(user.uid) : "";

  useEffect(() => {
    if (user) setMethods(activeSignInMethods());
    else setMethods({ password: false, google: false });
  }, [user, pwOpen]);

  const notImpl = () => toast.success("Em breve");

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(link);
      toast.success("Link de convite copiado");
    } catch {
      toast.error("Não foi possível copiar");
    }
  }

  async function shareLink() {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await (navigator as Navigator).share({
          title: "Bazarixy",
          text: "Compra na Bazarixy com o meu convite:",
          url: link,
        });
        return;
      } catch {
        /* cancelado */
      }
    }
    void copyLink();
  }

  return (
    <Layout simpleHeader hideBottomNav>
      <div className="md:max-w-2xl md:mx-auto md:my-6 md:rounded-2xl md:overflow-hidden md:shadow-[var(--shadow-card)] md:bg-white">
        <button
          className="flex w-full items-center justify-between bg-white px-4 py-5"
          onClick={notImpl}
        >
          <span className="text-lg font-bold truncate">{username}</span>
          <div className="flex items-center gap-1.5 text-muted-foreground shrink-0">
            <QrCode className="h-5 w-5" />
            <ChevronRight className="h-4 w-4" />
          </div>
        </button>

        {/* Convidar amigo */}
        <div className="mt-2 bg-white px-4 py-4">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gold/15 text-gold">
              <UserPlus className="h-4.5 w-4.5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-bold">Convidar amigo</p>
              <p className="text-xs text-muted-foreground">
                {POINTS_PER_REFERRAL} pontos por amigo · {referrals}{" "}
                convidado(s)
              </p>
            </div>
            <Link
              to="/points"
              className="shrink-0 text-xs font-bold text-brand-strong"
            >
              Ver pontos
            </Link>
          </div>
          {user ? (
            <>
              <div className="mt-3 flex items-center gap-2 border border-border bg-muted/40 px-3 py-2">
                <p className="min-w-0 flex-1 truncate text-xs text-muted-foreground">
                  {link}
                </p>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button
                  onClick={shareLink}
                  className="inline-flex items-center justify-center gap-2 bg-gold px-3 py-2.5 text-xs font-bold text-white"
                >
                  <Share2 className="h-3.5 w-3.5" /> Partilhar
                </button>
                <button
                  onClick={copyLink}
                  className="inline-flex items-center justify-center gap-2 border border-border px-3 py-2.5 text-xs font-bold"
                >
                  <Copy className="h-3.5 w-3.5" /> Copiar link
                </button>
              </div>
            </>
          ) : (
            <Link
              to="/auth"
              className="mt-3 block bg-foreground py-2.5 text-center text-xs font-bold text-background"
            >
              Entrar para receber o meu link
            </Link>
          )}
        </div>

        {/* Métodos de entrada */}
        <Section
          title="Formas de entrar"
          items={
            user
              ? [
                  {
                    label: methods.password
                      ? "Senha (activa) — alterar"
                      : "Adicionar senha",
                    right: (
                      <span
                        className={methods.password ? "text-emerald-600" : ""}
                      >
                        {methods.password ? "Activa" : "Inactiva"}
                      </span>
                    ),
                    onClick: () => setPwOpen(true),
                  },
                  {
                    label: methods.google
                      ? "Google (activo)"
                      : "Ligar conta Google",
                    right: (
                      <span
                        className={methods.google ? "text-emerald-600" : ""}
                      >
                        {methods.google ? "Activo" : "Inactivo"}
                      </span>
                    ),
                    onClick: async () => {
                      if (methods.google) {
                        toast.success("O Google já está ligado a esta conta");
                        return;
                      }
                      try {
                        await linkGoogleToCurrentAccount();
                        setMethods(activeSignInMethods());
                        toast.success(
                          "Google ligado — pode entrar com Google ou senha",
                        );
                      } catch (err) {
                        toast.error(authErrorMessage(err));
                      }
                    },
                  },
                ]
              : [{ label: "Entrar na minha conta", to: "/auth" }]
          }
        />

        <Section
          title="Configurações"
          items={[
            { label: "Livro de endereços", onClick: notImpl },
            {
              label: "Alterar moeda",
              right: <span>{currency}</span>,
              onClick: () => setPickCurrency(true),
            },
            {
              label: "Alterar idioma",
              right: <span>{language}</span>,
              onClick: () => setPickLanguage(true),
            },
            { label: "Meus pontos e convites", to: "/points" },
            { label: "Meus cupões", to: "/coupons" },
            {
              label: "Meus pedidos",
              onClick: () =>
                router.navigate({ to: "/orders", search: { tab: "unpaid" } }),
            },
            { label: "Preferências de contato", onClick: notImpl },
            { label: "Acessibilidade", onClick: notImpl },
          ]}
        />

        <Section
          title="Informações"
          items={[
            { label: "Informações de envio", onClick: notImpl },
            { label: "Política de devolução", onClick: notImpl },
            { label: "Escolha de anúncios", onClick: notImpl },
            { label: "Reembolso", onClick: notImpl },
            { label: "Métodos de pagamento", onClick: notImpl },
            { label: "Sobre a Carteira Bazarixy", onClick: notImpl },
            { label: "Política de pontos bônus", onClick: notImpl },
            { label: "Política de cupons", onClick: notImpl },
            { label: "Termos e condições Bazarixy VIP", onClick: notImpl },
            { label: "Guia de avaliações", onClick: notImpl },
            { label: "Cartão-presente", onClick: notImpl },
            { label: "Como rastrear meu pedido", onClick: notImpl },
            { label: "Como fazer um pedido", onClick: notImpl },
            { label: "Central de privacidade", onClick: notImpl },
            { label: "Termos e condições", onClick: notImpl },
            { label: "Sobre nós", onClick: notImpl },
            { label: "Responsabilidade social", onClick: notImpl },
            { label: "Acessibilidade", onClick: notImpl },
            { label: "Ficha técnica", onClick: notImpl },
          ]}
        />

        <div className="mt-2">
          <button
            className="flex w-full items-center justify-between bg-white px-4 py-4"
            onClick={notImpl}
          >
            <span className="text-[15px]">Trocar de conta</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
          <div className="mt-2 relative">
            <button
              onClick={() => {
                actions.signOut();
                toast.success("Sessão encerrada");
                router.navigate({ to: "/" });
              }}
              className="block w-full bg-white px-4 py-4 text-left text-[15px]"
            >
              Sair
            </button>
            <button
              aria-label="Voltar ao topo"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="absolute right-3 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full border border-border bg-white text-muted-foreground"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="h-8" />
      </div>

      <Picker
        open={pickCurrency}
        title="Alterar moeda"
        options={["KZ", "USD", "EUR", "BRL"]}
        value={currency}
        onSelect={setCurrency}
        onClose={() => setPickCurrency(false)}
      />
      <Picker
        open={pickLanguage}
        title="Alterar idioma"
        options={["Português", "English", "Español", "Français"]}
        value={language}
        onSelect={setLanguage}
        onClose={() => setPickLanguage(false)}
      />
      <PasswordDialog
        open={pwOpen}
        hasPassword={methods.password}
        onClose={() => setPwOpen(false)}
      />
    </Layout>
  );
}
