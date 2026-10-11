import Image from "next/image";
import Link from "next/link";
import { categories, products } from "@/lib/catalogo";

const facts = [
  { value: "1999", label: "Indústria em Brasília desde 31 de maio." },
  { value: "7 linhas", label: "Mecanismos, duchas, torneiras, reparos e escoamento." },
  { value: "Sob consulta", label: "A condição comercial fica com o time de vendas." },
  { value: "Dualflush", label: "Até 60% de economia de água frente ao mecanismo convencional." },
];

const vitrine = [
  {
    src: "/fotos/ducha.jpg",
    title: "Duchas higiênicas",
    note: "Metal, ABS cromado e ABS branco.",
    href: "/v2/produtos/duchas-higienicas",
    position: "object-[18%_center]",
  },
  {
    src: "/fotos/torneiras.png",
    title: "Torneiras",
    note: "Cozinha, lavatório e tanque.",
    href: "/v2/produtos/torneiras-e-chuveiros",
    position: "object-center",
  },
  {
    src: "/fotos/black.png",
    title: "Linha Black",
    note: "Acabamento preto da linha.",
    href: "/v2/produtos/linha-black",
    position: "object-center",
  },
  {
    src: "/fotos/valvula.png",
    title: "Escoamento",
    note: "Válvulas e ralos.",
    href: "/v2/produtos/escoamento",
    position: "object-center",
  },
];

export const metadata = { title: "Apresentação" };

export default function V2HomePage() {
  const kit = products.find((product) => product.id === "prd-kit-egaflush");

  return (
    <div>
      <section className="overflow-hidden bg-[#00153f] text-white">
        <div className="mx-auto grid max-w-6xl lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <div className="hero-rise flex flex-col justify-center px-4 py-14 md:py-16 lg:py-20">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em]">
              <span className="inline-block h-2.5 w-2.5 rotate-45 bg-orange" aria-hidden="true" />
              Fabricante · Brasília · desde 1999
            </p>
            <h1 className="mt-5 max-w-xl text-4xl font-extrabold leading-[1.02] tracking-tight md:text-6xl">
              Mecanismos para caixa acoplada, feitos para quem revende.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/90">
              A EGAPLAST fabrica o mecanismo de descarga e o portfólio hidrossanitário para loja,
              distribuidor e representante. A referência se consulta aqui. A condição se fecha com o
              comercial.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/v2/produtos" className="rounded-sm bg-white px-5 py-3 text-sm font-semibold text-navy">
                Ver o catálogo
              </Link>
              <Link
                href="/v2/atendimento"
                className="rounded-sm border border-white px-5 py-3 text-sm font-semibold text-white"
              >
                Falar com o comercial
              </Link>
            </div>
          </div>

          <div className="relative min-h-[26rem] sm:min-h-[32rem] lg:min-h-[42rem]">
            <div className="hero-glow" aria-hidden="true" />
            <div className="absolute inset-x-4 top-4 bottom-28 overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.35)] sm:inset-x-8 sm:bottom-32 lg:inset-y-12 lg:right-0 lg:left-16 lg:bottom-24">
              <Image
                src="/fotos/kit-duplo.png"
                alt="Mecanismo de caixa acoplada EGAPLAST, com entrada e saída no reservatório."
                fill
                priority
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover object-[62%_28%]"
              />
              <span className="absolute left-0 top-0 h-1.5 w-16 bg-orange" aria-hidden="true" />
              {kit ? (
                <p className="absolute bottom-0 left-0 right-0 bg-[#00153f]/88 px-4 py-3 text-sm text-white">
                  <span className="font-extrabold">Kit Egaflush</span>
                  <span className="mt-0.5 block text-white/80">
                    Ref. {kit.references.join(" / ")} · Sob consulta
                  </span>
                </p>
              ) : null}
            </div>
            <div className="hero-drift absolute bottom-4 left-4 w-32 shadow-[0_18px_40px_rgba(0,0,0,0.4)] sm:left-6 sm:w-40 lg:left-4">
              <div className="relative aspect-square bg-[#111]">
                <Image
                  src="/fotos/ducha-produto.png"
                  alt="Ducha higiênica cromada EGAPLAST."
                  fill
                  sizes="160px"
                  className="object-contain p-2"
                />
              </div>
              <p className="bg-white px-3 py-2 text-xs font-bold text-navy">Ducha higiênica</p>
            </div>
            <div className="absolute top-6 right-4 hidden w-28 shadow-[0_18px_40px_rgba(0,0,0,0.4)] sm:block lg:right-2 lg:w-32">
              <div className="relative aspect-square bg-[#111]">
                <Image
                  src="/fotos/black-torneira.png"
                  alt="Torneira e chuveiro da Linha Black."
                  fill
                  sizes="128px"
                  className="object-contain p-2"
                />
              </div>
              <p className="bg-orange px-3 py-2 text-xs font-bold text-[#1c1200]">Linha Black</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-white">
        <ul className="mx-auto grid max-w-6xl sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact) => (
            <li key={fact.value} className="border-line px-6 py-8 sm:border-l sm:first:border-l-0">
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
                  className={`object-cover transition duration-500 group-hover:scale-105 ${item.position}`}
                />
                <span className="absolute inset-0 bg-gradient-to-t from-[#00153f] via-[#00153f]/15 to-transparent" />
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
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy">Catálogo</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-navy md:text-4xl">Sete linhas para a loja</h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            Abra a linha para ver a peça, a aplicação e a ficha técnica disponível.
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
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    ) : null}
                  </span>
                  <span className="flex flex-1 flex-col p-5">
                    <span className="text-xs font-bold tracking-[0.16em] text-navy">
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

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-[0.9fr_1.1fr] md:py-20">
          <div className="relative h-80 overflow-hidden bg-[#111] md:h-[28rem]">
            <Image
              src="/fotos/losango.png"
              alt="Equipe da EGAPLAST na linha de produção."
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="scale-[1.85] object-cover object-[70%_42%]"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy">A fabricante</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
              Feito em Águas Claras, Brasília.
            </h2>
            <p className="mt-4 max-w-lg leading-7 text-ink">
              A EGAPLAST fabrica mecanismos de descarga para caixa acoplada desde 1999. A indústria fica
              na QS 09, Rua 122, Lote 06.
            </p>
            <ul className="mt-6 grid gap-4">
              <li className="border-l-2 border-orange pl-4">
                <p className="font-bold text-navy">O que a loja consulta</p>
                <p className="mt-1 text-sm leading-6 text-ink">
                  Linha, aplicação e medidas da ficha.
                </p>
              </li>
              <li className="border-l-2 border-navy pl-4">
                <p className="font-bold text-navy">Como pedir a condição</p>
                <p className="mt-1 text-sm leading-6 text-ink">
                  Pela área do lojista ou direto com o comercial. O preço não fica no site.
                </p>
              </li>
            </ul>
            <Link
              href="/v2/a-egaplast"
              className="mt-6 inline-flex rounded-sm bg-navy px-5 py-3 text-sm font-semibold text-white"
            >
              Conhecer a EGAPLAST
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#f3f6fb]">
        <div className="mx-auto grid max-w-6xl md:grid-cols-[1.15fr_0.85fr]">
          <article className="px-6 py-12 md:px-10 md:py-16">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy">Parceria</p>
            <h2 className="mt-3 max-w-md text-3xl font-extrabold tracking-tight text-navy">
              A loja consulta a referência. O comercial fecha a condição.
            </h2>
            <p className="mt-4 max-w-md leading-7 text-ink">
              Envie o nome da empresa, a cidade e o telefone. O atendimento é para loja, distribuidor e
              representante.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/v2/para-sua-loja" className="rounded-sm bg-navy px-5 py-3 text-sm font-semibold text-white">
                Iniciar a conversa
              </Link>
              <Link href="/v2/portal/entrar" className="rounded-sm border border-navy px-5 py-3 text-sm font-semibold text-navy">
                Área do lojista
              </Link>
            </div>
          </article>
          <article className="flex flex-col justify-between bg-navy px-6 py-12 text-white md:px-10 md:py-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange">Materiais</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight">Guia, marca e expositor</h2>
              <p className="mt-4 leading-7 text-white/85">
                O guia 2023/2024, o manual da marca e as fotos de produto saem pelo comercial.
              </p>
            </div>
            <Link href="/v2/materiais" className="mt-8 w-fit rounded-sm bg-white px-5 py-3 text-sm font-semibold text-navy">
              Solicitar materiais
            </Link>
          </article>
        </div>
      </section>
    </div>
  );
}
