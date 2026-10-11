"use client";

import Link from "next/link";
import { productById } from "@/lib/catalogo";
import { STATUS_LABEL, type PreOrderStatus } from "@/lib/types";
import { useDemo } from "@/lib/demo-store";

const statuses = Object.keys(STATUS_LABEL) as PreOrderStatus[];

export default function AdminPage() {
  const { role, orders, updateStatus } = useDemo();

  if (role !== "comercial") {
    return (
      <div className="max-w-xl">
        <h1 className="text-2xl font-bold text-navy">Painel comercial</h1>
        <p className="mt-3 text-ink">
          Esta porta não abre para o perfil de lojista. Volte à entrada e escolha o painel comercial. O
          protótipo não deixa alguém virar administrador editando o próprio cadastro.
        </p>
        <Link href="/portal/entrar" className="mt-4 inline-block font-semibold text-navy underline">
          Trocar a porta da demonstração
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-navy">Painel de demonstração</h1>
      <p className="mt-3 max-w-3xl text-ink">
        A troca de status fica registrada no histórico desta aba. Não há usuário administrativo, banco
        nem notificação.
      </p>
      <ul className="mt-8 grid gap-4">
        {orders.map((order) => (
          <li key={order.id} className="border border-line p-4">
            <h2 className="font-semibold text-navy">
              {order.protocol} · {STATUS_LABEL[order.status]}
            </h2>
            <ul className="mt-2 text-sm">
              {order.items.map((item) => (
                <li key={item.productId}>
                  {item.quantity} × {productById(item.productId)?.name ?? "Item"}
                </li>
              ))}
            </ul>
            <form
              key={`${order.id}-${order.history.length}`}
              className="mt-3 flex flex-wrap items-end gap-3"
              onSubmit={(event) => {
                event.preventDefault();
                const data = new FormData(event.currentTarget);
                const status = String(data.get("status")) as PreOrderStatus;
                const note = String(data.get("note") ?? "");
                updateStatus(order.id, status, note);
              }}
            >
              <label className="grid gap-1 text-sm font-semibold text-navy">
                Novo status
                <select name="status" defaultValue={order.status} className="border border-line bg-white px-2 py-2 font-normal">
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {STATUS_LABEL[status]}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid min-w-64 flex-1 gap-1 text-sm font-semibold text-navy">
                Nota
                <input name="note" className="border border-line px-2 py-2 font-normal" />
              </label>
              <button type="submit" className="rounded-md bg-navy px-3 py-2 text-sm font-semibold text-white">
                Atualizar
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
