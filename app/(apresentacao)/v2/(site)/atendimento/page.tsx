import { V2ContactForm } from "@/components/v2/forms";
import { PageIntro } from "@/components/v2/public-chrome";

export const metadata = { title: "Atendimento" };

const channels = [
  {
    title: "Cotação e parceria",
    text: "comercial@egaplast.com.br · (61) 3386-5266 e (61) 3386-7507.",
  },
  {
    title: "SAC",
    text: "(61) 9871-9098 e sac@egaplast.com.br para dúvida, elogio e reclamação.",
  },
  {
    title: "Assistência",
    text: "A assistência técnica é atendida pelo SAC.",
  },
  {
    title: "Arquivos de marca",
    text: "Marketing: +55 61 99643-3078.",
  },
];

export default function V2ContactPage() {
  return (
    <div>
      <PageIntro
        kicker="Atendimento"
        title="Um caminho para cada assunto."
        lead="Cotação, parceria e assistência. Informe os dados da loja para o comercial retornar."
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[0.85fr_1.15fr]">
        <ul className="grid content-start gap-4">
          {channels.map((channel) => (
            <li key={channel.title} className="border border-line bg-white p-5">
              <h2 className="font-bold text-navy">{channel.title}</h2>
              <p className="mt-2 text-sm leading-6 text-ink">{channel.text}</p>
            </li>
          ))}
        </ul>
        <V2ContactForm />
      </div>
    </div>
  );
}
