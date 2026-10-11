import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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

export default async function V2CategoryPage({ params }: { params: Promise<{ linha: string }> }) {
  const { linha } = await params;
  const category = categoryBySlug(linha);
  if (!category) notFound();
  const items = productsByCategory(category.id);

  return (
    <div>
      <section className="border-b border-line bg-[#f3f6fb]">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <p className="text-sm text-navy">
            <Link href="/v2/produtos" className="font-semibold underline">
              Produtos
            </Link>
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-navy">{category.name}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-ink">{category.application}</p>
          {category.imagem ? (
            <div className="relative mt-8 h-72 overflow-hidden bg-[#111] md:h-96">
              <Image
                src={category.imagem}
                alt=""
                fill
                priority
                sizes="(min-width: 1152px) 1152px, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}
        </div>
      </section>
      <ul className="mx-auto grid max-w-6xl gap-4 px-4 py-12 md:grid-cols-2">
        {items.map((product) => (
          <li key={product.id}>
            <article className="flex h-full flex-col border border-line bg-white">
              {product.imagem ? (
                <div className="relative h-56 bg-[#111]">
                  <Image src={product.imagem} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-contain" />
                </div>
              ) : null}
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy">{product.line}</p>
                <h2 className="mt-2 text-xl font-bold text-navy">{product.name}</h2>
                {product.application ? <p className="mt-3 text-sm leading-6 text-ink">{product.application}</p> : null}
                <p className="mt-4 text-sm text-ink">
                  {product.references.length > 0 ? `Ref. ${product.references.join(" / ")}` : "Sob consulta"}
                </p>
                <Link
                  href={`/v2/produtos/${category.slug}/${product.slug}`}
                  className="mt-6 w-fit rounded-sm bg-navy px-4 py-2.5 text-sm font-semibold text-white"
                >
                  Ver ficha
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
