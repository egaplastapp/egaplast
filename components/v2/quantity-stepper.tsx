"use client";

import { useState } from "react";

export function QuantityStepper({
  name,
  quantity,
  onChange,
}: {
  name: string;
  quantity: number;
  onChange: (quantity: number) => void;
}) {
  const [editing, setEditing] = useState<string | null>(null);
  const shown = editing ?? String(quantity);

  function commit(raw: string) {
    const digits = raw.replace(/\D/g, "");
    const next = digits === "" ? 1 : Number(digits);
    onChange(next);
    setEditing(null);
  }

  function add(step: number) {
    const base = editing === null || editing === "" ? quantity : Number(editing);
    setEditing(null);
    onChange(base + step);
  }

  return (
    <div className="grid w-full gap-2 sm:w-auto sm:shrink-0">
    <div className="flex w-full items-center border border-line bg-white sm:inline-flex sm:w-auto">
      <button
        type="button"
        className="min-h-11 min-w-11 px-3 text-lg font-semibold text-navy disabled:text-line"
        aria-label={`Diminuir quantidade de ${name}`}
        disabled={quantity <= 1 && (editing === null || editing === "" || Number(editing) <= 1)}
        onClick={() => add(-1)}
      >
        −
      </button>
      <input
        inputMode="numeric"
        value={shown}
        aria-label={`Quantidade de ${name}`}
        onFocus={(event) => {
          setEditing(String(quantity));
          event.currentTarget.select();
        }}
        onChange={(event) => {
          const digits = event.target.value.replace(/\D/g, "");
          setEditing(digits);
          if (digits !== "") onChange(Number(digits));
        }}
        onBlur={(event) => commit(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.currentTarget.blur();
          }
        }}
        className="min-h-11 min-w-0 flex-1 border-x border-line py-2 text-center text-base font-semibold text-navy sm:w-16 sm:flex-none"
      />
      <button
        type="button"
        className="min-h-11 min-w-11 px-3 text-lg font-semibold text-navy"
        aria-label={`Aumentar quantidade de ${name}`}
        onClick={() => add(1)}
      >
        +
      </button>
    </div>
      <div className="flex flex-wrap gap-1" aria-label={`Atalhos de quantidade de ${name}`}>
        {[10, 20, 50, 100].map((step) => (
          <button
            key={step}
            type="button"
            className="rounded-sm border border-line bg-white px-2 py-1 text-xs font-semibold text-navy"
            onClick={() => add(step)}
          >
            +{step}
          </button>
        ))}
      </div>
    </div>
  );
}
