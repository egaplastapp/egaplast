"use client";

import Link from "next/link";
import { useState } from "react";
import { productById } from "@/lib/catalogo";
import { formatBRL, itemTotal, itemsTotal, referenceLabel } from "@/lib/preco";
import { STATUS_LABEL, type PreOrder, type PreOrderStatus } from "@/lib/types";
import { useDemo } from "@/lib/demo-store";
import { PriceNotice, ProductThumb } from "@/components/v2/product-thumb";
import { StatusPill, formatWhen } from "@/components/v2/status-pill";

const statuses = Object.keys(STATUS_LABEL) as PreOrderStatus[];
const highlights: PreOrderStatus[] = ["enviado", "em_analise", "aguardando_informacoes", "aprovado"];

export default function V2AdminPage() {
  const { role, orders, updateStatus } = useDemo();
  const [selectedId, setSelectedId] = useState(orders[0]?.id ?? "");
  const selected = orders.find((order) => order.id === selectedId) ?? orders[0];

  if (role !== "comercial") {
    return (
      <div className="max-w-xl border border-line bg-white p-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-navy">Painel comercial</h1>
        <p className="mt-3 leading-7 text-ink">
          Esta porta não abre para o perfil de lojista. Volte à entrada e escolha o painel comercial. O
          protótipo não deixa alguém virar administrador editando o próprio cadastro.
        </p>
        <Link href="/v2/portal/entrar" className="mt-5 inline-flex rounded-sm bg-navy px-5 py-3 text-sm font-semibold text-white">
          Trocar a porta da demonstração
        </Link>
      </div>
    );
  }

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy">Mesa comercial</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-navy">Painel de demonstração</h1>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-ink">
        Aprovar e converter é o único passo que cria o número de pedido. Os outros status continuam
        pré-pedido. Não há usuário administrativo, banco nem notificação.
      </p>
      <div className="mt-4">
        <PriceNotice />
      </div>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((status) => (
          <li key={status} className="border border-line bg-white p-4">
            <StatusPill status={status} />
            <p className="mt-3 text-3xl font-extrabold tracking-tight text-navy">
              {orders.filter((order) => order.status === status).length}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-6 grid gap-4 lg:grid-cols-[18rem_1fr]">
        <div className="grid content-start gap-6">
          <OrderGroup
            title="Pré-pedidos"
            orders={orders.filter((order) => !order.numeroPedido)}
            selectedId={selected?.id}
            onSelect={setSelectedId}
          />
          <OrderGroup
            title="Pedidos"
            orders={orders.filter((order) => order.numeroPedido)}
            selectedId={selected?.id}
            onSelect={setSelectedId}
          />
        </div>

        {selected ? (
          <section className="border border-line bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-navy">{selected.protocol}</h2>
                {selected.numeroPedido ? (
                  <p className="mt-1 text-sm font-semibold text-navy">Pedido {selected.numeroPedido}</p>
                ) : (
                  <p className="mt-1 text-sm text-muted">Pré-pedido. Ainda sem número de pedido.</p>
                )}
              </div>
              <StatusPill status={selected.status} />
            </div>
            <p className="mt-2 text-xs text-muted">
              {formatWhen(selected.createdAt)}
              {selected.seeded ? " · exemplo" : " · criado nesta sessão"}
            </p>
            <ul className="mt-4 text-sm">
              {selected.items.map((item) => {
                const product = productById(item.productId);
                return (
                  <li key={item.productId} className="flex items-center gap-3 border-t border-line py-3">
                    <ProductThumb product={product} />
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-navy">
                        {item.quantity} × {product?.name ?? "Item"}
                      </span>
                      <span className="text-muted">{referenceLabel(product)}</span>
                      {item.note ? <span className="block text-muted">{item.note}</span> : null}
                    </span>
                    <span className="font-semibold text-navy">{formatBRL(itemTotal(item))}</span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-2 text-right text-sm font-bold text-navy">
              Estimativa {formatBRL(itemsTotal(selected.items))}
            </p>
            {selected.observation ? <p className="mt-3 text-sm leading-6">{selected.observation}</p> : null}
            <button
              type="button"
              disabled={Boolean(selected.numeroPedido)}
              className="mt-4 rounded-sm bg-navy px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-40"
              onClick={() => updateStatus(selected.id, "aprovado", "")}
            >
              {selected.numeroPedido ? `Pedido ${selected.numeroPedido}` : "Aprovar e converter em pedido"}
            </button>

            <form
              key={`${selected.id}-${selected.history.length}`}
              className="mt-5 grid gap-3 border-t border-line pt-5 md:grid-cols-[14rem_1fr_auto] md:items-end"
              onSubmit={(event) => {
                event.preventDefault();
                const data = new FormData(event.currentTarget);
                const status = String(data.get("status")) as PreOrderStatus;
                const note = String(data.get("note") ?? "");
                updateStatus(selected.id, status, note);
              }}
            >
              <label className="grid gap-1 text-sm font-semibold text-navy">
                Novo status
                <select name="status" defaultValue={selected.status} className="border border-line bg-white px-3 py-2 font-normal">
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {STATUS_LABEL[status]}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1 text-sm font-semibold text-navy">
                Nota
                <input name="note" className="border border-line px-3 py-2 font-normal" />
              </label>
              <button type="submit" className="rounded-sm bg-navy px-4 py-2.5 text-sm font-semibold text-white">
                Atualizar
              </button>
            </form>

            <ol className="mt-6 border-l border-line pl-4">
              {selected.history.map((change) => (
                <li key={`${change.at}-${change.to}`} className="pb-4 text-sm">
                  <p className="font-semibold text-navy">
                    {change.from ? STATUS_LABEL[change.from] : "Início"} → {STATUS_LABEL[change.to]}
                  </p>
                  <p className="text-xs text-muted">{formatWhen(change.at)}</p>
                  <p className="mt-1">{change.note}</p>
                </li>
              ))}
            </ol>
          </section>
        ) : null}
      </div>
    </div>
  );
}

function OrderGroup({
  title,
  orders,
  selectedId,
  onSelect,
}: {
  title: string;
  orders: PreOrder[];
  selectedId?: string;
  onSelect: (id: string) => void;
}) {
  return (
    <section>
      <h2 className="text-sm font-bold text-navy">{title}</h2>
      {orders.length === 0 ? (
        <p className="mt-2 text-sm text-muted">Nenhum nesta aba.</p>
      ) : (
        <ul className="mt-2 grid gap-2">
          {orders.map((order) => {
            const active = order.id === selectedId;
            return (
              <li key={order.id}>
                <button
                  type="button"
                  onClick={() => onSelect(order.id)}
                  className={`w-full border p-3 text-left ${active ? "border-navy bg-white" : "border-line bg-white/70"}`}
                >
                  <span className="block font-bold text-navy">{order.protocol}</span>
                  {order.numeroPedido ? (
                    <span className="mt-1 block text-xs font-semibold text-navy">{order.numeroPedido}</span>
                  ) : null}
                  <span className="mt-2 block">
                    <StatusPill status={order.status} />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
