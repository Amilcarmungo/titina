export type ColorOption = { name: string; hex: string };

/** Curated global colour palette — used by the admin picker and the storefront. */
export const COLOR_PALETTE: ColorOption[] = [
  { name: "Preto", hex: "#000000" },
  { name: "Branco", hex: "#ffffff" },
  { name: "Cinzento", hex: "#9ca3af" },
  { name: "Prateado", hex: "#c0c0c0" },
  { name: "Dourado", hex: "#d4af37" },
  { name: "Bege", hex: "#e3d5b8" },
  { name: "Castanho", hex: "#7a4b2a" },
  { name: "Vermelho", hex: "#dc2626" },
  { name: "Bordô", hex: "#7a1f2b" },
  { name: "Rosa", hex: "#f472b6" },
  { name: "Rosa claro", hex: "#fbcfe8" },
  { name: "Laranja", hex: "#f97316" },
  { name: "Amarelo", hex: "#facc15" },
  { name: "Verde", hex: "#16a34a" },
  { name: "Verde-menta", hex: "#5eead4" },
  { name: "Verde militar", hex: "#4d5d3a" },
  { name: "Azul", hex: "#2563eb" },
  { name: "Azul-claro", hex: "#7dd3fc" },
  { name: "Azul-marinho", hex: "#1e3a5f" },
  { name: "Roxo", hex: "#7c3aed" },
  { name: "Lilás", hex: "#c4b5fd" },
  { name: "Transparente", hex: "#f8fafc" },
];

const byHex = new Map(COLOR_PALETTE.map((c) => [c.hex.toLowerCase(), c.name]));

function expand(hex: string) {
  const h = hex.trim().toLowerCase();
  if (/^#[0-9a-f]{3}$/.test(h))
    return `#${h[1]}${h[1]}${h[2]}${h[2]}${h[3]}${h[3]}`;
  return h;
}

/** Human label for a stored colour value (hex or free text). */
export function colorName(value?: string) {
  if (!value) return "";
  const v = expand(value);
  return byHex.get(v) ?? (v.startsWith("#") ? "Cor" : value);
}

/** A CSS-usable colour for a stored value. */
export function colorSwatch(value?: string) {
  if (!value) return "transparent";
  if (value.startsWith("#") || value.startsWith("rgb")) return value;
  const found = COLOR_PALETTE.find(
    (c) => c.name.toLowerCase() === value.toLowerCase(),
  );
  return found?.hex ?? value;
}
