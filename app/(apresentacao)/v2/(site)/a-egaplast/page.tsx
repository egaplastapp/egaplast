import { PageIntro } from "@/components/v2/public-chrome";

export const metadata = { title: "A EGAPLAST" };

const timeline = [
  { year: "Anos 80/90", text: "Primeiros mecanismos, ainda antes da indústria formal." },
  { year: "1999", text: "Abertura da indústria em Brasília, em 31 de maio." },
  { year: "2010", text: "Mecanismo com entrada ajustável e kit castelo." },
  {
    year: "2012",
    text: "Dualflush de 3 ou 6 litros, com economia de água de até 60% frente ao convencional, segundo o texto publicado.",
  },
  {
    year: "Fábrica",
    text: "A história descreve inspeção com testes de pressão e de ciclos. O site não nomeia o laboratório nem o certificado.",
  },
];

const values = [
  "Colocar a vida humana como bem supremo.",
  "Respeitar a diversidade de pensamentos.",
  "Estimular as boas práticas comerciais.",
  "Reconhecer a força do trabalho em equipe.",
  "Nortear as ações em princípios éticos.",
];

export default function V2AboutPage() {
  return (
    <div>
      <PageIntro
        kicker="A empresa"
        title="Pioneira, especialista e referência em mecanismos."
        lead="Desde a fundação em Brasília, a EGAPLAST publica ter sido pioneira na fabricação de mecanismos de descarga para caixas acopladas. A página de história usa a frase “entra na sua casa e não sai”."
      />
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 lg:grid-cols-[1.1fr_0.9fr]">
        <ol className="relative border-l border-line pl-8">
          {timeline.map((item) => (
            <li key={item.year} className="relative pb-8">
              <span className="absolute -left-[2.15rem] top-1.5 h-3 w-3 rotate-45 bg-orange" aria-hidden="true" />
              <p className="text-sm font-bold uppercase tracking-wide text-navy">{item.year}</p>
              <p className="mt-2 leading-7 text-ink">{item.text}</p>
            </li>
          ))}
        </ol>
        <div className="grid content-start gap-6">
          <article className="border border-line bg-[#f3f6fb] p-6">
            <h2 className="text-xl font-bold text-navy">Missão publicada</h2>
            <p className="mt-3 leading-7 text-ink">
              Oferecer, a preço justo, soluções em produtos para instalações hidrossanitárias, elétricas,
              ferramentas, reparos e acessórios, sem perder a responsabilidade por um ecossistema
              sustentável. A visão fala em comercializar no território nacional. Números de produção, de
              clientes e de logística não estão no site e não foram colocados aqui.
            </p>
          </article>
          <article className="border border-line bg-white p-6">
            <h2 className="text-xl font-bold text-navy">Valores publicados</h2>
            <ul className="mt-4 space-y-3">
              {values.map((value) => (
                <li key={value} className="border-l-2 border-orange pl-3 text-sm leading-6 text-ink">
                  {value}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </div>
  );
}
