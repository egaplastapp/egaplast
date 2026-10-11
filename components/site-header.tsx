import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/produtos", label: "Produtos" },
  { href: "/a-egaplast", label: "A EGAPLAST" },
  { href: "/para-sua-loja", label: "Para a sua loja" },
  { href: "/materiais", label: "Materiais" },
  { href: "/atendimento", label: "Atendimento" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 py-4">
        <Link href="/" className="mr-auto shrink-0">
          <Image src="/logo-egaplast.svg" alt="EGAPLAST" width={156} height={50} priority />
        </Link>
        <nav aria-label="Principal" className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold text-navy">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:underline">
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/portal/entrar"
          className="rounded-md bg-navy px-3 py-2 text-sm font-semibold text-white"
        >
          Área do lojista
        </Link>
      </div>
    </header>
  );
}
