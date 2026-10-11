import { V2PartnerForm } from "@/components/v2/forms";
import { PageIntro } from "@/components/v2/public-chrome";

export const metadata = { title: "Para a sua loja" };

const steps = [
  { title: "Quem atende", text: "Loja de materiais, loja hidráulica, distribuidor, home center e representante." },
  { title: "O que consultar", text: "As linhas, a aplicação e as medidas de cada ficha." },
  { title: "Como seguir", text: "O comercial apresenta mix e condição. O preço não fica publicado no site." },
];

export default function V2PartnerPage() {
  return (
    <div>
      <PageIntro
        kicker="Parceria"
        title="Sua loja revende. O comercial apresenta a condição."
        lead="Informe a empresa, a cidade e o telefone. O atendimento é para quem revende."
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[1fr_0.9fr]">
        <ol className="grid content-start gap-4">
          {steps.map((step, index) => (
            <li key={step.title} className="border border-line bg-white p-5">
              <p className="text-xs font-bold tracking-widest text-navy">{String(index + 1).padStart(2, "0")}</p>
              <h2 className="mt-2 text-lg font-bold text-navy">{step.title}</h2>
              <p className="mt-2 text-sm leading-6 text-ink">{step.text}</p>
            </li>
          ))}
        </ol>
        <V2PartnerForm />
      </div>
    </div>
  );
}
