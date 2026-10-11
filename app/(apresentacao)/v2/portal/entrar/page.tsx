"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDemo } from "@/lib/demo-store";

export default function V2EnterPage() {
  const { enter } = useDemo();
  const router = useRouter();

  return (
    <div className="mx-auto grid min-h-screen max-w-6xl content-center gap-10 px-4 py-16 lg:grid-cols-[1fr_1fr]">
      <div>
        <Link href="/v2">
          <Image src="/logo-egaplast.svg" alt="EGAPLAST" width={156} height={50} priority />
        </Link>
        <p className="mt-10 text-xs font-semibold uppercase tracking-[0.18em] text-navy">Demonstração</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-navy md:text-5xl">
          Duas portas. Nenhuma senha.
        </h1>
        <p className="mt-4 max-w-md text-lg leading-8 text-ink">
          Escolher um papel não altera um cadastro e não cria administrador. Recarregar a página apaga a
          sessão.
        </p>
      </div>
      <div className="grid gap-4">
        <button
          type="button"
          className="border border-line bg-white p-6 text-left shadow-[0_16px_40px_rgba(0,31,87,0.06)] hover:border-navy"
          onClick={() => {
            enter("lojista");
            router.push("/v2/portal");
          }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-navy">Loja</span>
          <span className="mt-2 block text-2xl font-extrabold tracking-tight text-navy">Entrar como lojista</span>
          <span className="mt-3 block leading-7 text-ink">
            Monta a lista de cotação, informa quantidade e acompanha o protocolo. Não abre o painel comercial.
          </span>
        </button>
        <button
          type="button"
          className="v2-stage p-6 text-left text-white"
          onClick={() => {
            enter("comercial");
            router.push("/v2/portal/admin");
          }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/80">Fábrica</span>
          <span className="mt-2 block text-2xl font-extrabold tracking-tight">Abrir painel comercial</span>
          <span className="mt-3 block leading-7 text-white/85">
            Vê as solicitações de exemplo e troca o status na hora. Não é um acesso de administrador real.
          </span>
        </button>
      </div>
    </div>
  );
}
