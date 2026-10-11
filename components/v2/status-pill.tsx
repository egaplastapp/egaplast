import { STATUS_LABEL, type PreOrderStatus } from "@/lib/types";

const tone: Record<PreOrderStatus, string> = {
  rascunho: "bg-[#e6ebf4] text-navy",
  enviado: "bg-navy text-white",
  em_analise: "bg-[#163f93] text-white",
  aguardando_informacoes: "bg-[#fff1dc] text-[#5c3200]",
  aprovado: "bg-[#0e6a43] text-white",
  rejeitado: "bg-[#8d1d2c] text-white",
  cancelado: "bg-[#4e5668] text-white",
};

export function StatusPill({ status }: { status: PreOrderStatus }) {
  return (
    <span className={`inline-flex items-center rounded-sm px-2.5 py-1 text-xs font-semibold ${tone[status]}`}>
      {STATUS_LABEL[status]}
    </span>
  );
}

export function formatWhen(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(iso));
}
