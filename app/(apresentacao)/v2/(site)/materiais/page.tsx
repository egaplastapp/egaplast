import { PageIntro } from "@/components/v2/public-chrome";

const files = [
  {
    name: "Guia de Produtos 2023/2024",
    detail: "PDF de 232 páginas, datado de 28 de agosto de 2023, ainda anunciado no site como edição 2023.",
    meta: "232 páginas",
  },
  {
    name: "Manual de identidade visual",
    detail: "Anunciado na página Downloads. O arquivo não estava liberado sem formulário.",
    meta: "Marca",
  },
  {
    name: "Fotos de produto aplicadas",
    detail: "A página Downloads mostra ducha, mecanismo, acabamento, sifão e kit de duplo acionamento.",
    meta: "Imagens",
  },
  {
    name: "Pontos de venda",
    detail: "Quatro expositores publicados: móvel grande, acrílico, loja grande e expositor alto.",
    meta: "PDV",
  },
];

export const metadata = { title: "Materiais" };

export default function V2MaterialsPage() {
  return (
    <div>
      <PageIntro
        kicker="Central"
        title="O que a loja usa para vender a marca."
        lead="Reunião do que a página Downloads já anuncia. Nesta demonstração o arquivo não baixa. O catálogo navegável está em Produtos."
      />
      <ul className="mx-auto grid max-w-6xl gap-4 px-4 py-12 md:grid-cols-2">
        {files.map((file) => (
          <li key={file.name} className="flex flex-col border border-line bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy">{file.meta}</p>
            <h2 className="mt-3 text-xl font-bold text-navy">{file.name}</h2>
            <p className="mt-3 flex-1 text-sm leading-6 text-ink">{file.detail}</p>
            <p className="mt-6 border-t border-line pt-4 text-sm font-semibold text-navy">
              Download indisponível no protótipo
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
