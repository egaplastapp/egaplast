"use client";

import { useRouter } from "next/navigation";
import { useDemo } from "@/lib/demo-store";

export default function EnterPage() {
  const { enter } = useDemo();
  const router = useRouter();

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold text-navy">Entrar na demonstração</h1>
      <p className="mt-3 text-ink">
        Não há conta, senha nem Supabase. Escolher um papel aqui não altera um perfil: são duas portas
        da mesma apresentação. Recarregar a página apaga a sessão.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          className="border border-line p-4 text-left hover:border-navy"
          onClick={() => {
            enter("lojista");
            router.push("/portal");
          }}
        >
          <span className="block font-semibold text-navy">Entrar como lojista</span>
          <span className="mt-2 block text-sm text-ink">
            Monta uma lista de cotação e acompanha o protocolo. Não abre o painel comercial.
          </span>
        </button>
        <button
          type="button"
          className="border border-line p-4 text-left hover:border-navy"
          onClick={() => {
            enter("comercial");
            router.push("/portal/admin");
          }}
        >
          <span className="block font-semibold text-navy">Abrir painel comercial</span>
          <span className="mt-2 block text-sm text-ink">
            Vê as solicitações de exemplo e troca o status. Não é um acesso de administrador real.
          </span>
        </button>
      </div>
    </div>
  );
}
