import { productById } from "./catalogo";
import type { PreOrderItem, Product } from "./types";

export const PRICE_NOTICE =
  "Valores ilustrativos, sem imposto e sem frete. Não são a tabela da EGAPLAST.";

export function formatBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

export function referenceLabel(product?: Product) {
  if (!product || product.references.length === 0) return "Código pendente";
  return `Ref. ${product.references.join(" / ")}`;
}

export function itemTotal(item: PreOrderItem, product?: Product | null) {
  const resolved = product === undefined ? productById(item.productId) : product;
  return (resolved?.precoDemonstracao ?? 0) * item.quantity;
}

export function itemsTotal(
  items: PreOrderItem[],
  resolve?: (productId: string) => Product | undefined,
) {
  return items.reduce((sum, item) => {
    if (!resolve) return sum + itemTotal(item);
    return sum + itemTotal(item, resolve(item.productId) ?? null);
  }, 0);
}
