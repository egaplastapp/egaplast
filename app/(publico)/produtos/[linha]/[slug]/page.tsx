import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/contact-form";
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

export default async function ProductPage({
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
    <article className="grid gap-10">
      <div>
        <p className="text-sm text-muted">
          <Link href="/produtos" className="underline">
            Produtos
          </Link>
          {category ? (
            <>
              {" / "}
              <Link href={`/produtos/${category.slug}`} className="underline">
                {category.name}
              </Link>
            </>
          ) : null}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-navy">{product.name}</h1>
        <p className="mt-2 text-sm font-semibold text-navy">Condição comercial: sob consulta</p>
        {product.demonstration ? (
          <p className="mt-3 max-w-3xl border border-orange bg-paper p-3 text-sm">
            Demonstração. {product.referenceNote} Fonte: {product.source}.
          </p>
        ) : null}
      </div>

      <section>
        <h2 className="text-xl font-bold text-navy">Referência</h2>
        {product.references.length > 0 ? (
          <p className="mt-2 text-ink">{product.references.join(" e ")}</p>
        ) : (
          <p className="mt-2 text-ink">Código pendente de confirmação. Nenhum número foi inventado.</p>
        )}
      </section>

      {product.application ? (
        <section>
          <h2 className="text-xl font-bold text-navy">Aplicação</h2>
          <p className="mt-2 max-w-3xl text-ink">{product.application}</p>
        </section>
      ) : null}

      <section>
        <h2 className="text-xl font-bold text-navy">Características publicadas</h2>
        {product.specs.length > 0 ? (
          <table className="mt-3 w-full max-w-3xl border-collapse text-sm">
            <tbody>
              {product.specs.map((spec) => (
                <tr key={spec.label} className="border-b border-line">
                  <th className="py-2 pr-4 text-left font-semibold text-navy">{spec.label}</th>
                  <td className="py-2">{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mt-2 text-ink">
            A especificação desta variação ainda não foi confirmada. A ficha não completa a tabela com
            texto genérico.
          </p>
        )}
        {product.packaging ? <p className="mt-3 text-ink">Embalagem publicada: {product.packaging}</p> : null}
        {product.warranty ? <p className="mt-2 text-ink">Garantia: {product.warranty}</p> : null}
      </section>

      {related.length > 0 ? (
        <section>
          <h2 className="text-xl font-bold text-navy">Na mesma linha</h2>
          <ul className="mt-3 space-y-2">
            {related.map((item) => (
              <li key={item.id}>
                <Link href={`/produtos/${linha}/${item.slug}`} className="text-navy underline">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="max-w-xl">
        <h2 className="text-xl font-bold text-navy">Pedir informação comercial</h2>
        <p className="mt-2 text-sm text-muted">
          O formulário não envia a mensagem. Para ver a lista de cotação do portal, use a área do lojista.
        </p>
        <div className="mt-4">
          <ContactForm productName={product.name} />
        </div>
      </section>
    </article>
  );
}
