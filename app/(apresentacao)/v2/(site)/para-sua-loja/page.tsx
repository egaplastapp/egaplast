import { V2PartnerForm } from "@/components/v2/forms";
import { PageIntro } from "@/components/v2/public-chrome";

export const metadata = { title: "Para a sua loja" };

const limits = [
  "Margem, exclusividade de praça ou giro de estoque.",
  "Prazo de entrega e frete.",
  "Tabela de preço visível.",
  "Treinamento ou material além do que já existe no site atual.",
];

export default function V2PartnerPage() {
  return (
    <div>
      <PageIntro
        kicker="Parceria"
        title="Sua loja revende. O comercial apresenta a condição."
        lead="Envie o nome da empresa, a cidade e o telefone. Pessoa física não compra por este site. Não há mapa de representantes nem lista de lojas, porque a EGAPLAST ainda não entregou essa base."
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[1fr_0.9fr]">
        <article>
          <h2 className="text-xl font-bold text-navy">O que esta página não promete</h2>
          <ul className="mt-5 grid gap-3">
            {limits.map((item) => (
              <li key={item} className="border border-line bg-white px-4 py-3 text-sm leading-6">
                {item}
              </li>
            ))}
          </ul>
        </article>
        <V2PartnerForm />
      </div>
    </div>
  );
}
