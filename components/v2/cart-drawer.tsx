"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { formatBRL, itemTotal, itemsTotal, referenceLabel } from "@/lib/preco";
import { useDemo } from "@/lib/demo-store";
import { ProductThumb } from "@/components/v2/product-thumb";
import { QuantityStepper } from "@/components/v2/quantity-stepper";

export function CartDrawer({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  const { draft, catalog, setQuantity } = useDemo();
  const findProduct = (id: string) => catalog.find((product) => product.id === id);
  const units = draft.reduce((sum, item) => sum + item.quantity, 0);
  const total = itemsTotal(draft, findProduct);

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <button type="button" className="absolute inset-0 bg-[#00153f]/40" aria-label="Fechar carrinho" onClick={onClose} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        className="relative flex h-full w-full flex-col bg-white shadow-2xl sm:max-w-md"
      >
        <div className="flex items-center justify-between border-b border-line px-4 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy">Carrinho</p>
            <h2 id="cart-drawer-title" className="text-xl font-extrabold tracking-tight text-navy">
              {units} {units === 1 ? "unidade" : "unidades"}
            </h2>
          </div>
          <button type="button" autoFocus className="text-sm font-semibold text-navy underline" onClick={onClose}>
            Fechar
          </button>
        </div>
        <ul className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
          {draft.map((item) => {
            const product = findProduct(item.productId);
            return (
              <li key={item.productId} className="border border-line p-3">
                <div className="flex gap-3">
                  <ProductThumb product={product} size="lg" />
                  <div className="min-w-0">
                    <p className="font-semibold text-navy">{product?.name ?? "Item removido do catálogo"}</p>
                    {product ? <p className="mt-1 text-sm text-muted">{referenceLabel(product)}</p> : null}
                    <p className="mt-1 text-sm text-ink">
                      {product ? `${formatBRL(product.precoDemonstracao)} cada` : "—"}
                    </p>
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
        <div className="border-t border-line px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <p className="text-xs text-muted">Estimativa ilustrativa. Sem imposto e sem frete.</p>
          <p className="mt-1 text-2xl font-extrabold tracking-tight text-navy">{formatBRL(total)}</p>
          <Link
            href="/v2/portal/cotacao"
            className="mt-4 block rounded-sm bg-navy px-4 py-3 text-center text-sm font-semibold text-white"
            onClick={(event) => {
              if (pathname === "/v2/portal/cotacao") {
                event.preventDefault();
                onClose();
              }
            }}
          >
            Seguir para o pré-pedido
          </Link>
        </div>
      </aside>
    </div>
  );
}
