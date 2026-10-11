"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDemo } from "@/lib/demo-store";

const links = [
  { href: "/portal", label: "Catálogo" },
  { href: "/portal/cotacao", label: "Lista de cotação" },
  { href: "/portal/historico", label: "Histórico" },
];

export function PortalFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { role, draft, leave } = useDemo();
  const onEntry = pathname === "/portal/entrar";

  if (!role && !onEntry) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16">
        <h1 className="text-2xl font-bold text-navy">Demonstração do portal</h1>
        <p className="mt-3 text-ink">Entre pela tela de demonstração. Não há senha nesta versão.</p>
        <Link href="/portal/entrar" className="mt-4 inline-block font-semibold text-navy underline">
          Ir para a entrada
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 py-4">
          <Link href="/" className="mr-auto">
            <Image src="/logo-egaplast.svg" alt="EGAPLAST" width={124} height={40} />
          </Link>
          {role ? (
            <nav aria-label="Portal" className="flex flex-wrap gap-4 text-sm font-semibold text-navy">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="hover:underline">
                  {link.label}
                  {link.href === "/portal/cotacao" && draft.length > 0 ? ` (${draft.length})` : ""}
                </Link>
              ))}
              {role === "comercial" ? (
                <Link href="/portal/admin" className="hover:underline">
                  Painel
                </Link>
              ) : null}
            </nav>
          ) : null}
          {role ? (
            <button type="button" onClick={leave} className="text-sm font-semibold text-navy underline">
              Sair da demonstração
            </button>
          ) : null}
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
