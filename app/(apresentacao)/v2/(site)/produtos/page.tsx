import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/v2/public-chrome";
import { categories } from "@/lib/catalogo";

export const metadata = { title: "Produtos" };

export default function V2ProductsPage() {
  return (
    <div>
      <PageIntro
        kicker="Catálogo"
        title="Linhas para consultar a referência."
        lead="Sete linhas hidrossanitárias. O preço fica sob consulta."
      />
      <ul className="mx-auto grid max-w-6xl gap-4 px-4 py-12">
        {categories.map((category, index) => {
          return (
            <li key={category.id}>
              <Link
                href={`/v2/produtos/${category.slug}`}
                className="grid items-center gap-4 border border-line bg-white p-5 transition hover:border-navy md:grid-cols-[7rem_1fr_auto]"
              >
                <span className="relative block h-24 overflow-hidden bg-[#111]">
                  {category.imagem ? (
                    <Image src={category.imagem} alt="" fill sizes="112px" className="object-cover" />
                  ) : (
                    <span className="flex h-full items-center justify-center text-lg font-extrabold text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  )}
                </span>
                <span>
                  <span className="block text-lg font-bold text-navy">{category.name}</span>
                  <span className="mt-1 block text-sm leading-6 text-ink">{category.application}</span>
                </span>
                <span className="text-sm font-semibold text-navy">Ver a linha</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
