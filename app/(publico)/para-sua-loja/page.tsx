import { PartnerForm } from "@/components/partner-form";

export const metadata = { title: "Para a sua loja" };

export default function PartnerPage() {
  return (
    <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
      <article>
        <h1 className="text-3xl font-bold text-navy">Para a sua loja</h1>
        <p className="mt-4 text-ink">
          Sua loja revende material de construção ou produtos hidráulicos? Envie o nome da empresa, a
          cidade e o telefone. O comercial apresenta o mix e as condições de fornecimento.
        </p>
        <p className="mt-3 text-ink">
          Pessoa física não compra por este site. O caminho publicado até aqui é a conversa comercial
          com a fábrica. Não há mapa de representantes nem lista de lojas, porque a EGAPLAST ainda não
          entregou essa base.
        </p>
        <h2 className="mt-8 text-xl font-bold text-navy">O que esta página não promete</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-ink">
          <li>Margem, exclusividade de praça ou giro de estoque.</li>
          <li>Prazo de entrega e frete.</li>
          <li>Tabela de preço visível.</li>
          <li>Treinamento ou material além do que já existe no site atual.</li>
        </ul>
      </article>
      <PartnerForm />
    </div>
  );
}
