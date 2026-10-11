"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function otherVersion(pathname: string) {
  if (pathname === "/v2" || pathname.startsWith("/v2/")) {
    const rest = pathname.slice(3);
    return rest.length > 0 ? rest : "/";
  }
  return pathname === "/" ? "/v2" : `/v2${pathname}`;
}

export function PrototypeBanner() {
  const pathname = usePathname();
  const demo = pathname.startsWith("/portal") || pathname.startsWith("/v2/portal");
  const onV2 = pathname === "/v2" || pathname.startsWith("/v2/");
  const other = otherVersion(pathname);

  if (!demo) return null;

  return (
    <div className="bg-navy px-4 py-2 text-sm text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-4 gap-y-2">
        <p>
          Protótipo para avaliação do diretor. Os dados são ilustrativos, o preço não é exibido e nenhum
          pedido é confirmado.
        </p>
        <span className="inline-flex overflow-hidden rounded-sm border border-white/40">
          <Link
            href={onV2 ? other : pathname}
            className={`px-3 py-1 font-semibold ${onV2 ? "text-white hover:bg-white/10" : "bg-white text-navy"}`}
            aria-current={onV2 ? undefined : "page"}
          >
            Versão 1
          </Link>
          <Link
            href={onV2 ? pathname : other}
            className={`px-3 py-1 font-semibold ${onV2 ? "bg-white text-navy" : "text-white hover:bg-white/10"}`}
            aria-current={onV2 ? "page" : undefined}
          >
            Apresentação v2
          </Link>
        </span>
      </div>
    </div>
  );
}
