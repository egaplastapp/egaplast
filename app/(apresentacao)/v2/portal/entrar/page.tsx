"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { categories } from "@/lib/catalogo";
import { useDemo } from "@/lib/demo-store";
import { formatCnpj, formatPhone, STORE_KINDS, UFS } from "@/lib/loja";

const field = "border border-line bg-white px-3 py-2 font-normal text-ink";

export default function V2EnterPage() {
  const { enter, registerStore } = useDemo();
  const router = useRouter();
  const [tradeName, setTradeName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("DF");
  const [buyerName, setBuyerName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [kind, setKind] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [error, setError] = useState("");

  function toggleInterest(id: string) {
    setInterests((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const result = registerStore({
      tradeName,
      cnpj,
      city,
      state,
      buyerName,
      whatsapp,
      email,
      kind,
      interests,
    });
    if (!result.ok) {
      setError(result.message);
      return;
    }
    router.push("/v2/portal");
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:py-16">
      <div>
        <Link href="/v2">
          <Image src="/logo-egaplast.svg" alt="EGAPLAST" width={156} height={50} priority className="h-auto w-[156px]" />
        </Link>
        <p className="mt-10 text-xs font-semibold uppercase tracking-[0.18em] text-navy">Demonstração</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-navy md:text-5xl">
          A loja se apresenta. Depois pede.
        </h1>
        <p className="mt-4 max-w-md text-lg leading-8 text-ink">
          O cadastro libera o pré-pedido na hora. Não cria senha e não abre o painel comercial. Recarregar a
          página apaga a sessão.
        </p>
        <p className="mt-4 max-w-md text-sm leading-6 text-ink">
          Se o CNPJ já entrou nesta sessão e a loja segue ativa, o mesmo número entra de novo. A fábrica
          continua em um clique, sem cadastro.
        </p>
        <button
          type="button"
          className="v2-stage mt-8 w-full p-6 text-left text-white sm:w-auto"
          onClick={() => {
            enter("comercial");
            router.push("/v2/portal/admin");
          }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/80">Fábrica</span>
          <span className="mt-2 block text-2xl font-extrabold tracking-tight">Abrir painel comercial</span>
          <span className="mt-3 block leading-7 text-white/85">
            Vê as lojas e as solicitações de exemplo. Não é um acesso de administrador real.
          </span>
        </button>
      </div>

      <form onSubmit={submit} className="border border-line bg-white p-5 shadow-[0_16px_40px_rgba(0,31,87,0.06)] sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy">Loja</p>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-navy">Cadastro para pedir</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1 text-sm font-semibold text-navy sm:col-span-2">
            Nome fantasia
            <input value={tradeName} onChange={(event) => setTradeName(event.target.value)} className={field} autoComplete="organization" />
          </label>
          <label className="grid gap-1 text-sm font-semibold text-navy">
            CNPJ
            <input
              value={cnpj}
              onChange={(event) => setCnpj(formatCnpj(event.target.value))}
              inputMode="numeric"
              className={field}
              placeholder="00.000.000/0000-00"
            />
          </label>
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
          <label className="grid gap-1 text-sm font-semibold text-navy">
            Quem compra
            <input value={buyerName} onChange={(event) => setBuyerName(event.target.value)} className={field} />
          </label>
          <label className="grid gap-1 text-sm font-semibold text-navy">
            WhatsApp
            <input
              value={whatsapp}
              onChange={(event) => setWhatsapp(formatPhone(event.target.value))}
              inputMode="tel"
              className={field}
              placeholder="(61) 90000-0000"
            />
          </label>
          <label className="grid gap-1 text-sm font-semibold text-navy sm:col-span-2">
            E-mail
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" className={field} />
          </label>
          <label className="grid gap-1 text-sm font-semibold text-navy sm:col-span-2">
            Tipo da loja
            <select value={kind} onChange={(event) => setKind(event.target.value)} className={field}>
              <option value="">Escolha</option>
              {STORE_KINDS.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <fieldset className="mt-4">
          <legend className="text-sm font-semibold text-navy">Linhas de interesse</legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
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
        <button type="submit" className="mt-5 w-full rounded-sm bg-navy px-4 py-3 text-sm font-semibold text-white">
          Entrar e montar o pré-pedido
        </button>
      </form>
    </div>
  );
}
