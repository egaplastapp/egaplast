import Link from "next/link";
import { categories } from "@/lib/catalogo";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const category = categories.find((item) => item.id === product.categoryId);
  const href = category ? `/produtos/${category.slug}/${product.slug}` : "/produtos";
  const code = product.references[0] ?? "Código pendente";

  return (
    <article className="flex flex-col border border-line bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">{product.line}</p>
      <h2 className="mt-1 text-lg font-semibold text-navy">{product.name}</h2>
      <p className="mt-2 text-sm text-ink">Referência: {code}</p>
      <p className="mt-1 text-sm font-semibold text-navy">Sob consulta</p>
      {product.demonstration ? (
        <p className="mt-2 text-xs text-muted">Ficha de demonstração. Vigência a confirmar.</p>
      ) : null}
      <Link href={href} className="mt-4 text-sm font-semibold text-navy underline">
        Ver ficha
      </Link>
    </article>
  );
}
