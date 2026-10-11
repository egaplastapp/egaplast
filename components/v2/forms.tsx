"use client";

import { useState } from "react";

const field = "w-full border border-line bg-white px-3 py-2.5 text-sm font-normal text-ink";
const label = "grid gap-1.5 text-sm font-semibold text-navy";

export function V2ContactForm({ productName }: { productName?: string }) {
  const [sent, setSent] = useState(false);
  const initial = productName ? `Gostaria de condições comerciais para: ${productName}.` : "";

  if (sent) {
    return (
      <p className="border border-navy bg-white p-5 text-sm leading-6" role="status">
        Interesse registrado. O comercial atende em comercial@egaplast.com.br e nos telefones (61)
        3386-5266 e (61) 3386-7507.
      </p>
    );
  }

  return (
    <form
      className="grid gap-4 border border-line bg-white p-5 shadow-[0_16px_40px_rgba(0,31,87,0.06)]"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy">Falar com o comercial</p>
        <p className="mt-2 text-sm leading-6 text-muted">
          Informe os dados da loja. O comercial retorna com a condição.
        </p>
      </div>
      <label className={label}>
        Nome
        <input required name="nome" className={field} />
      </label>
      <label className={label}>
        Empresa
        <input required name="empresa" className={field} />
      </label>
      <div className="grid gap-4 sm:grid-cols-[1fr_5rem]">
        <label className={label}>
          Cidade
          <input required name="cidade" className={field} />
        </label>
        <label className={label}>
          UF
          <input required name="uf" maxLength={2} className={`${field} uppercase`} />
        </label>
      </div>
      <label className={label}>
        Telefone
        <input required name="telefone" type="tel" className={field} />
      </label>
      <label className={label}>
        Assunto
        <select name="assunto" className={field}>
          {["Cotação", "Parceria", "Assistência"].map((subject) => (
            <option key={subject}>{subject}</option>
          ))}
        </select>
      </label>
      <label className={label}>
        Mensagem
        <textarea required name="mensagem" rows={4} defaultValue={initial} className={field} />
      </label>
      <button type="submit" className="w-fit rounded-sm bg-navy px-5 py-3 text-sm font-semibold text-white">
        Registrar interesse
      </button>
    </form>
  );
}

export function V2PartnerForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <p className="border border-navy bg-white p-5 text-sm leading-6" role="status">
        Pedido de contato registrado. O comercial atende em comercial@egaplast.com.br e nos telefones
        (61) 3386-5266 e (61) 3386-7507.
      </p>
    );
  }

  return (
    <form
      className="grid gap-4 border-t-4 border-orange bg-white p-5 shadow-[0_16px_40px_rgba(0,31,87,0.08)]"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <p className="text-lg font-bold text-navy">Dados da loja</p>
      <label className={label}>
        Empresa
        <input required name="empresa" className={field} />
      </label>
      <div className="grid gap-4 sm:grid-cols-[1fr_5rem]">
        <label className={label}>
          Cidade
          <input required name="cidade" className={field} />
        </label>
        <label className={label}>
          UF
          <input required name="uf" maxLength={2} className={`${field} uppercase`} />
        </label>
      </div>
      <label className={label}>
        Telefone
        <input required name="telefone" type="tel" className={field} />
      </label>
      <label className={label}>
        Tipo de negócio
        <select name="tipo" className={field}>
          {["Loja de materiais", "Loja hidráulica", "Distribuidor", "Home center", "Outro"].map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </label>
      <button type="submit" className="w-fit rounded-sm bg-navy px-5 py-3 text-sm font-semibold text-white">
        Quero falar com o comercial
      </button>
    </form>
  );
}
