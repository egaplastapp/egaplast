"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { categories, products, productsByCategory } from "@/lib/catalogo";
import { formatBRL, referenceLabel } from "@/lib/preco";
import { useDemo } from "@/lib/demo-store";
import { PriceNotice, ProductThumb } from "@/components/v2/product-thumb";

export default function V2PortalCatalogPage() {
  const { role, addItem, draft } = useDemo();
  const [notice, setNotice] = useState("");
  const [query, setQuery] = useState("");
  const [line, setLine] = useState("todas");

  const visibleCategories = useMemo(() => {
    const term = query.trim().toLowerCase();
    return categories
      .filter((category) => line === "todas" || category.id === line)
      .map((category) => ({
        category,
        items: productsByCategory(category.id).filter((product) => {
          const blob = `${product.name} ${product.line} ${product.references.join(" ")}`.toLowerCase();
          return blob.includes(term);
        }),
      }))
      .filter((group) => group.items.length > 0);
  }, [line, query]);

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
        <Link href="/v2/portal/cotacao" className="rounded-sm bg-navy px-4 py-2.5 text-sm font-semibold text-white">
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

      {notice ? (
        <p className="mt-4 border border-navy bg-white px-4 py-3 text-sm" role="status">
          {notice}{" "}
          <Link href="/v2/portal/cotacao" className="font-semibold text-navy underline">
            Abrir a lista
          </Link>
        </p>
      ) : null}

      <div className="mt-8 grid gap-8">
        {visibleCategories.map(({ category, items }) => (
          <section key={category.id}>
            <h2 className="text-lg font-bold text-navy">{category.name}</h2>
            <ul className="mt-3 grid gap-3">
              {items.map((product) => {
                const inDraft = draft.some((item) => item.productId === product.id);
                return (
                  <li key={product.id} className="flex flex-wrap items-center justify-between gap-4 border border-line bg-white p-4">
                    <span className="flex min-w-0 items-center gap-4">
                      <ProductThumb product={product} />
                      <span>
                        <span className="block font-semibold text-navy">{product.name}</span>
                        <span className="mt-1 block text-sm text-muted">
                          {referenceLabel(product)}
                        </span>
                        <span className="mt-1 block text-sm font-semibold text-navy">
                          {formatBRL(product.precoDemonstracao)}
                        </span>
                      </span>
                    </span>
                    <button
                      type="button"
                      className="rounded-sm bg-navy px-4 py-2 text-sm font-semibold text-white"
                      onClick={() => {
                        addItem(product.id);
                        setNotice(
                          inDraft
                            ? `${product.name}: a quantidade na lista aumentou.`
                            : `${product.name} entrou na lista de cotação.`,
                        );
                      }}
                    >
                      {inDraft ? "Somar quantidade" : "Incluir"}
                    </button>
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
      <p className="mt-6 text-xs text-muted">{products.length} fichas de demonstração.</p>
    </div>
  );
}
