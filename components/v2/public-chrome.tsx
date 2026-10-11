"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/v2/produtos", label: "Produtos" },
  { href: "/v2/a-egaplast", label: "A EGAPLAST" },
  { href: "/v2/para-sua-loja", label: "Para a sua loja" },
  { href: "/v2/materiais", label: "Materiais" },
  { href: "/v2/atendimento", label: "Atendimento" },
];

function isCurrent(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function V2Header() {
  const pathname = usePathname();
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const open = menuPath === pathname;

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link href="/v2" className="mr-auto shrink-0">
          <Image src="/logo-egaplast.svg" alt="EGAPLAST" width={148} height={48} priority />
        </Link>
        <nav aria-label="Principal" className="hidden items-center gap-5 text-sm font-semibold text-navy lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={isCurrent(pathname, link.href) ? "underline decoration-orange decoration-2 underline-offset-8" : "hover:underline"}
              aria-current={isCurrent(pathname, link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/v2/portal/entrar" className="hidden rounded-sm bg-navy px-4 py-2.5 text-sm font-semibold text-white lg:inline-flex">
          Área do lojista
        </Link>
        <button
          type="button"
          className="rounded-sm border border-navy px-3 py-2 text-sm font-semibold text-navy lg:hidden"
          aria-expanded={open}
          aria-controls="v2-menu"
          onClick={() => setMenuPath(open ? null : pathname)}
        >
          Menu
        </button>
      </div>
      {open ? (
        <nav id="v2-menu" aria-label="Principal" className="grid gap-1 border-t border-line px-4 py-3 text-sm font-semibold text-navy lg:hidden">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-sm px-2 py-2 hover:bg-paper">
              {link.label}
            </Link>
          ))}
          <Link href="/v2/portal/entrar" className="mt-1 rounded-sm bg-navy px-3 py-2.5 text-center text-white">
            Área do lojista
          </Link>
        </nav>
      ) : null}
    </header>
  );
}

export function V2Footer() {
  return (
    <footer className="mt-auto bg-[#00153f] text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <span className="inline-flex bg-white px-3 py-2">
            <Image src="/logo-egaplast.svg" alt="EGAPLAST" width={132} height={42} />
          </span>
          <p className="mt-4 text-sm leading-6 text-white/85">
            Egaplast - Artefatos e comércio de plásticos LTDA
            <br />
            CNPJ 03185.564/0001-34
          </p>
          <p className="mt-3 text-sm leading-6 text-white/85">
            QS 09, Rua 122, Lote 06, Águas Claras
            <br />
            Brasília-DF, CEP 71.977-360
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">Contato</p>
          <p className="mt-3 text-sm leading-6">
            (61) 3386-5266
            <br />
            (61) 3386-7507
            <br />
            comercial@egaplast.com.br
            <br />
            SAC (61) 9871-9098 · sac@egaplast.com.br
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">Percorrer</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/v2/produtos" className="underline underline-offset-4">
                Linhas de produto
              </Link>
            </li>
            <li>
              <Link href="/v2/atendimento" className="underline underline-offset-4">
                Atendimento
              </Link>
            </li>
            <li>
              <Link href="/v2/portal/entrar" className="underline underline-offset-4">
                Área do lojista
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export function PageIntro({
  kicker,
  title,
  lead,
}: {
  kicker: string;
  title: string;
  lead?: string;
}) {
  return (
    <section className="border-b border-line bg-[#f3f6fb]">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-navy">
          <span className="inline-block h-2.5 w-2.5 rotate-45 bg-orange" aria-hidden="true" />
          {kicker}
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-navy md:text-5xl">{title}</h1>
        {lead ? <p className="mt-4 max-w-2xl text-lg leading-8 text-ink">{lead}</p> : null}
      </div>
    </section>
  );
}
