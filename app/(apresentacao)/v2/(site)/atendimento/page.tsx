import { V2ContactForm } from "@/components/v2/forms";
import { PageIntro } from "@/components/v2/public-chrome";

export const metadata = { title: "Atendimento" };

const channels = [
  {
    title: "Cotação e parceria",
    text: "comercial@egaplast.com.br. O celular da home e o da página de contato não coincidem, então esta apresentação não escolhe um WhatsApp.",
  },
  {
    title: "SAC",
    text: "(61) 9871-9098 e sac@egaplast.com.br para dúvida, elogio e reclamação.",
  },
  {
    title: "Assistência",
    text: "A página atual de assistência só tem o título. Até existir um fluxo próprio, o assunto fica com o SAC.",
  },
  {
    title: "Arquivos de marca",
    text: "Telefone de marketing publicado: +55 61 99643-3078.",
  },
];

export default function V2ContactPage() {
  return (
    <div>
      <PageIntro
        kicker="Atendimento"
        title="Um caminho claro para cada assunto."
        lead="Cotação, parceria, SAC e arquivos de marca. O formulário confirma só nesta tela."
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[0.85fr_1.15fr]">
        <ul className="grid gap-4 content-start">
          {channels.map((channel, index) => (
            <li key={channel.title} className="border border-line bg-white p-5">
              <p className="text-xs font-bold tracking-widest text-navy">{String(index + 1).padStart(2, "0")}</p>
              <h2 className="mt-2 font-bold text-navy">{channel.title}</h2>
              <p className="mt-2 text-sm leading-6 text-ink">{channel.text}</p>
            </li>
          ))}
        </ul>
        <V2ContactForm />
      </div>
    </div>
  );
}
