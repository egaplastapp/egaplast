"use client";

import { useState, type FormEvent } from "react";
import { categories } from "@/lib/catalogo";
import { useDemo } from "@/lib/demo-store";
import { formatPhone, kindLabel } from "@/lib/loja";

const field = "border border-line bg-white px-3 py-2 font-normal text-ink";

export default function V2StoreDataPage() {
  const { role, stores, currentStoreId, updateOwnContact } = useDemo();
  const store = stores.find((item) => item.id === currentStoreId) ?? null;
  const [whatsapp, setWhatsapp] = useState(store?.whatsapp ?? "");
  const [email, setEmail] = useState(store?.email ?? "");
  const [interests, setInterests] = useState<string[]>(store?.interests ?? []);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  if (role !== "lojista" || !store) return null;

  function toggleInterest(id: string) {
    setSaved(false);
    setInterests((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const result = updateOwnContact({ whatsapp, email, interests });
    if (!result.ok) {
      setSaved(false);
      setError(result.message);
      return;
    }
    setError("");
    setSaved(true);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy">Loja</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-navy">Meus dados</h1>
      <p className="mt-2 text-sm leading-6 text-ink">
        WhatsApp, e-mail e linhas de interesse podem mudar. Nome, CNPJ, cidade, UF e tipo ficam como no
        cadastro. Isso não abre o painel comercial.
      </p>

      <dl className="mt-6 grid gap-3 border border-line bg-white p-5 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-muted">Nome fantasia</dt>
          <dd className="font-semibold text-navy">{store.tradeName}</dd>
        </div>
        <div>
          <dt className="text-muted">CNPJ</dt>
          <dd className="font-semibold text-navy">{store.cnpj}</dd>
        </div>
        <div>
          <dt className="text-muted">Cidade</dt>
          <dd className="font-semibold text-navy">
            {store.city} - {store.state}
          </dd>
        </div>
        <div>
          <dt className="text-muted">Tipo</dt>
          <dd className="font-semibold text-navy">{kindLabel(store.kind)}</dd>
        </div>
        <div>
          <dt className="text-muted">Quem compra</dt>
          <dd className="font-semibold text-navy">{store.buyerName}</dd>
        </div>
      </dl>
      {store.seeded ? (
        <p className="mt-3 text-xs leading-5 text-muted">
          Empresa fictícia, usada só nesta demonstração. Não é um cliente da EGAPLAST.
        </p>
      ) : null}

      <form onSubmit={submit} className="mt-6 border border-line bg-white p-5">
        <label className="grid gap-1 text-sm font-semibold text-navy">
          WhatsApp
          <input
            value={whatsapp}
            onChange={(event) => {
              setSaved(false);
              setWhatsapp(formatPhone(event.target.value));
            }}
            inputMode="tel"
            className={field}
          />
        </label>
        <label className="mt-4 grid gap-1 text-sm font-semibold text-navy">
          E-mail
          <input
            value={email}
            onChange={(event) => {
              setSaved(false);
              setEmail(event.target.value);
            }}
            type="email"
            className={field}
          />
        </label>
        <fieldset className="mt-4">
          <legend className="text-sm font-semibold text-navy">Linhas de interesse</legend>
          <div className="mt-2 grid gap-2">
            {categories.map((category) => (
              <label key={category.id} className="flex items-start gap-2 text-sm text-ink">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={interests.includes(category.id)}
                  onChange={() => toggleInterest(category.id)}
                />
                {category.name}
              </label>
            ))}
          </div>
        </fieldset>
        {error ? (
          <p className="mt-4 text-sm font-semibold text-navy" role="alert">
            {error}
          </p>
        ) : null}
        {saved ? <p className="mt-4 text-sm font-semibold text-navy">Contato atualizado nesta sessão.</p> : null}
        <button type="submit" className="mt-5 rounded-sm bg-navy px-4 py-3 text-sm font-semibold text-white">
          Salvar contato
        </button>
      </form>
    </div>
  );
}
