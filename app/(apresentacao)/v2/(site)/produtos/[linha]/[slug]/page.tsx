import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToQuote } from "@/components/v2/add-to-quote";
import { V2ContactForm } from "@/components/v2/forms";
import { categories, productBySlug, products, relatedProducts } from "@/lib/catalogo";

export function generateStaticParams() {
  return products.flatMap((product) => {
    const category = categories.find((item) => item.id === product.categoryId);
    if (!category) return [];
    return [{ linha: category.slug, slug: product.slug }];
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ linha: string; slug: string }>;
}): Promise<Metadata> {
  const { linha, slug } = await params;
  const product = productBySlug(linha, slug);
  const code = product?.references[0];
  return {
    title: product ? (code ? `${product.name} | Ref. ${code}` : product.name) : "Produto",
  };
}

export default async function V2ProductPage({
  params,
}: {
  params: Promise<{ linha: string; slug: string }>;
}) {
  const { linha, slug } = await params;
  const product = productBySlug(linha, slug);
  if (!product) notFound();
  const category = categories.find((item) => item.id === product.categoryId);
  const related = relatedProducts(product);

  return (
    <article>
      <section className="border-b border-line bg-[#f3f6fb]">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <p className="text-sm text-navy">
            <Link href="/v2/produtos" className="font-semibold underline">
              Produtos
            </Link>
            {category ? (
              <>
                {" / "}
                <Link href={`/v2/produtos/${category.slug}`} className="font-semibold underline">
                  {category.name}
                </Link>
              </>
            ) : null}
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-navy">{product.line}</p>
          <h1 className="mt-2 max-w-4xl text-4xl font-extrabold tracking-tight text-navy">{product.name}</h1>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="bg-navy px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white">
              Sob consulta
            </span>
            <span className="border border-navy px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-navy">
              Demonstração
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          {product.imagem ? (
            <div className="relative mb-8 aspect-square bg-[#111]">
              <Image
                src={product.imagem}
                alt={product.name}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-contain"
              />
            </div>
          ) : null}
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-navy">Referência</h2>
          {product.references.length > 0 ? (
            <p className="mt-2 text-4xl font-extrabold tracking-tight text-navy">{product.references.join(" / ")}</p>
          ) : (
            <p className="mt-3 text-lg font-semibold text-navy">Código pendente de confirmação</p>
          )}
          <p className="mt-3 text-sm leading-6 text-muted">Nenhum número foi inventado.</p>
          {product.application ? <p className="mt-6 leading-7 text-ink">{product.application}</p> : null}
          {product.demonstration ? (
            <p className="mt-6 border-l-4 border-orange bg-white py-2 pl-4 text-sm leading-6">
              {product.referenceNote} Fonte: {product.source}.
            </p>
          ) : null}
          <AddToQuote productId={product.id} productName={product.name} />
        </div>

        <section className="border border-line bg-white">
          <h2 className="border-b border-line bg-navy px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white">
            Características publicadas
          </h2>
          {product.specs.length > 0 ? (
            <table className="w-full text-sm">
              <tbody>
                {product.specs.map((spec) => (
                  <tr key={spec.label} className="border-b border-line last:border-0">
                    <th className="w-2/5 px-5 py-3 text-left font-semibold text-navy">{spec.label}</th>
                    <td className="px-5 py-3">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="px-5 py-6 leading-7 text-ink">
              A especificação desta variação ainda não foi confirmada. A ficha não completa a tabela com
              texto genérico.
            </p>
          )}
          <div className="grid gap-3 border-t border-line px-5 py-4 text-sm leading-6">
            {product.packaging ? <p>Embalagem publicada: {product.packaging}</p> : null}
            {product.warranty ? <p>Garantia: {product.warranty}</p> : null}
          </div>
        </section>
      </div>

      {related.length > 0 ? (
        <section className="mx-auto max-w-6xl px-4 pb-4">
          <h2 className="text-xl font-bold text-navy">Na mesma linha</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {related.map((item) => (
              <li key={item.id}>
                <Link href={`/v2/produtos/${linha}/${item.slug}`} className="block border border-line p-4 font-semibold text-navy hover:border-navy">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-navy">Pedir informação comercial</h2>
          <p className="mt-3 leading-7 text-ink">
            O formulário não envia a mensagem. Para acompanhar protocolo, use a área do lojista.
          </p>
        </div>
        <V2ContactForm productName={product.name} />
      </section>
    </article>
  );
}
