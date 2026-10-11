import Image from "next/image";
import Link from "next/link";
import { categories, products } from "@/lib/catalogo";

const facts = [
  { value: "1999", label: "Indústria aberta em Brasília, em 31 de maio." },
  { value: "7 linhas", label: "O mix hidrossanitário que a home atual já apresenta." },
  { value: "Sob consulta", label: "Preço não é publicado. A condição fica com o comercial." },
  { value: "Dualflush", label: "Até 60% de economia de água, no texto da empresa." },
];

const vitrine = [
  {
    src: "/fotos/ducha.jpg",
    title: "Duchas higiênicas",
    note: "Metal, ABS cromado e ABS branco.",
    href: "/v2/produtos/duchas-higienicas",
  },
  {
    src: "/fotos/torneiras.png",
    title: "Torneiras",
    note: "Cozinha, lavatório e tanque.",
    href: "/v2/produtos/torneiras-e-chuveiros",
  },
  {
    src: "/fotos/black.png",
    title: "Linha Black",
    note: "Acabamento preto da própria linha.",
    href: "/v2/produtos/linha-black",
  },
  {
    src: "/fotos/valvula.png",
    title: "Escoamento",
    note: "Válvula click com a marca gravada.",
    href: "/v2/produtos/escoamento",
  },
];

const oficios = [
  {
    src: "/fotos/kit-duplo.png",
    title: "A especialidade",
    text: "Mecanismos de descarga para caixa acoplada. É o que a empresa declara fazer desde 1999, e é o que a caixa aberta da foto mostra.",
  },
  {
    src: "/fotos/reparos.jpg",
    title: "O reparo no ponto",
    text: "A linha de reparos e acabamentos é apresentada no site como alternativa a quebrar parede. O acabamento leva a marca ega.",
  },
  {
    src: "/fotos/ducha-produto.png",
    title: "Peça com a marca",
    text: "Ducha, torneira e válvula saem identificadas. A loja revende um produto que o cliente final reconhece no balcão.",
  },
];

export const metadata = { title: "Apresentação" };

export default function V2HomePage() {
  const kit = products.find((product) => product.id === "prd-kit-egaflush");

  return (
    <div>
      <section className="bg-[#00153f] text-white">
        <div className="mx-auto grid max-w-6xl lg:grid-cols-[0.92fr_1.08fr]">
          <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:py-20">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              <span className="inline-block h-2.5 w-2.5 rotate-45 bg-orange" aria-hidden="true" />
              Fabricante · Brasília · desde 1999
            </p>
            <h1 className="mt-5 max-w-xl text-4xl font-extrabold leading-[1.02] tracking-tight md:text-6xl">
              Mecanismos para caixa acoplada, feitos para quem revende.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/90">
              A EGAPLAST fabrica o mecanismo de descarga e um portfólio hidrossanitário para loja,
              distribuidor e representante. A referência se consulta aqui. A condição comercial se fecha
              com o comercial.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/v2/produtos" className="rounded-sm bg-white px-5 py-3 text-sm font-semibold text-navy">
                Ver linhas de produtos
              </Link>
              <Link href="/v2/atendimento" className="rounded-sm border border-white px-5 py-3 text-sm font-semibold text-white">
                Falar com o comercial
              </Link>
            </div>
          </div>
          <div className="relative min-h-[22rem] sm:min-h-[28rem] lg:min-h-[40rem]">
            <Image
              src="/fotos/kit-duplo.png"
              alt="Caixa acoplada aberta com o mecanismo de duplo acionamento, foto publicada no site da EGAPLAST."
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-[center_30%]"
            />
            {kit ? (
              <p className="absolute bottom-4 left-4 right-4 bg-white/95 px-4 py-3 text-sm text-ink shadow-lg">
                <span className="block font-extrabold text-navy">{kit.name}</span>
                <span className="mt-1 block">
                  Ref. {kit.references.join(" / ")} · Sob consulta · Foto do site oficial
                </span>
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-white">
        <ul className="mx-auto grid max-w-6xl gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact) => (
            <li key={fact.value} className="bg-white px-6 py-8">
              <p className="text-2xl font-extrabold tracking-tight text-navy">{fact.value}</p>
              <p className="mt-2 text-sm leading-6 text-ink">{fact.label}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Produtos em destaque" className="bg-[#0c0c0c]">
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
          {vitrine.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="group relative block h-72 overflow-hidden">
                <Image
                  src={item.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-[#00153f] via-[#00153f]/20 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <span className="block text-lg font-extrabold">{item.title}</span>
                  <span className="mt-1 block text-sm text-white/85">{item.note}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy">Catálogo</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-navy md:text-4xl">Sete linhas para a loja</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-muted">
            As fotos saíram do site da EGAPLAST. Ferramentas, elétrica e EPI do guia de 2023 ficam de fora
            até a empresa confirmar o mix.
          </p>
        </div>
        <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => {
            const featured = index === 0;
            return (
              <li key={category.id} className={featured ? "lg:col-span-2" : undefined}>
                <Link
                  href={`/v2/produtos/${category.slug}`}
                  className="group flex h-full flex-col overflow-hidden border border-line bg-white hover:border-navy"
                >
                  <span className={`relative block overflow-hidden bg-[#111] ${featured ? "h-72" : "h-52"}`}>
                    {category.imagem ? (
                      <Image
                        src={category.imagem}
                        alt=""
                        fill
                        sizes={featured ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : null}
                  </span>
                  <span className="flex flex-1 flex-col p-5">
                    <span className="text-sm font-bold tracking-widest text-navy">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-2 text-xl font-bold text-navy">{category.name}</span>
                    <span className="mt-2 text-sm leading-6 text-ink">{category.summary}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="border-y border-line bg-[#f3f6fb]">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy">O que a fábrica entrega</p>
          <h2 className="mt-2 max-w-2xl text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
            Peça de reposição com ficha, referência e marca visível.
          </h2>
          <ul className="mt-8 grid gap-4 lg:grid-cols-3">
            {oficios.map((item) => (
              <li key={item.title} className="bg-white">
                <div className="relative h-64 bg-[#111]">
                  <Image src={item.src} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-extrabold text-navy">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 md:grid-cols-[0.9fr_1.1fr] md:py-20">
          <div className="relative h-80 overflow-hidden bg-[#111] md:h-[28rem]">
            <Image
              src="/fotos/losango.png"
              alt="Equipe da EGAPLAST na linha de produção, foto publicada no site da empresa."
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover object-[78%_center]"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy">Indústria</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
              Feito em Águas Claras, Brasília.
            </h2>
            <p className="mt-4 max-w-lg leading-7 text-ink">
              A fábrica fica na QS 09, Rua 122, Lote 06. A foto é a que a própria EGAPLAST publica: equipe
              na linha, com o uniforme da marca. Capacidade, turnos e certificações não entram aqui enquanto
              a empresa não confirmar.
            </p>
            <Link href="/v2/a-egaplast" className="mt-6 inline-flex rounded-sm bg-navy px-5 py-3 text-sm font-semibold text-white">
              Conhecer a EGAPLAST
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#f3f6fb]">
        <div className="mx-auto grid max-w-6xl gap-px bg-line md:grid-cols-2">
          <article className="bg-[#f3f6fb] px-6 py-12 md:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy">Parceria</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy">Para a sua loja</h2>
            <p className="mt-4 max-w-md leading-7 text-ink">
              A loja envia nome, cidade e telefone. O comercial apresenta o mix e as condições. Preço e
              prazo não estão publicados: eles entram nessa conversa.
            </p>
            <Link href="/v2/para-sua-loja" className="mt-6 inline-flex rounded-sm bg-navy px-5 py-3 text-sm font-semibold text-white">
              Iniciar a conversa
            </Link>
          </article>
          <article className="bg-white px-6 py-12 md:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy">Apoio à venda</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy">Materiais da marca</h2>
            <p className="mt-4 max-w-md leading-7 text-ink">
              Guia 2023/2024, manual de identidade, fotos aplicadas e expositores. Nesta apresentação o
              arquivo ainda não baixa.
            </p>
            <Link href="/v2/materiais" className="mt-6 inline-flex rounded-sm border border-navy px-5 py-3 text-sm font-semibold text-navy">
              Abrir a central
            </Link>
          </article>
        </div>
      </section>

      <section className="v2-stage">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-4 py-14">
          <div>
            <h2 className="max-w-xl text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              A loja consulta a referência. O comercial fecha a condição.
            </h2>
            <p className="mt-3 max-w-xl text-white/85">
              Indústria de Brasília, especializada em mecanismos de descarga para caixa acoplada desde
              1999.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/v2/a-egaplast" className="rounded-sm border border-white px-5 py-3 text-sm font-semibold text-white">
              A EGAPLAST
            </Link>
            <Link href="/v2/portal/entrar" className="rounded-sm bg-white px-5 py-3 text-sm font-semibold text-navy">
              Entrar na demonstração
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
