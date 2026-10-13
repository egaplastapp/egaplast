"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { formatBRL, itemsTotal } from "@/lib/preco";
import { useDemo } from "@/lib/demo-store";
import { CartDrawer } from "@/components/v2/cart-drawer";
import { CartPanel } from "@/components/v2/cart-panel";

const links = [
  { href: "/v2/portal", label: "Catálogo" },
  { href: "/v2/portal/cotacao", label: "Cotação" },
  { href: "/v2/portal/historico", label: "Histórico" },
];

export function V2PortalFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { role, draft, leave, catalog, stores, currentStoreId } = useDemo();
  const [cartPath, setCartPath] = useState<string | null>(null);
  const onEntry = pathname === "/v2/portal/entrar";
  const currentStore = stores.find((store) => store.id === currentStoreId) ?? null;
  const storeReady = role === "lojista" && currentStore?.status === "ativo";

  if (onEntry && role !== "comercial") {
    return <div className="min-h-screen bg-[#f3f6fb]">{children}</div>;
  }

  if (!role) {
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

  if (role === "lojista" && !storeReady) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col justify-center px-4 py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy">Portal</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy">Cadastro da loja</h1>
        <p className="mt-3 leading-7 text-ink">
          {currentStore?.status === "inativo"
            ? "O comercial pausou esta loja. Ela não entra nem envia pré-pedido."
            : "Para montar o pré-pedido, a loja precisa se cadastrar. Não há senha nesta versão."}
        </p>
        <Link href="/v2/portal/entrar" className="mt-6 w-fit rounded-sm bg-navy px-5 py-3 text-sm font-semibold text-white">
          Ir para o cadastro
        </Link>
      </div>
    );
  }

  const roleLabel = role === "comercial" ? "Comercial" : "Lojista";
  const nav = [
    ...links,
    ...(role === "lojista" ? [{ href: "/v2/portal/dados", label: "Meus dados" }] : []),
    ...(role === "comercial"
      ? [
          { href: "/v2/portal/lojas", label: "Lojas" },
          { href: "/v2/portal/produtos", label: "Produtos" },
          { href: "/v2/portal/admin", label: "Painel" },
        ]
      : []),
  ];
  const shopping = pathname === "/v2/portal" || pathname.startsWith("/v2/portal/produto/");
  const showSideCart = shopping && draft.length > 0;
  const showCartBar =
    draft.length > 0 && (shopping || pathname === "/v2/portal/cotacao");
  const units = draft.reduce((sum, item) => sum + item.quantity, 0);
  const total = itemsTotal(draft, (id) => catalog.find((product) => product.id === id));
  const drawerOpen = cartPath === pathname && draft.length > 0;

  return (
    <div className="min-h-screen bg-[#eef2f7]">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3">
          <Link href="/v2" className="shrink-0">
            <Image src="/logo-egaplast.svg" alt="EGAPLAST" width={120} height={38} className="h-8 w-auto" />
          </Link>
          <span className="rounded-sm bg-[#e7edf8] px-2 py-1 text-xs font-semibold uppercase tracking-wide text-navy">
            {roleLabel}
          </span>
          {role === "lojista" && currentStore ? (
            <span className="max-w-48 truncate text-sm font-semibold text-navy">{currentStore.tradeName}</span>
          ) : null}
          {role ? (
            <nav
              aria-label="Portal"
              className="order-last flex w-full gap-1 overflow-x-auto text-sm font-semibold text-navy sm:order-none sm:w-auto sm:flex-wrap"
            >
              {nav.map((link) => {
                const current = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={current ? "page" : undefined}
                    className={`shrink-0 rounded-sm px-3 py-2 ${current ? "bg-navy text-white" : "hover:bg-[#eef2f8]"}`}
                  >
                    {link.label}
                    {link.href === "/v2/portal/cotacao" && draft.length > 0 ? ` ${draft.length}` : ""}
                  </Link>
                );
              })}
            </nav>
          ) : null}
          <div className="ml-auto flex items-center gap-3">
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
      <main
        className={`mx-auto max-w-6xl px-4 py-6 sm:py-8 ${showSideCart ? "lg:grid lg:max-w-7xl lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-6" : ""} ${showCartBar ? "pb-32" : ""} ${showSideCart ? "lg:pb-8" : ""}`}
      >
        <div className="min-w-0">{children}</div>
        {showSideCart ? (
          <div className="hidden lg:block">
            <CartPanel />
          </div>
        ) : null}
      </main>
      {showCartBar ? (
        <div className={`fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-navy px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] text-white ${showSideCart ? "lg:hidden" : ""}`}>
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs text-white/75">
                {units} {units === 1 ? "unidade" : "unidades"}
              </p>
              <p className="truncate text-lg font-extrabold tracking-tight">{formatBRL(total)}</p>
            </div>
            <button
              type="button"
              className="shrink-0 rounded-sm bg-white px-4 py-2.5 text-sm font-semibold text-navy"
              onClick={() => setCartPath(pathname)}
            >
              Ver carrinho
            </button>
          </div>
        </div>
      ) : null}
      {drawerOpen ? <CartDrawer onClose={() => setCartPath(null)} /> : null}
    </div>
  );
}
