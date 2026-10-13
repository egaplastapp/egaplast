"use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import { categories } from "@/lib/catalogo";
import { useDemo } from "@/lib/demo-store";
import { formatCnpj, formatPhone, kindLabel, STORE_KINDS, STORE_STATUS_LABEL, UFS } from "@/lib/loja";
import type { PreOrder, RetailStore, StoreKind, StoreStatus } from "@/lib/types";
import { StatusPill } from "@/components/v2/status-pill";

const field = "border border-line bg-white px-3 py-2 font-normal text-ink";

export default function V2StoresPage() {
  const { role, stores, orders, updateStore, setStoreStatus } = useDemo();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"todos" | StoreStatus>("todos");
  const [kind, setKind] = useState<"todos" | StoreKind>("todos");
  const [selectedId, setSelectedId] = useState(stores[0]?.id ?? "");

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase().replace(/\D/g, "").length > 0 && /^[\d.\-/ ]+$/.test(query.trim())
      ? query.replace(/\D/g, "")
      : query.trim().toLowerCase();
    return stores.filter((store) => {
      if (status !== "todos" && store.status !== status) return false;
      if (kind !== "todos" && store.kind !== kind) return false;
      if (!term) return true;
      if (/^\d+$/.test(term)) return store.cnpj.replace(/\D/g, "").includes(term);
      const blob = `${store.tradeName} ${store.city} ${store.cnpj}`.toLowerCase();
      return blob.includes(term);
    });
  }, [stores, query, status, kind]);

  if (role !== "comercial") {
    return (
      <div className="max-w-xl border border-line bg-white p-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-navy">Lojas</h1>
        <p className="mt-3 leading-7 text-ink">
          A loja consulta o próprio cadastro. Ver a lista, corrigir e pausar uma loja fica com o comercial.
        </p>
        <Link href="/v2/portal" className="mt-5 inline-flex rounded-sm bg-navy px-5 py-3 text-sm font-semibold text-white">
          Voltar ao catálogo
        </Link>
      </div>
    );
  }

  const selected = stores.find((store) => store.id === selectedId) ?? null;

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy">Abordagem</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-navy">Lojas</h1>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-ink">
        Cada loja entra ativa e já pode pedir. Aqui o comercial corrige o cadastro ou marca inativa. Não há
        exclusão. Recarregar apaga a sessão.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div>
          <div className="grid gap-3 sm:grid-cols-[1fr_9rem_1fr]">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Nome, cidade ou CNPJ"
              className={field}
            />
            <select value={status} onChange={(event) => setStatus(event.target.value as "todos" | StoreStatus)} className={field}>
              <option value="todos">Todos os status</option>
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </select>
            <select value={kind} onChange={(event) => setKind(event.target.value as "todos" | StoreKind)} className={field}>
              <option value="todos">Todos os tipos</option>
              {STORE_KINDS.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {visible.length === 0 ? (
            <p className="mt-4 border border-line bg-white p-5 text-sm text-ink">Nenhuma loja corresponde a esta busca.</p>
          ) : (
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {visible.map((store) => {
                const ordered = orders.some((order) => order.storeId === store.id);
                const current = store.id === selectedId;
                return (
                  <li key={store.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(store.id)}
                      className={`h-full w-full border bg-white p-4 text-left ${current ? "border-navy ring-2 ring-navy" : "border-line"}`}
                    >
                      <span className="block font-bold text-navy">{store.tradeName}</span>
                      <span className="mt-1 block text-sm text-ink">
                        {store.city} - {store.state}
                      </span>
                      <span className="mt-1 block text-sm text-muted">{store.cnpj}</span>
                      <span className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
                        <span className="bg-[#e7edf8] px-2 py-1 text-navy">{STORE_STATUS_LABEL[store.status]}</span>
                        <span className="bg-[#e7edf8] px-2 py-1 text-navy">{ordered ? "Já enviou pré-pedido" : "Ainda não pediu"}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {selected ? (
          <StoreSheet
            key={selected.id}
            store={selected}
            orders={orders.filter((order) => order.storeId === selected.id)}
            onSave={(input) => updateStore(selected.id, input)}
            onStatus={(next) => setStoreStatus(selected.id, next)}
          />
        ) : (
          <p className="border border-line bg-white p-5 text-sm text-ink">Escolha uma loja para ver a ficha.</p>
        )}
      </div>
    </div>
  );
}

function StoreSheet({
  store,
  orders,
  onSave,
  onStatus,
}: {
  store: RetailStore;
  orders: PreOrder[];
  onSave: (input: {
    tradeName: string;
    cnpj: string;
    city: string;
    state: string;
    buyerName: string;
    whatsapp: string;
    email: string;
    kind: string;
    interests: string[];
  }) => { ok: true } | { ok: false; message: string };
  onStatus: (status: StoreStatus) => void;
}) {
  const [tradeName, setTradeName] = useState(store.tradeName);
  const [cnpj, setCnpj] = useState(store.cnpj);
  const [city, setCity] = useState(store.city);
  const [state, setState] = useState(store.state);
  const [buyerName, setBuyerName] = useState(store.buyerName);
  const [whatsapp, setWhatsapp] = useState(store.whatsapp);
  const [email, setEmail] = useState(store.email);
  const [kind, setKind] = useState(store.kind);
  const [interests, setInterests] = useState(store.interests);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  function submit(event: FormEvent) {
    event.preventDefault();
    const result = onSave({ tradeName, cnpj, city, state, buyerName, whatsapp, email, kind, interests });
    if (!result.ok) {
      setSaved(false);
      setError(result.message);
      return;
    }
    setError("");
    setSaved(true);
  }

  return (
    <form id="loja-form" onSubmit={submit} className="border border-line bg-white p-5 lg:sticky lg:top-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-extrabold tracking-tight text-navy">Ficha da loja</h2>
        <span className="bg-[#e7edf8] px-2 py-1 text-xs font-semibold text-navy">{STORE_STATUS_LABEL[store.status]}</span>
      </div>
      <p className="mt-2 text-sm text-ink">{kindLabel(store.kind)}</p>
      <p className="mt-1 text-sm font-semibold text-navy">
        {orders.length > 0 ? "Já enviou pré-pedido" : "Ainda não pediu"}
      </p>
      {store.seeded ? (
        <p className="mt-2 text-xs leading-5 text-muted">
          Empresa fictícia, usada só nesta demonstração. Não é um cliente da EGAPLAST.
        </p>
      ) : null}

      <div className="mt-4 grid gap-3">
        <label className="grid gap-1 text-sm font-semibold text-navy">
          Nome fantasia
          <input value={tradeName} onChange={(event) => setTradeName(event.target.value)} className={field} />
        </label>
        <label className="grid gap-1 text-sm font-semibold text-navy">
          CNPJ
          <input value={cnpj} onChange={(event) => setCnpj(formatCnpj(event.target.value))} inputMode="numeric" className={field} />
        </label>
        <div className="grid gap-3 sm:grid-cols-[1fr_6rem]">
          <label className="grid gap-1 text-sm font-semibold text-navy">
            Cidade
            <input value={city} onChange={(event) => setCity(event.target.value)} className={field} />
          </label>
          <label className="grid gap-1 text-sm font-semibold text-navy">
            UF
            <select value={state} onChange={(event) => setState(event.target.value)} className={field}>
              {UFS.map((uf) => (
                <option key={uf} value={uf}>
                  {uf}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="grid gap-1 text-sm font-semibold text-navy">
          Quem compra
          <input value={buyerName} onChange={(event) => setBuyerName(event.target.value)} className={field} />
        </label>
        <label className="grid gap-1 text-sm font-semibold text-navy">
          WhatsApp
          <input value={whatsapp} onChange={(event) => setWhatsapp(formatPhone(event.target.value))} inputMode="tel" className={field} />
        </label>
        <label className="grid gap-1 text-sm font-semibold text-navy">
          E-mail
          <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" className={field} />
        </label>
        <label className="grid gap-1 text-sm font-semibold text-navy">
          Tipo da loja
          <select value={kind} onChange={(event) => setKind(event.target.value as StoreKind)} className={field}>
            {STORE_KINDS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <fieldset>
          <legend className="text-sm font-semibold text-navy">Linhas de interesse</legend>
          <div className="mt-2 grid gap-2">
            {categories.map((category) => (
              <label key={category.id} className="flex items-start gap-2 text-sm text-ink">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={interests.includes(category.id)}
                  onChange={() =>
                    setInterests((current) =>
                      current.includes(category.id) ? current.filter((id) => id !== category.id) : [...current, category.id],
                    )
                  }
                />
                {category.name}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {orders.length > 0 ? (
        <ul className="mt-4 grid gap-2 border-t border-line pt-4">
          {orders.map((order) => (
            <li key={order.id} className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <span className="font-semibold text-navy">{order.protocol}</span>
              <StatusPill status={order.status} />
            </li>
          ))}
        </ul>
      ) : null}

      {error ? (
        <p className="mt-3 text-sm font-semibold text-navy" role="alert">
          {error}
        </p>
      ) : null}
      {saved ? <p className="mt-3 text-sm font-semibold text-navy">Ficha atualizada nesta sessão.</p> : null}

      <div className="mt-4 flex flex-wrap gap-3">
        <button type="submit" className="rounded-sm bg-navy px-4 py-3 text-sm font-semibold text-white">
          Salvar correção
        </button>
        <button
          type="button"
          className="rounded-sm border border-navy px-4 py-3 text-sm font-semibold text-navy"
          onClick={() => onStatus(store.status === "ativo" ? "inativo" : "ativo")}
        >
          {store.status === "ativo" ? "Marcar inativa" : "Reativar"}
        </button>
      </div>
    </form>
  );
}
