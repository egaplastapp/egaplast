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
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-2 lg:py-12">
        {product.imagem ? (
          <div className="relative aspect-square bg-[#111]">
            <Image
              src={product.imagem}
              alt={product.name}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-contain"
            />
          </div>
        ) : (
          <div aria-hidden="true" className="aspect-square border border-line bg-[#f3f6fb]" />
        )}
        <div>
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
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{product.name}</h1>
          {product.references.length > 0 ? (
            <p className="mt-3 break-words text-lg font-semibold text-navy">Ref. {product.references.join(" / ")}</p>
          ) : null}
          <p className="mt-5 inline-flex bg-navy px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white">
            Sob consulta
          </p>
          <AddToQuote productId={product.id} productName={product.name} />
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 pb-12 lg:grid-cols-2">
        <section>
          <h2 className="text-lg font-bold text-navy">Sobre o produto</h2>
          <p className="mt-3 leading-7 text-ink">
            {product.application ?? "Para a aplicação desta peça, fale com o comercial."}
          </p>
          <div className="mt-4 grid gap-2 text-sm leading-6">
            {product.packaging ? <p>Embalagem: {product.packaging}</p> : null}
            {product.warranty ? <p>Garantia: {product.warranty}</p> : null}
          </div>
        </section>
        <section className="border border-line bg-white">
          <h2 className="border-b border-line bg-navy px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white">
            Ficha técnica
          </h2>
          {product.specs.length > 0 ? (
            <table className="w-full table-fixed text-sm">
              <tbody>
                {product.specs.map((spec) => (
                  <tr key={spec.label} className="border-b border-line last:border-0">
                    <th className="w-2/5 break-words px-3 py-3 text-left font-semibold text-navy sm:px-5">{spec.label}</th>
                    <td className="break-words px-3 py-3 sm:px-5">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="px-5 py-6 leading-7 text-ink">Para medidas e variações desta peça, fale com o comercial.</p>
          )}
        </section>
      </div>

      {related.length > 0 ? (
        <section className="mx-auto max-w-6xl px-4 pb-4">
          <h2 className="text-xl font-bold text-navy">Na mesma linha</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {related.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/v2/produtos/${linha}/${item.slug}`}
                  className="flex items-center gap-4 border border-line bg-white p-3 font-semibold text-navy hover:border-navy"
                >
                  <span className="relative h-16 w-16 shrink-0 bg-[#111]">
                    {item.imagem ? (
                      <Image src={item.imagem} alt="" fill sizes="64px" className="object-contain p-1" />
                    ) : null}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-wide text-muted">{item.line}</span>
                    <span className="mt-1 block break-words">{item.name}</span>
                  </span>
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
            Informe os dados da loja. O comercial retorna com a condição desta peça. Para montar uma lista,
            use a área do lojista.
          </p>
        </div>
        <V2ContactForm productName={product.name} />
      </section>
    </article>
  );
}
