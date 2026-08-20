import dress from "@/assets/p-dress.jpg";
import top from "@/assets/p-top.jpg";
import pants from "@/assets/p-pants.jpg";
import jeans from "@/assets/p-jeans.jpg";
import swim from "@/assets/p-swim.jpg";
import tank from "@/assets/p-tank.jpg";
import skirt from "@/assets/p-skirt.jpg";
import jumpsuit from "@/assets/p-jumpsuit.jpg";
import reddress from "@/assets/p-reddress.jpg";
import knit from "@/assets/p-knit.jpg";
import lipstick from "@/assets/p-lipstick.jpg";
import perfume from "@/assets/p-perfume.jpg";
import cream from "@/assets/p-cream.jpg";
import brushes from "@/assets/p-brushes.jpg";
import catEletronicos from "@/assets/cat-eletronicos.jpg";
import catCasa from "@/assets/cat-casa.jpg";
import catBeleza from "@/assets/cat-beleza.jpg";
import catOutros from "@/assets/cat-outros.jpg";

export type ProductVariant = {
  id: string;
  label: string;
  color?: string;
  price: number;
  oldPrice?: number;
  /** Cover photo shown on the colour/detail swatch. */
  image?: string;
  /** Up to 3 extra photos of this exact variant. */
  images?: string[];
  /** Sizes available for this variant only (falls back to the product sizes). */
  sizes?: string[];
  stock?: number;
  sku?: string;
};


export type ProductAttribute = { name: string; values: string[] };

export type Product = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  images?: string[];
  variants?: ProductVariant[];
  attributes?: ProductAttribute[];
  brand?: string;
  sku?: string;
  stock?: number;
  category: string;
  subcategory?: string;
  shopId?: string;
  rating: number;
  reviews: number;
  sold: number;
  colors: string[];
  sizes: string[];
  description: string;
};


/** Catálogo de demonstração — usado apenas para semear o banco a partir do painel. */
export const seedProducts: Product[] = [
  { id: "1", name: "Vestido Midi Elegante Preto", price: 89.9, oldPrice: 159.9, image: dress, category: "dresses", rating: 4.8, reviews: 1248, sold: 3200, colors: ["#000", "#7a2828", "#1a3a5a"], sizes: ["P","M","G","GG"], description: "Vestido midi preto com fenda lateral, tecido fluido e caimento perfeito. Ideal para ocasiões especiais." },
  { id: "2", name: "Blusa Manga Bufante Off-White", price: 49.9, oldPrice: 79.9, image: top, category: "tops", rating: 4.7, reviews: 892, sold: 2100, colors: ["#f5f0e6", "#000", "#c9a4a4"], sizes: ["PP","P","M","G"], description: "Blusa romântica com mangas bufantes e decote V. Tecido leve e respirável." },
  { id: "3", name: "Calça Cargo Bege Premium", price: 119.9, oldPrice: 199.9, image: pants, category: "pants", rating: 4.6, reviews: 654, sold: 1850, colors: ["#c9b48a", "#2e2e2e", "#5a4a3a"], sizes: ["36","38","40","42","44"], description: "Calça cargo bege com bolsos funcionais e ajuste confortável." },
  { id: "4", name: "Calça Jeans Reta Vintage", price: 99.9, oldPrice: 169.9, image: jeans, category: "denim", rating: 4.9, reviews: 2103, sold: 5400, colors: ["#4a6b8a", "#2a3a5a"], sizes: ["36","38","40","42"], description: "Jeans reto vintage com lavagem clara e detalhes destroyed." },
  { id: "5", name: "Maiô Floral Tropical", price: 79.9, oldPrice: 129.9, image: swim, category: "swim", rating: 4.7, reviews: 543, sold: 1320, colors: ["#c63950"], sizes: ["P","M","G"], description: "Maiô estampa floral, modelagem alta e bojo removível." },
  { id: "6", name: "Regata Básica Verde Esmeralda", price: 29.9, oldPrice: 49.9, image: tank, category: "tops", rating: 4.5, reviews: 1876, sold: 4200, colors: ["#1f8a4a", "#000", "#fff", "#c63950"], sizes: ["PP","P","M","G","GG"], description: "Regata básica em malha premium, caimento solto e confortável." },
  { id: "7", name: "Saia Mini Godê Preta", price: 59.9, oldPrice: 99.9, image: skirt, category: "skirts", rating: 4.6, reviews: 721, sold: 1980, colors: ["#000"], sizes: ["P","M","G"], description: "Saia mini godê preta com forro interno. Versátil para o dia ou noite." },
  { id: "8", name: "Macacão Verde Militar", price: 139.9, oldPrice: 229.9, image: jumpsuit, category: "jumpsuits", rating: 4.8, reviews: 432, sold: 1050, colors: ["#6b7a3a", "#2e2e2e"], sizes: ["P","M","G","GG"], description: "Macacão longo verde militar com cinto removível e pernas amplas." },
  { id: "9", name: "Vestido Renda Vermelho Midi", price: 159.9, oldPrice: 279.9, image: reddress, category: "dresses", rating: 4.9, reviews: 1542, sold: 2870, colors: ["#c63950", "#000"], sizes: ["P","M","G"], description: "Vestido em renda vermelha sofisticada, perfeito para eventos." },
  { id: "10", name: "Cardigan Tricô Bege Oversized", price: 109.9, oldPrice: 179.9, image: knit, category: "knit", rating: 4.7, reviews: 980, sold: 2400, colors: ["#d4c4a8", "#2e2e2e", "#a4a4a4"], sizes: ["Único"], description: "Cardigan oversized em tricô premium, super confortável." },
  { id: "11", name: "Batom Matte Rosa Luxo", price: 24.9, oldPrice: 44.9, image: lipstick, category: "beleza", rating: 4.9, reviews: 2140, sold: 6800, colors: ["#c9364d", "#b8425c", "#8a2d3f"], sizes: ["Único"], description: "Batom matte de longa duração com pigmentação intensa. Acabamento aveludado." },
  { id: "12", name: "Perfume Floral Rose 100ml", price: 189.9, oldPrice: 299.9, image: perfume, category: "beleza", rating: 4.8, reviews: 1560, sold: 3120, colors: ["#f2c6d4"], sizes: ["100ml"], description: "Fragrância floral sofisticada com notas de rosa, jasmim e âmbar." },
  { id: "13", name: "Creme Facial Hidratante Gold", price: 79.9, oldPrice: 129.9, image: cream, category: "beleza", rating: 4.7, reviews: 987, sold: 2450, colors: ["#f5efe0"], sizes: ["50g"], description: "Creme hidratante premium com fórmula anti-idade e efeito iluminador." },
  { id: "14", name: "Kit Pincéis Rose Gold 5pçs", price: 59.9, oldPrice: 99.9, image: brushes, category: "beleza", rating: 4.9, reviews: 1820, sold: 4310, colors: ["#c9a898"], sizes: ["Kit 5"], description: "Kit profissional com 5 pincéis de maquiagem em rose gold. Cerdas ultra macias." },
];

export type Category = { slug: string; name: string; image?: string; emoji?: string };

/** Categorias de demonstração — usadas apenas para semear o banco. */
export const seedCategories: Category[] = [
  { slug: "dresses", name: "Vestidos", image: dress },
  { slug: "tops", name: "Blusas", image: top },
  { slug: "pants", name: "Calças", image: pants },
  { slug: "denim", name: "Jeans", image: jeans },
  { slug: "swim", name: "Praia", image: swim },
  { slug: "skirts", name: "Saias", image: skirt },
  { slug: "jumpsuits", name: "Macacões", image: jumpsuit },
  { slug: "knit", name: "Tricô", image: knit },
  { slug: "beleza", name: "Beleza", image: catBeleza },
  { slug: "eletronicos", name: "Eletrônicos", image: catEletronicos },
  { slug: "casa", name: "Casa", image: catCasa },
  { slug: "outros", name: "Outros", image: catOutros },
];

/**
 * O catálogo real vive no banco de dados (Firestore). Estes arrays ficam
 * vazios de propósito: nenhuma tela deve mostrar produtos/categorias
 * fictícios enquanto os dados reais estão a carregar.
 */
export const products: Product[] = [];
export const categories: Category[] = [];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}
