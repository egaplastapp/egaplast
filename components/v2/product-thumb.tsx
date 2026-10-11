import Image from "next/image";
import type { Product } from "@/lib/types";

export function ProductThumb({ product }: { product?: Product }) {
  if (product?.imagem) {
    return (
      <Image
        src={product.imagem}
        alt=""
        width={72}
        height={72}
        className="h-[72px] w-[72px] shrink-0 border border-line bg-[#111] object-contain"
      />
    );
  }

  const label = product?.references[0] ?? "Sem foto";

  return (
    <span
      aria-hidden="true"
      className="flex h-[72px] w-[72px] shrink-0 items-center justify-center border border-line bg-[#f3f6fb] px-1 text-center text-[11px] font-bold leading-tight text-navy"
    >
      {label}
    </span>
  );
}

export function PriceNotice() {
  return (
    <p className="border border-line bg-[#fff8ee] px-4 py-3 text-sm leading-6 text-ink">
      Valores ilustrativos, sem imposto e sem frete. Não são a tabela da EGAPLAST. A loja não altera o preço.
    </p>
  );
}
