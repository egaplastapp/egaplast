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

  return <span aria-hidden="true" className="h-[72px] w-[72px] shrink-0 border border-line bg-[#f3f6fb]" />;
}

export function PriceNotice() {
  return (
    <p className="border border-line bg-[#fff8ee] px-4 py-3 text-sm leading-6 text-ink">
      Valores ilustrativos, sem imposto e sem frete. Não são a tabela da EGAPLAST. A loja não altera o preço.
    </p>
  );
}
