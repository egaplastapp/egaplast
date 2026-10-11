import { ContactForm } from "@/components/contact-form";

export const metadata = { title: "Atendimento" };

const channels = [
  {
    title: "Cotação e parceria",
    text: "comercial@egaplast.com.br. O celular da home e o da página de contato não coincidem, então o protótipo não escolhe um WhatsApp.",
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

export default function ContactPage() {
  return (
    <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
      <div>
        <h1 className="text-3xl font-bold text-navy">Atendimento</h1>
        <ul className="mt-6 space-y-4">
          {channels.map((channel) => (
            <li key={channel.title}>
              <h2 className="font-semibold text-navy">{channel.title}</h2>
              <p className="mt-1 text-sm text-ink">{channel.text}</p>
            </li>
          ))}
        </ul>
      </div>
      <ContactForm />
    </div>
  );
}
