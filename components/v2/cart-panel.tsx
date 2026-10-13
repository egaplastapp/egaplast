"use client";

import Link from "next/link";
import { formatBRL, itemTotal, itemsTotal, referenceLabel } from "@/lib/preco";
import { useDemo } from "@/lib/demo-store";
import { ProductThumb } from "@/components/v2/product-thumb";
import { QuantityStepper } from "@/components/v2/quantity-stepper";

export function CartPanel() {
  const { draft, catalog, setQuantity } = useDemo();
  const findProduct = (id: string) => catalog.find((product) => product.id === id);
  const units = draft.reduce((sum, item) => sum + item.quantity, 0);
  const total = itemsTotal(draft, findProduct);

  return (
    <aside className="border border-line bg-white lg:sticky lg:top-4 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
      <div className="border-b border-line px-4 py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy">Carrinho</p>
        <h2 className="text-xl font-extrabold tracking-tight text-navy">
          {units} {units === 1 ? "unidade" : "unidades"}
        </h2>
      </div>
      <ul className="space-y-4 px-4 py-4">
        {draft.map((item) => {
          const product = findProduct(item.productId);
          return (
            <li key={item.productId} className="border border-line p-3">
              <div className="flex gap-3">
                <ProductThumb product={product} size="lg" />
                <div className="min-w-0">
                  <p className="font-semibold text-navy">{product?.name ?? "Item removido do catálogo"}</p>
                  {product ? <p className="mt-1 text-sm text-muted">{referenceLabel(product)}</p> : null}
                  <p className="mt-1 font-extrabold text-navy">{formatBRL(itemTotal(item, product ?? null))}</p>
                </div>
              </div>
              <div className="mt-3">
                <QuantityStepper
                  name={product?.name ?? "item"}
                  quantity={item.quantity}
                  onChange={(quantity) => setQuantity(item.productId, quantity)}
                />
              </div>
            </li>
          );
        })}
      </ul>
      <div className="border-t border-line px-4 py-4">
        <p className="text-xs text-muted">Estimativa ilustrativa. Sem imposto e sem frete.</p>
        <p className="mt-1 text-2xl font-extrabold tracking-tight text-navy">{formatBRL(total)}</p>
        <Link
          href="/v2/portal/cotacao"
          className="mt-4 block rounded-sm bg-navy px-4 py-3 text-center text-sm font-semibold text-white"
        >
          Seguir para o pré-pedido
        </Link>
      </div>
    </aside>
  );
}
