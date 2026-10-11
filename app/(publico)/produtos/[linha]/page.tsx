import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { categories, categoryBySlug, productsByCategory } from "@/lib/catalogo";

export function generateStaticParams() {
  return categories.map((category) => ({ linha: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ linha: string }>;
}): Promise<Metadata> {
  const { linha } = await params;
  const category = categoryBySlug(linha);
  return { title: category?.name ?? "Linha" };
}

export default async function CategoryPage({ params }: { params: Promise<{ linha: string }> }) {
  const { linha } = await params;
  const category = categoryBySlug(linha);
  if (!category) notFound();
  const items = productsByCategory(category.id);

  return (
    <div>
      <p className="text-sm text-muted">
        <Link href="/produtos" className="underline">
          Produtos
        </Link>
      </p>
      <h1 className="mt-2 text-3xl font-bold text-navy">{category.name}</h1>
      <p className="mt-3 max-w-3xl text-ink">{category.application}</p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {items.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}
