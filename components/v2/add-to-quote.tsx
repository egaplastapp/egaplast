"use client";

import Link from "next/link";
import { useState } from "react";
import { useDemo } from "@/lib/demo-store";

export function AddToQuote({ productId, productName }: { productId: string; productName: string }) {
  const { addItem } = useDemo();
  const [added, setAdded] = useState(false);

  return (
    <div className="mt-6">
      <button
        type="button"
        className="rounded-sm bg-navy px-5 py-3 text-sm font-semibold text-white"
        onClick={() => {
          addItem(productId);
          setAdded(true);
        }}
      >
        Incluir na cotação
      </button>
      {added ? (
        <p className="mt-3 text-sm leading-6" role="status">
          {productName} entrou na cotação. O preço segue sob consulta.
          <Link href="/v2/portal/cotacao" className="ml-2 font-semibold text-navy underline">
            Revisar a cotação
          </Link>
        </p>
      ) : null}
    </div>
  );
}
