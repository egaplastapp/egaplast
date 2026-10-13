"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { categories } from "@/lib/catalogo";
import { formatBRL, referenceLabel } from "@/lib/preco";
import { useDemo } from "@/lib/demo-store";
import { PriceNotice, ProductFrame } from "@/components/v2/product-thumb";
import { QuantityStepper } from "@/components/v2/quantity-stepper";

export default function V2PortalCatalogPage() {
  const { role, addItem, setQuantity, draft, catalog } = useDemo();
  const [query, setQuery] = useState("");
  const [line, setLine] = useState("todas");

  const visibleCategories = useMemo(() => {
    const term = query.trim().toLowerCase();
    return categories
      .filter((category) => line === "todas" || category.id === line)
      .map((category) => ({
        category,
        items: catalog.filter((product) => product.categoryId === category.id).filter((product) => {
          const blob = `${product.name} ${product.line} ${product.references.join(" ")}`.toLowerCase();
          return blob.includes(term);
        }),
      }))
      .filter((group) => group.items.length > 0);
  }, [catalog, line, query]);

  if (role !== "lojista" && role !== "comercial") return null;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy">Catálogo interno</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-navy">Montar a cotação</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink">
            Os mesmos produtos da área pública. Incluir um item não reserva estoque e não confirma venda.
          </p>
        </div>
        <Link href="/v2/portal/cotacao" className="w-full rounded-sm bg-navy px-4 py-2.5 text-center text-sm font-semibold text-white sm:w-auto">
          Lista {draft.length > 0 ? `(${draft.length})` : ""}
        </Link>
      </div>

      <div className="mt-6">
        <PriceNotice />
      </div>

      <div className="mt-4 grid gap-3 border border-line bg-white p-4 md:grid-cols-[1fr_16rem]">
        <label className="grid gap-1 text-sm font-semibold text-navy">
          Buscar nome ou referência
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="border border-line px-3 py-2 font-normal"
            placeholder="Ex.: Egaflush ou 10215"
          />
        </label>
        <label className="grid gap-1 text-sm font-semibold text-navy">
          Linha
          <select value={line} onChange={(event) => setLine(event.target.value)} className="border border-line bg-white px-3 py-2 font-normal">
            <option value="todas">Todas</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-8 grid gap-8">
        {visibleCategories.map(({ category, items }) => (
          <section key={category.id}>
            <h2 className="text-lg font-bold text-navy">{category.name}</h2>
            <ul className="mt-3 grid gap-4 sm:grid-cols-2">
              {items.map((product) => {
                const draftLine = draft.find((item) => item.productId === product.id);
                const lineTotal = draftLine ? product.precoDemonstracao * draftLine.quantity : 0;
                const href = `/v2/portal/produto/${product.id}`;
                return (
                  <li key={product.id} className="flex flex-col border border-line bg-white">
                    <Link href={href} className="block">
                      <ProductFrame product={product} alt="" />
                    </Link>
                    <div className="grid flex-1 gap-3 p-4">
                      <div className="min-w-0">
                        <Link href={href} className="block font-semibold text-navy hover:underline">
                          {product.name}
                        </Link>
                        <p className="mt-1 text-sm text-muted">{referenceLabel(product)}</p>
                        <p className="mt-1 text-sm text-ink">{formatBRL(product.precoDemonstracao)} cada</p>
                        {draftLine ? (
                          <p className="mt-1 text-base font-extrabold text-navy">{formatBRL(lineTotal)}</p>
                        ) : null}
                      </div>
                      {draftLine ? (
                        <QuantityStepper
                          name={product.name}
                          quantity={draftLine.quantity}
                          onChange={(quantity) => setQuantity(product.id, quantity)}
                        />
                      ) : (
                        <button
                          type="button"
                          className="w-full rounded-sm bg-navy px-4 py-2.5 text-sm font-semibold text-white"
                          onClick={() => addItem(product.id)}
                        >
                          Adicionar
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
        {visibleCategories.length === 0 ? (
          <p className="border border-line bg-white p-4 text-sm">Nenhuma ficha corresponde a esta busca.</p>
        ) : null}
      </div>
      <p className="mt-6 text-xs text-muted">{catalog.length} fichas de demonstração.</p>
    </div>
  );
}
