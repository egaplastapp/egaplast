"use client";

import { formatBRL, itemTotal, itemsTotal, referenceLabel } from "@/lib/preco";
import { STATUS_LABEL, type PreOrder, type PreOrderStatus } from "@/lib/types";
import { useDemo } from "@/lib/demo-store";
import { PriceNotice, ProductThumb } from "@/components/v2/product-thumb";
import { StatusPill, formatWhen } from "@/components/v2/status-pill";

const pipeline: PreOrderStatus[] = [
  "rascunho",
  "enviado",
  "em_analise",
  "aguardando_informacoes",
  "aprovado",
  "rejeitado",
  "cancelado",
];

function OrderCard({ order }: { order: PreOrder }) {
  const { catalog } = useDemo();
  const findProduct = (id: string) => catalog.find((product) => product.id === id);
  return (
    <li className="border border-line bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold tracking-tight text-navy">{order.protocol}</h2>
          {order.numeroPedido ? (
            <p className="mt-1 text-sm font-semibold text-navy">Pedido {order.numeroPedido}</p>
          ) : (
            <p className="mt-1 text-sm text-muted">Pré-pedido. Ainda sem número de pedido.</p>
          )}
        </div>
        <StatusPill status={order.status} />
      </div>
      <p className="mt-2 text-xs text-muted">
        {formatWhen(order.createdAt)}
        {order.seeded ? " · exemplo" : " · criado nesta sessão"}
      </p>
      <ul className="mt-4 grid gap-3 text-sm">
        {order.items.map((item) => {
          const product = findProduct(item.productId);
          return (
            <li key={item.productId} className="flex flex-wrap items-center gap-3 border-t border-line pt-3">
              <ProductThumb product={product} />
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-navy">
                  {product ? `${item.quantity} × ${product.name}` : "Item removido do catálogo"}
                </span>
                {product ? <span className="text-muted">{referenceLabel(product)}</span> : null}
                {item.note ? <span className="block text-muted">{item.note}</span> : null}
              </span>
              <span className="ml-auto font-semibold text-navy">{formatBRL(itemTotal(item, product ?? null))}</span>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-right text-sm font-bold text-navy">Estimativa {formatBRL(itemsTotal(order.items, findProduct))}</p>
      {order.observation ? <p className="mt-3 text-sm leading-6 text-ink">{order.observation}</p> : null}
      <ol className="mt-5 border-l border-line pl-4">
        {order.history.map((change) => (
          <li key={`${change.at}-${change.to}`} className="pb-3 text-sm">
            <p className="font-semibold text-navy">
              {change.from ? STATUS_LABEL[change.from] : "Início"} → {STATUS_LABEL[change.to]}
            </p>
            <p className="text-xs text-muted">{formatWhen(change.at)}</p>
            <p className="mt-1 text-ink">{change.note}</p>
          </li>
        ))}
      </ol>
    </li>
  );
}

export default function V2HistoryPage() {
  const { role, orders, stores, currentStoreId } = useDemo();
  if (!role) return null;
  const currentStore = stores.find((store) => store.id === currentStoreId) ?? null;
  const visible =
    role === "lojista" && currentStore ? orders.filter((order) => order.storeId === currentStore.id) : orders;
  const preOrders = visible.filter((order) => !order.numeroPedido);
  const pedidos = visible.filter((order) => order.numeroPedido);

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy">Acompanhamento</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-navy">Histórico</h1>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-ink">
        {role === "lojista"
          ? "Aqui ficam só os pré-pedidos desta loja. O número de pedido só aparece depois que o comercial aprovar e converter. Tudo some ao recarregar."
          : "A lista mostra os exemplos e o que as lojas enviarem nesta sessão. O número de pedido só aparece depois da conversão. Tudo some ao recarregar."}
      </p>
      <div className="mt-4">
        <PriceNotice />
      </div>
      <ul className="mt-6 flex flex-wrap gap-2">
        {pipeline.map((status) => {
          const count = visible.filter((order) => order.status === status).length;
          return (
            <li key={status} className="flex items-center gap-2 border border-line bg-white px-3 py-2 text-sm">
              <StatusPill status={status} />
              <span className="font-semibold text-navy">{count}</span>
            </li>
          );
        })}
      </ul>
      <section className="mt-8">
        <h2 className="text-lg font-bold text-navy">Pré-pedidos</h2>
        {preOrders.length === 0 ? (
          <p className="mt-3 text-sm text-muted">Nenhum pré-pedido em aberto.</p>
        ) : (
          <ul className="mt-3 grid gap-4">
            {preOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </ul>
        )}
      </section>
      <section className="mt-10">
        <h2 className="text-lg font-bold text-navy">Pedidos</h2>
        {pedidos.length === 0 ? (
          <p className="mt-3 text-sm text-muted">Nenhum pedido convertido nesta aba.</p>
        ) : (
          <ul className="mt-3 grid gap-4">
            {pedidos.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
