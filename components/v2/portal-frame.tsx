"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDemo } from "@/lib/demo-store";

const links = [
  { href: "/v2/portal", label: "Catálogo" },
  { href: "/v2/portal/cotacao", label: "Cotação" },
  { href: "/v2/portal/historico", label: "Histórico" },
];

export function V2PortalFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { role, draft, leave } = useDemo();
  const onEntry = pathname === "/v2/portal/entrar";

  if (!role && !onEntry) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col justify-center px-4 py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy">Portal</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy">Demonstração fechada</h1>
        <p className="mt-3 leading-7 text-ink">Entre pela tela de demonstração. Não há senha nesta versão.</p>
        <Link href="/v2/portal/entrar" className="mt-6 w-fit rounded-sm bg-navy px-5 py-3 text-sm font-semibold text-white">
          Ir para a entrada
        </Link>
      </div>
    );
  }

  if (onEntry && !role) {
    return <div className="min-h-screen bg-[#f3f6fb]">{children}</div>;
  }

  const roleLabel = role === "comercial" ? "Comercial" : "Lojista";

  return (
    <div className="min-h-screen bg-[#eef2f7]">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-5 gap-y-3 px-4 py-3">
          <Link href="/v2" className="shrink-0">
            <Image src="/logo-egaplast.svg" alt="EGAPLAST" width={120} height={38} />
          </Link>
          <span className="rounded-sm bg-[#e7edf8] px-2 py-1 text-xs font-semibold uppercase tracking-wide text-navy">
            {roleLabel}
          </span>
          {role ? (
            <nav aria-label="Portal" className="flex flex-wrap items-center gap-1 text-sm font-semibold text-navy">
              {links.map((link) => {
                const current = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={current ? "page" : undefined}
                    className={`rounded-sm px-3 py-2 ${current ? "bg-navy text-white" : "hover:bg-[#eef2f8]"}`}
                  >
                    {link.label}
                    {link.href === "/v2/portal/cotacao" && draft.length > 0 ? ` ${draft.length}` : ""}
                  </Link>
                );
              })}
              {role === "comercial" ? (
                <Link
                  href="/v2/portal/admin"
                  aria-current={pathname === "/v2/portal/admin" ? "page" : undefined}
                  className={`rounded-sm px-3 py-2 ${pathname === "/v2/portal/admin" ? "bg-navy text-white" : "hover:bg-[#eef2f8]"}`}
                >
                  Painel
                </Link>
              ) : null}
            </nav>
          ) : null}
          <div className="ml-auto flex items-center gap-4">
            <Link href="/v2" className="text-sm font-semibold text-navy underline">
              Site
            </Link>
            {role ? (
              <button type="button" onClick={leave} className="text-sm font-semibold text-navy underline">
                Sair
              </button>
            ) : null}
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
