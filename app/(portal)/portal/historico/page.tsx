"use client";

import { productById } from "@/lib/catalogo";
import { STATUS_LABEL } from "@/lib/types";
import { useDemo } from "@/lib/demo-store";

function formatWhen(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(iso));
}

export default function HistoryPage() {
  const { role, orders } = useDemo();
  if (!role) return null;

  return (
    <div>
      <h1 className="text-3xl font-bold text-navy">Histórico</h1>
      <p className="mt-3 max-w-3xl text-ink">
        Dois protocolos de exemplo já estão na lista. Os que você enviar nesta aba entram junto. Tudo
        some ao recarregar.
      </p>
      <ul className="mt-8 grid gap-4">
        {orders.map((order) => (
          <li key={order.id} className="border border-line p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-lg font-semibold text-navy">{order.protocol}</h2>
              <p className="text-sm font-semibold">{STATUS_LABEL[order.status]}</p>
            </div>
            <p className="mt-1 text-xs text-muted">
              {formatWhen(order.createdAt)}
              {order.seeded ? " · exemplo" : " · criado nesta sessão"}
            </p>
            <ul className="mt-3 text-sm">
              {order.items.map((item) => {
                const product = productById(item.productId);
                return (
                  <li key={item.productId}>
                    {item.quantity} × {product?.name ?? "Item"}
                    {item.note ? ` — ${item.note}` : ""}
                  </li>
                );
              })}
            </ul>
            {order.observation ? <p className="mt-2 text-sm text-ink">{order.observation}</p> : null}
            <ol className="mt-3 space-y-1 text-xs text-muted">
              {order.history.map((change) => (
                <li key={`${change.at}-${change.to}`}>
                  {formatWhen(change.at)} · {change.from ? STATUS_LABEL[change.from] : "início"} →{" "}
                  {STATUS_LABEL[change.to]}. {change.note}
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ul>
    </div>
  );
}
