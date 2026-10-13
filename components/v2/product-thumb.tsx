import Image from "next/image";
import type { Product } from "@/lib/types";

export function ProductThumb({ product, size = "md" }: { product?: Product; size?: "md" | "lg" }) {
  const box = size === "lg" ? "h-28 w-28" : "h-[72px] w-[72px]";
  const pixels = size === "lg" ? 112 : 72;
  if (product?.imagem) {
    const shared = `${box} shrink-0 border border-line bg-[#111] object-contain`;
    if (product.imagem.startsWith("data:") || product.imagem.startsWith("blob:")) {
      return (
        // eslint-disable-next-line @next/next/no-img-element -- foto enviada nesta sessão
        <img src={product.imagem} alt="" className={shared} />
      );
    }
    return <Image src={product.imagem} alt="" width={pixels} height={pixels} className={shared} />;
  }

  return <span aria-hidden="true" className={`${box} shrink-0 border border-line bg-[#f3f6fb]`} />;
}

export function ProductFrame({ product, alt = "" }: { product?: Product; alt?: string }) {
  if (!product?.imagem) {
    return <span aria-hidden="true" className="block aspect-square w-full border border-line bg-[#f3f6fb]" />;
  }
  if (product.imagem.startsWith("data:") || product.imagem.startsWith("blob:")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- foto enviada nesta sessão
      <img src={product.imagem} alt={alt} className="aspect-square w-full border border-line bg-[#111] object-contain" />
    );
  }
  return (
    <span className="relative block aspect-square w-full border border-line bg-[#111]">
      <Image src={product.imagem} alt={alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-contain" />
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
