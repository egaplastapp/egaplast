"use client";

import { useState } from "react";

const subjects = ["Cotação", "Parceria", "Assistência"];

export function ContactForm({ productName }: { productName?: string }) {
  const [sent, setSent] = useState(false);
  const initial = productName
    ? `Gostaria de condições comerciais para: ${productName}.`
    : "";

  if (sent) {
    return (
      <p className="border border-line bg-paper p-4 text-sm" role="status">
        Mensagem registrada só nesta tela. Nada foi enviado ao comercial, ao SAC ou ao WhatsApp.
      </p>
    );
  }

  return (
    <form
      className="grid gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <label className="grid gap-1 text-sm font-semibold text-navy">
        Nome
        <input required name="nome" className="border border-line px-3 py-2 font-normal" />
      </label>
      <label className="grid gap-1 text-sm font-semibold text-navy">
        Empresa
        <input required name="empresa" className="border border-line px-3 py-2 font-normal" />
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-semibold text-navy">
          Cidade
          <input required name="cidade" className="border border-line px-3 py-2 font-normal" />
        </label>
        <label className="grid gap-1 text-sm font-semibold text-navy">
          UF
          <input required name="uf" maxLength={2} className="border border-line px-3 py-2 font-normal uppercase" />
        </label>
      </div>
      <label className="grid gap-1 text-sm font-semibold text-navy">
        Telefone
        <input required name="telefone" type="tel" className="border border-line px-3 py-2 font-normal" />
      </label>
      <label className="grid gap-1 text-sm font-semibold text-navy">
        Assunto
        <select name="assunto" className="border border-line bg-white px-3 py-2 font-normal">
          {subjects.map((subject) => (
            <option key={subject}>{subject}</option>
          ))}
        </select>
      </label>
      <label className="grid gap-1 text-sm font-semibold text-navy">
        Mensagem
        <textarea
          required
          name="mensagem"
          rows={4}
          defaultValue={initial}
          className="border border-line px-3 py-2 font-normal"
        />
      </label>
      <button type="submit" className="mt-2 w-fit rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white">
        Registrar interesse
      </button>
    </form>
  );
}
