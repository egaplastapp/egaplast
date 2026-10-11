"use client";

import { useState } from "react";

const types = ["Loja de materiais", "Loja hidráulica", "Distribuidor", "Home center", "Outro"];

export function PartnerForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <p className="border border-line bg-paper p-4 text-sm" role="status">
        Registro guardado só nesta tela. Nada foi enviado. No site real, este formulário iria para
        comercial@egaplast.com.br.
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
        Tipo de negócio
        <select name="tipo" className="border border-line bg-white px-3 py-2 font-normal">
          {types.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </label>
      <button type="submit" className="mt-2 w-fit rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white">
        Quero falar com o comercial
      </button>
    </form>
  );
}
