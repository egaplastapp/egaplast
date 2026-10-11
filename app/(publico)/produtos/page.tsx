import Link from "next/link";
import { categories, productsByCategory } from "@/lib/catalogo";

export const metadata = { title: "Produtos" };

export default function ProductsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-navy">Produtos</h1>
      <p className="mt-3 max-w-3xl text-ink">
        Catálogo de demonstração com as linhas da home. O preço fica sob consulta. Códigos e medidas só
        aparecem quando já estavam publicados no guia ou no índice do site.
      </p>
      <ul className="mt-8 grid gap-4">
        {categories.map((category) => {
          const count = productsByCategory(category.id).length;
          return (
            <li key={category.id}>
              <Link href={`/produtos/${category.slug}`} className="flex items-center justify-between gap-4 border border-line p-4 hover:border-navy">
                <span>
                  <span className="block font-semibold text-navy">{category.name}</span>
                  <span className="mt-1 block text-sm text-ink">{category.application}</span>
                </span>
                <span className="shrink-0 text-sm text-muted">{count} fichas de exemplo</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
