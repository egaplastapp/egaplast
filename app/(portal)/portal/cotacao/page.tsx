"use client";

import Link from "next/link";
import { useState } from "react";
import { productById } from "@/lib/catalogo";
import { DEMO_COMPANY } from "@/lib/types";
import { useDemo } from "@/lib/demo-store";

export default function QuotePage() {
  const {
    role,
    draft,
    draftObservation,
    setDraftObservation,
    setQuantity,
    setItemNote,
    removeItem,
    submitDraft,
  } = useDemo();
  const [protocol, setProtocol] = useState<string | null>(null);

  if (!role) return null;

  if (protocol) {
    return (
      <div className="max-w-xl">
        <h1 className="text-3xl font-bold text-navy">Solicitação registrada na demonstração</h1>
        <p className="mt-4 text-lg font-semibold text-navy">Protocolo {protocol}</p>
        <p className="mt-3 text-ink">
          O status inicial é enviado. Isso não confirma venda, não reserva estoque e não define preço.
          O número existe só nesta aba do navegador.
        </p>
        <Link href="/portal/historico" className="mt-4 inline-block font-semibold text-navy underline">
          Ver histórico
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-3xl font-bold text-navy">Lista de cotação</h1>
        <p className="mt-3 text-ink">Rascunho local. Enviar muda o status para enviado, sem valor fechado.</p>
      </div>

      {draft.length === 0 ? (
        <p className="border border-line p-4 text-sm">
          A lista está vazia.{" "}
          <Link href="/portal" className="font-semibold text-navy underline">
            Escolher produtos
          </Link>
        </p>
      ) : (
        <ul className="grid gap-4">
          {draft.map((item) => {
            const product = productById(item.productId);
            return (
              <li key={item.productId} className="border border-line p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="font-semibold text-navy">{product?.name ?? "Item"}</h2>
                    <p className="text-sm text-muted">Sob consulta</p>
                  </div>
                  <button type="button" className="text-sm underline" onClick={() => removeItem(item.productId)}>
                    Remover
                  </button>
                </div>
                <label className="mt-3 grid max-w-xs gap-1 text-sm font-semibold text-navy">
                  Quantidade
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(event) => setQuantity(item.productId, Number(event.target.value))}
                    className="border border-line px-3 py-2 font-normal"
                  />
                </label>
                <label className="mt-3 grid gap-1 text-sm font-semibold text-navy">
                  Observação do item
                  <input
                    value={item.note}
                    onChange={(event) => setItemNote(item.productId, event.target.value)}
                    className="border border-line px-3 py-2 font-normal"
                  />
                </label>
              </li>
            );
          })}
        </ul>
      )}

      <section className="max-w-xl border border-line p-4">
        <h2 className="font-semibold text-navy">Empresa da demonstração</h2>
        <p className="mt-2 text-sm">{DEMO_COMPANY.name}</p>
        <p className="text-sm">
          {DEMO_COMPANY.city} - {DEMO_COMPANY.state} · {DEMO_COMPANY.phone}
        </p>
        <p className="mt-2 text-xs text-muted">{DEMO_COMPANY.note}</p>
        <label className="mt-4 grid gap-1 text-sm font-semibold text-navy">
          Observação da solicitação
          <textarea
            rows={3}
            value={draftObservation}
            onChange={(event) => setDraftObservation(event.target.value)}
            className="border border-line px-3 py-2 font-normal"
          />
        </label>
        <button
          type="button"
          disabled={draft.length === 0}
          className="mt-4 rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
          onClick={() => {
            const order = submitDraft();
            if (order) setProtocol(order.protocol);
          }}
        >
          Enviar solicitação
        </button>
      </section>
    </div>
  );
}
