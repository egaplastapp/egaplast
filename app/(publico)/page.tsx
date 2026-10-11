import Link from "next/link";
import { categories } from "@/lib/catalogo";

const proofs = [
  {
    title: "Desde 1999",
    text: "A empresa publica ter nascido em Brasília, em 31 de maio de 1999, fabricando mecanismos para caixa acoplada.",
  },
  {
    title: "Dualflush",
    text: "A página de história descreve o mecanismo de 3 ou 6 litros e uma economia de até 60% de água frente ao mecanismo convencional.",
  },
  {
    title: "Condição com o comercial",
    text: "O site atual não publica preço. A cotação continua sendo uma conversa, não uma compra automática.",
  },
];

export default function HomePage() {
  return (
    <div className="grid gap-12">
      <section className="grid gap-6 border border-line p-6 md:grid-cols-[1.4fr_0.6fr] md:p-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-orange">Para quem revende</p>
          <h1 className="mt-2 max-w-3xl text-3xl font-bold leading-tight text-navy md:text-4xl">
            Mecanismos para caixa acoplada e soluções hidrossanitárias para quem revende.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink">
            Desde 1999, a EGAPLAST fabrica em Brasília mecanismos de descarga para caixa acoplada e um
            portfólio para banheiro, cozinha e área de serviço. Veja as linhas, consulte a referência e
            fale com o comercial.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/produtos" className="rounded-md bg-navy px-4 py-3 text-sm font-semibold text-white">
              Ver linhas de produtos
            </Link>
            <Link href="/atendimento" className="rounded-md border border-orange px-4 py-3 text-sm font-semibold text-navy">
              Falar com o comercial
            </Link>
          </div>
        </div>
        <div className="hidden items-center justify-center md:flex" aria-hidden="true">
          <div className="h-40 w-40 rotate-45 border-4 border-orange">
            <div className="h-full w-full border-4 border-navy" />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-navy">Linhas</h2>
        <p className="mt-2 max-w-3xl text-ink">
          As sete famílias que a home atual já apresenta. Ferramentas, elétrica e EPI do guia de 2023
          ficam de fora até a empresa confirmar o mix.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <li key={category.id}>
              <Link href={`/produtos/${category.slug}`} className="block h-full border border-line p-4 hover:border-navy">
                <h3 className="font-semibold text-navy">{category.name}</h3>
                <p className="mt-2 text-sm text-ink">{category.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-navy">O que já está escrito pela empresa</h2>
        <ul className="mt-4 grid gap-4 md:grid-cols-3">
          {proofs.map((proof) => (
            <li key={proof.title} className="bg-paper p-4">
              <h3 className="font-semibold text-navy">{proof.title}</h3>
              <p className="mt-2 text-sm text-ink">{proof.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-6 border border-line p-6 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold text-navy">Para a sua loja</h2>
          <p className="mt-3 text-ink">
            Sua loja revende material de construção ou produtos hidráulicos? Envie o nome da empresa, a
            cidade e o telefone. O comercial apresenta o mix e as condições de fornecimento. Preço e
            prazo não estão publicados: eles são tratados nessa conversa.
          </p>
          <Link href="/para-sua-loja" className="mt-4 inline-block text-sm font-semibold text-navy underline">
            Iniciar a conversa
          </Link>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-navy">Materiais de venda</h2>
          <p className="mt-3 text-ink">
            O site atual anuncia catálogo edição 2023, manual de marca e fotos de ponto de venda. Aqui
            eles aparecem reunidos, ainda sem download real.
          </p>
          <Link href="/materiais" className="mt-4 inline-block text-sm font-semibold text-navy underline">
            Abrir a central
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-navy">A EGAPLAST</h2>
        <p className="mt-3 max-w-3xl text-ink">
          Indústria de Brasília, especializada em mecanismos de descarga para caixa acoplada. A página
          de história descreve a evolução dos mecanismos e a inspeção na fábrica, com testes de pressão
          e de ciclos. Capacidade produtiva e certificações nomeadas ainda não entram, porque não foram
          publicadas.
        </p>
        <Link href="/a-egaplast" className="mt-3 inline-block text-sm font-semibold text-navy underline">
          Ler a história
        </Link>
      </section>
    </div>
  );
}
