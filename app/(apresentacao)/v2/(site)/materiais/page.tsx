import Link from "next/link";
import { PageIntro } from "@/components/v2/public-chrome";

const files = [
  {
    name: "Guia de Produtos 2023/2024",
    detail: "Catálogo da linha hidrossanitária, edição 2023.",
    meta: "Catálogo",
  },
  {
    name: "Manual de identidade visual",
    detail: "Arquivos da marca para comunicação da loja.",
    meta: "Marca",
  },
  {
    name: "Fotos de produto",
    detail: "Imagens de ducha, mecanismo, acabamento e kit de duplo acionamento.",
    meta: "Imagens",
  },
  {
    name: "Expositores",
    detail: "Móvel, acrílico e expositor alto para o ponto de venda.",
    meta: "PDV",
  },
];

export const metadata = { title: "Materiais" };

export default function V2MaterialsPage() {
  return (
    <div>
      <PageIntro
        kicker="Materiais"
        title="O que a loja usa para apresentar a marca."
        lead="O guia, a identidade e as fotos de produto são enviados pelo comercial. O catálogo para consulta de referência está em Produtos."
      />
      <ul className="mx-auto grid max-w-6xl gap-4 px-4 py-12 md:grid-cols-2">
        {files.map((file) => (
          <li key={file.name} className="flex flex-col border border-line bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy">{file.meta}</p>
            <h2 className="mt-3 text-xl font-bold text-navy">{file.name}</h2>
            <p className="mt-3 flex-1 text-sm leading-6 text-ink">{file.detail}</p>
            <Link
              href="/v2/atendimento"
              className="mt-6 w-fit rounded-sm bg-navy px-4 py-2.5 text-sm font-semibold text-white"
            >
              Solicitar ao comercial
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
