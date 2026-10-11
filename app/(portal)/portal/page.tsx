"use client";

import Link from "next/link";
import { useState } from "react";
import { categories, products, productsByCategory } from "@/lib/catalogo";
import { useDemo } from "@/lib/demo-store";

export default function PortalCatalogPage() {
  const { role, addItem } = useDemo();
  const [notice, setNotice] = useState("");

  if (role !== "lojista" && role !== "comercial") return null;

  return (
    <div>
      <h1 className="text-3xl font-bold text-navy">Catálogo para cotação</h1>
      <p className="mt-3 max-w-3xl text-ink">
        Os mesmos produtos da área pública. Incluir um item não reserva estoque e não mostra preço.
      </p>
      {notice ? (
        <p className="mt-4 border border-line bg-paper p-3 text-sm" role="status">
          {notice}{" "}
          <Link href="/portal/cotacao" className="font-semibold text-navy underline">
            Abrir a lista
          </Link>
        </p>
      ) : null}
      <div className="mt-8 grid gap-8">
        {categories.map((category) => (
          <section key={category.id}>
            <h2 className="text-xl font-bold text-navy">{category.name}</h2>
            <ul className="mt-3 grid gap-3">
              {productsByCategory(category.id).map((product) => (
                <li key={product.id} className="flex flex-wrap items-center justify-between gap-3 border border-line p-3">
                  <span>
                    <span className="block font-semibold">{product.name}</span>
                    <span className="text-sm text-muted">
                      {product.references[0] ? `Ref. ${product.references.join(" / ")}` : "Código pendente"} · Sob consulta
                    </span>
                  </span>
                  <button
                    type="button"
                    className="rounded-md bg-navy px-3 py-2 text-sm font-semibold text-white"
                    onClick={() => {
                      addItem(product.id);
                      setNotice(`${product.name} entrou na lista de cotação.`);
                    }}
                  >
                    Incluir
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <p className="mt-6 text-xs text-muted">{products.length} fichas de demonstração.</p>
    </div>
  );
}
