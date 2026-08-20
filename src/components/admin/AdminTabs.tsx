import type { ReactNode } from "react";

type Tab = {
  id: string;
  label: string;
  icon?: ReactNode;
  badge?: string | number;
};

export function AdminTabs({
  tabs,
  active,
  onChange,
}: {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex gap-1 overflow-x-auto no-scrollbar border-b border-border">
      {tabs.map((t) => {
        const on = t.id === active;
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={`relative inline-flex items-center gap-2 whitespace-nowrap px-4 py-2.5 text-sm font-bold transition ${on ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            {t.icon}
            {t.label}
            {t.badge !== undefined && (
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${on ? "bg-foreground text-background" : "bg-muted text-muted-foreground"}`}
              >
                {t.badge}
              </span>
            )}
            {on && (
              <span className="absolute -bottom-px left-2 right-2 h-0.5 rounded-full bg-foreground" />
            )}
          </button>
        );
      })}
    </div>
  );
}
