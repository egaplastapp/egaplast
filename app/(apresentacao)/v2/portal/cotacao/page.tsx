"use client";

import Link from "next/link";
import { useState } from "react";
import { formatBRL, itemTotal, itemsTotal, referenceLabel } from "@/lib/preco";
import { useDemo } from "@/lib/demo-store";
import { PriceNotice, ProductThumb } from "@/components/v2/product-thumb";
import { QuantityStepper } from "@/components/v2/quantity-stepper";

export default function V2QuotePage() {
  const {
    role,
    draft,
    draftObservation,
    setDraftObservation,
    setQuantity,
    setItemNote,
    removeItem,
    submitDraft,
    catalog,
    stores,
    currentStoreId,
  } = useDemo();
  const store = stores.find((item) => item.id === currentStoreId) ?? null;
  const findProduct = (id: string) => catalog.find((product) => product.id === id);
  const [protocol, setProtocol] = useState<string | null>(null);
  const [estimate, setEstimate] = useState(0);

  if (!role) return null;

  if (protocol) {
    return (
      <section className="mx-auto max-w-2xl border-t-4 border-orange bg-white p-5 shadow-[0_20px_50px_rgba(0,31,87,0.08)] sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy">Pré-pedido</p>
        <h1 className="mt-3 break-words text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{protocol}</h1>
        <p className="mt-2 text-sm font-semibold text-navy">Status inicial: enviado</p>
        <p className="mt-4 text-2xl font-extrabold tracking-tight text-navy">{formatBRL(estimate)}</p>
        <p className="mt-4 leading-7 text-ink">
          Isso ainda não é um pedido. Não confirma venda, não reserva estoque e o valor é só a estimativa
          ilustrativa. O número de pedido nasce quando o comercial aprovar e converter.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/v2/portal/historico" className="rounded-sm bg-navy px-5 py-3 text-sm font-semibold text-white">
            Ver histórico
          </Link>
          <Link href="/v2/portal" className="rounded-sm border border-navy px-5 py-3 text-sm font-semibold text-navy">
            Novo carrinho
          </Link>
        </div>
      </section>
    );
  }

  const units = draft.reduce((sum, item) => sum + item.quantity, 0);
  const total = itemsTotal(draft, findProduct);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy">Pré-pedido</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-navy">Carrinho</h1>
        <p className="mt-2 text-sm leading-6 text-ink">
          Enviar gera um protocolo de pré-pedido. O pedido só existe depois da conversão comercial.
        </p>
        <div className="mt-4">
          <PriceNotice />
        </div>

        {draft.length === 0 ? (
          <p className="mt-6 border border-line bg-white p-6 text-sm">
            O carrinho está vazio.{" "}
            <Link href="/v2/portal" className="font-semibold text-navy underline">
              Escolher produtos
            </Link>
          </p>
        ) : (
          <ul className="mt-6 grid gap-4">
            {draft.map((item) => {
              const product = findProduct(item.productId);
              return (
                <li key={item.productId} className="border border-line bg-white p-4 sm:p-5">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <ProductThumb product={product} size="lg" />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h2 className="font-bold text-navy">{product?.name ?? "Item removido do catálogo"}</h2>
                          <p className="mt-1 text-sm text-muted">
                            {referenceLabel(product)}
                          </p>
                          <p className="mt-1 text-sm text-ink">
                            {product ? formatBRL(product.precoDemonstracao) : "—"} cada
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-navy">{formatBRL(itemTotal(item, product ?? null))}</p>
                          <button
                            type="button"
                            className="mt-2 text-sm font-semibold text-navy underline"
                            onClick={() => removeItem(item.productId)}
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap items-end gap-4">
                        <div>
                          <p className="text-sm font-semibold text-navy">Quantidade</p>
                          <div className="mt-1">
                            <QuantityStepper
                              name={product?.name ?? "item"}
                              quantity={item.quantity}
                              onChange={(quantity) => setQuantity(item.productId, quantity)}
                            />
                          </div>
                        </div>
                        <label className="grid w-full min-w-0 gap-1 text-sm font-semibold text-navy sm:w-auto sm:min-w-56 sm:flex-1">
                          Observação do item
                          <input
                            value={item.note}
                            onChange={(event) => setItemNote(item.productId, event.target.value)}
                            className="border border-line px-3 py-2 font-normal"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <aside className="h-fit border border-line bg-white p-5 lg:sticky lg:top-4">
        <h2 className="text-lg font-bold text-navy">Resumo</h2>
        {store ? (
          <>
            <p className="mt-4 text-sm font-semibold text-navy">{store.tradeName}</p>
            <p className="text-sm text-ink">
              {store.city} - {store.state} · {store.whatsapp}
            </p>
            <p className="mt-2 text-xs leading-5 text-muted">
              {store.seeded
                ? "Empresa fictícia, usada só nesta demonstração. Não é um cliente da EGAPLAST."
                : "Cadastro desta sessão. Recarregar apaga a loja."}
            </p>
          </>
        ) : (
          <p className="mt-4 text-sm text-ink">Nenhuma loja vinculada a este carrinho.</p>
        )}
        <p className="mt-4 border-t border-line pt-4 text-sm">
          {draft.length} {draft.length === 1 ? "item" : "itens"} · {units}{" "}
          {units === 1 ? "unidade" : "unidades"}
        </p>
        <p className="mt-2 text-2xl font-extrabold tracking-tight text-navy">{formatBRL(total)}</p>
        <p className="mt-1 text-xs text-muted">Estimativa ilustrativa. Sem imposto e sem frete.</p>
        <label className="mt-4 grid gap-1 text-sm font-semibold text-navy">
          Observação da solicitação
          <textarea
            rows={4}
            value={draftObservation}
            onChange={(event) => setDraftObservation(event.target.value)}
            className="border border-line px-3 py-2 font-normal"
          />
        </label>
        <button
          type="button"
          disabled={draft.length === 0 || (role === "lojista" && store?.status !== "ativo")}
          className="mt-4 w-full rounded-sm bg-navy px-4 py-3 text-sm font-semibold text-white disabled:opacity-40"
          onClick={() => {
            const snapshot = itemsTotal(draft, findProduct);
            const order = submitDraft();
            if (order) {
              setEstimate(snapshot);
              setProtocol(order.protocol);
            }
          }}
        >
          Enviar pré-pedido
        </button>
      </aside>
    </div>
  );
}
