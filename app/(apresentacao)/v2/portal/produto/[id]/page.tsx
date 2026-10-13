"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { categories } from "@/lib/catalogo";
import { formatBRL, referenceLabel } from "@/lib/preco";
import { useDemo } from "@/lib/demo-store";
import { PriceNotice, ProductFrame } from "@/components/v2/product-thumb";
import { QuantityStepper } from "@/components/v2/quantity-stepper";

export default function V2PortalProductPage() {
  const params = useParams<{ id: string }>();
  const { role, catalog, draft, addQuantity } = useDemo();
  const [amount, setAmount] = useState(1);
  const [added, setAdded] = useState(false);
  const product = catalog.find((item) => item.id === params.id);

  if (role !== "lojista" && role !== "comercial") return null;

  if (!product) {
    return (
      <div className="max-w-xl border border-line bg-white p-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-navy">Peça não encontrada</h1>
        <p className="mt-3 leading-7 text-ink">Essa ficha não está no catálogo desta sessão.</p>
        <Link href="/v2/portal" className="mt-5 inline-flex rounded-sm bg-navy px-5 py-3 text-sm font-semibold text-white">
          Voltar ao catálogo
        </Link>
      </div>
    );
  }

  const category = categories.find((item) => item.id === product.categoryId);
  const related = catalog.filter((item) => item.categoryId === product.categoryId && item.id !== product.id);
  const inCart = draft.find((item) => item.productId === product.id);

  return (
    <article>
      <p className="text-sm text-navy">
        <Link href="/v2/portal" className="font-semibold underline">
          Catálogo
        </Link>
        {category ? <span> / {category.name}</span> : null}
      </p>
      <div className="mt-4 grid gap-8 lg:grid-cols-2">
        <ProductFrame product={product} alt={product.name} />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy">{product.line}</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{product.name}</h1>
          <p className="mt-3 text-sm text-muted">{referenceLabel(product)}</p>
          <p className="mt-4 text-3xl font-extrabold tracking-tight text-navy">{formatBRL(product.precoDemonstracao)}</p>
          <p className="mt-1 text-sm text-muted">cada</p>
          <div className="mt-4">
            <PriceNotice />
          </div>
          <div className="mt-5">
            <p className="text-sm font-semibold text-navy">Quantidade</p>
            <div className="mt-2">
              <QuantityStepper name={product.name} quantity={amount} onChange={setAmount} />
            </div>
          </div>
          <button
            type="button"
            className="mt-4 w-full rounded-sm bg-navy px-5 py-3 text-sm font-semibold text-white"
            onClick={() => {
              addQuantity(product.id, amount);
              setAdded(true);
              setAmount(1);
            }}
          >
            Adicionar ao carrinho
          </button>
          {inCart ? (
            <p className="mt-3 text-sm text-ink" role="status">
              Na lista: {inCart.quantity} {inCart.quantity === 1 ? "unidade" : "unidades"}.
              {added ? " A quantidade entrou no carrinho." : ""}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
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
        <section className="mt-10">
          <h2 className="text-lg font-bold text-navy">Na mesma linha</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {related.map((item) => (
              <li key={item.id}>
                <Link href={`/v2/portal/produto/${item.id}`} className="grid gap-3 border border-line bg-white hover:border-navy">
                  <ProductFrame product={item} alt="" />
                  <span className="px-3 pb-3">
                    <span className="block text-xs font-semibold uppercase tracking-wide text-muted">{item.line}</span>
                    <span className="mt-1 block font-semibold text-navy">{item.name}</span>
                    <span className="mt-1 block text-sm text-ink">{formatBRL(item.precoDemonstracao)} cada</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
