const files = [
  {
    name: "Guia de Produtos 2023/2024",
    detail: "PDF de 232 páginas, datado de 28 de agosto de 2023, ainda anunciado no site como edição 2023.",
  },
  {
    name: "Manual de identidade visual",
    detail: "Anunciado na página Downloads. O arquivo não estava liberado sem formulário.",
  },
  {
    name: "Fotos de produto aplicadas",
    detail: "A página Downloads mostra ducha, mecanismo, acabamento, sifão e kit de duplo acionamento.",
  },
  {
    name: "Pontos de venda",
    detail: "Quatro expositores publicados: móvel grande, acrílico, loja grande e expositor alto.",
  },
];

export const metadata = { title: "Materiais" };

export default function MaterialsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-navy">Central de materiais</h1>
      <p className="mt-3 max-w-3xl text-ink">
        Reunião do que a página Downloads já anuncia. Nesta demonstração o botão não baixa arquivo. O
        catálogo navegável está em Produtos.
      </p>
      <ul className="mt-8 grid gap-4">
        {files.map((file) => (
          <li key={file.name} className="border border-line p-4">
            <h2 className="font-semibold text-navy">{file.name}</h2>
            <p className="mt-2 text-sm text-ink">{file.detail}</p>
            <p className="mt-3 text-sm font-semibold text-muted">Download indisponível no protótipo</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
