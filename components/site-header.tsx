"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/produtos", label: "Produtos" },
  { href: "/a-egaplast", label: "A EGAPLAST" },
  { href: "/para-sua-loja", label: "Para a sua loja" },
  { href: "/materiais", label: "Materiais" },
  { href: "/atendimento", label: "Atendimento" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const open = menuPath === pathname;

  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-4">
        <Link href="/" className="mr-auto shrink-0">
          <Image src="/logo-egaplast.svg" alt="EGAPLAST" width={156} height={50} priority className="h-10 w-auto" />
        </Link>
        <nav aria-label="Principal" className="hidden flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold text-navy lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:underline">
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/portal/entrar" className="hidden rounded-md bg-navy px-3 py-2 text-sm font-semibold text-white lg:inline-flex">
          Área do lojista
        </Link>
        <button
          type="button"
          className="rounded-md border border-navy px-3 py-2 text-sm font-semibold text-navy lg:hidden"
          aria-expanded={open}
          aria-controls="v1-menu"
          onClick={() => setMenuPath(open ? null : pathname)}
        >
          Menu
        </button>
      </div>
      {open ? (
        <nav id="v1-menu" aria-label="Principal" className="grid gap-1 border-t border-line px-4 py-3 text-sm font-semibold text-navy lg:hidden">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-sm px-2 py-2 hover:bg-paper">
              {link.label}
            </Link>
          ))}
          <Link href="/portal/entrar" className="mt-1 rounded-md bg-navy px-3 py-2.5 text-center text-white">
            Área do lojista
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
