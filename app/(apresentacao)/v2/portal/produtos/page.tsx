"use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import { categories } from "@/lib/catalogo";
import type { ProductDraft } from "@/lib/demo-store";
import { useDemo } from "@/lib/demo-store";
import { formatBRL, referenceLabel } from "@/lib/preco";
import type { Product, Spec } from "@/lib/types";
import { ProductFrame, ProductThumb } from "@/components/v2/product-thumb";

const MAX_PHOTO = 1_500_000;

type FormState = {
  id?: string;
  categoryId: string;
  name: string;
  line: string;
  application: string;
  references: string;
  price: string;
  packaging: string;
  warranty: string;
  imagem?: string;
  specs: Spec[];
  error: string;
};

function emptyForm(): FormState {
  return {
    categoryId: categories[0]?.id ?? "",
    name: "",
    line: "",
    application: "",
    references: "",
    price: "",
    packaging: "",
    warranty: "",
    specs: [],
    error: "",
  };
}

function formFromProduct(product: Product): FormState {
  return {
    id: product.id,
    categoryId: product.categoryId,
    name: product.name,
    line: product.line,
    application: product.application ?? "",
    references: product.references.join(", "),
    price: String(product.precoDemonstracao),
    packaging: product.packaging ?? "",
    warranty: product.warranty ?? "",
    imagem: product.imagem,
    specs: product.specs.map((spec) => ({ ...spec })),
    error: "",
  };
}

function readPhoto(file: File) {
  return new Promise<string>((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("Escolha um arquivo de imagem."));
      return;
    }
    if (file.size > MAX_PHOTO) {
      reject(new Error("A foto precisa ter até 1,5 MB."));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Não foi possível ler a foto."));
    reader.readAsDataURL(file);
  });
}

export default function V2ProductAdminPage() {
  const { role, catalog, saveProduct, removeProduct } = useDemo();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [line, setLine] = useState("todas");

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return catalog.filter((product) => {
      if (line !== "todas" && product.categoryId !== line) return false;
      const blob = `${product.name} ${product.line} ${product.references.join(" ")}`.toLowerCase();
      return blob.includes(term);
    });
  }, [catalog, line, query]);

  if (role !== "comercial") {
    return (
      <div className="max-w-xl border border-line bg-white p-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-navy">Cadastro do catálogo</h1>
        <p className="mt-3 leading-7 text-ink">
          A loja consulta as fichas e monta o carrinho. Incluir, editar e excluir uma peça fica com o
          comercial.
        </p>
        <Link href="/v2/portal" className="mt-5 inline-flex rounded-sm bg-navy px-5 py-3 text-sm font-semibold text-white">
          Voltar ao catálogo
        </Link>
      </div>
    );
  }

  function update(patch: Partial<FormState>) {
    setForm((current) => ({ ...current, ...patch, error: patch.error ?? "" }));
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const name = form.name.trim();
    const line = form.line.trim();
    const price = Number(form.price.replace(",", "."));
    if (!name || !line || !form.categoryId) {
      update({ error: "Informe nome, linha e categoria." });
      return;
    }
    if (!Number.isFinite(price) || price < 0) {
      update({ error: "Informe um valor ilustrativo." });
      return;
    }
    const draft: ProductDraft = {
      id: form.id,
      categoryId: form.categoryId,
      name,
      line,
      application: form.application.trim() || undefined,
      references: form.references
        .split(/[,/]/)
        .map((item) => item.trim())
        .filter(Boolean),
      packaging: form.packaging.trim() || undefined,
      warranty: form.warranty.trim() || undefined,
      imagem: form.imagem,
      precoDemonstracao: price,
      specs: form.specs
        .map((spec) => ({ label: spec.label.trim(), value: spec.value.trim() }))
        .filter((spec) => spec.label && spec.value),
    };
    saveProduct(draft);
    setForm(emptyForm());
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy">Catálogo</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-navy">Produtos da sessão</h1>
          </div>
          <button
            type="button"
            className="rounded-sm bg-navy px-4 py-2.5 text-sm font-semibold text-white"
            onClick={() => {
              setPendingDelete(null);
              setForm(emptyForm());
            }}
          >
            Nova peça
          </button>
        </div>
        <p className="mt-2 text-sm leading-6 text-ink">
          O que for incluído ou alterado aqui aparece no catálogo do lojista nesta aba. O site público
          não muda e o preço continua ilustrativo.
        </p>
        <div className="mt-4 grid gap-3 border border-line bg-white p-4 sm:grid-cols-[1fr_14rem]">
          <label className="grid gap-1 text-sm font-semibold text-navy">
            Buscar nome ou referência
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="border border-line px-3 py-2 font-normal"
              placeholder="Ex.: Egaflush ou 10215"
            />
          </label>
          <label className="grid gap-1 text-sm font-semibold text-navy">
            Linha
            <select value={line} onChange={(event) => setLine(event.target.value)} className="border border-line bg-white px-3 py-2 font-normal">
              <option value="todas">Todas</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        {visible.length === 0 ? (
          <p className="mt-4 border border-line bg-white p-4 text-sm">Nenhuma ficha corresponde a esta busca.</p>
        ) : (
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {visible.map((product) => {
              const selected = form.id === product.id;
              return (
                <li
                  key={product.id}
                  className={`flex flex-col border bg-white ${selected ? "border-navy ring-2 ring-navy" : "border-line"}`}
                >
                  <ProductFrame product={product} />
                  <div className="grid flex-1 gap-2 p-3">
                    <p className="font-semibold text-navy">{product.name}</p>
                    <p className="text-sm text-muted">
                      {product.line} · {referenceLabel(product)}
                    </p>
                    <p className="text-sm font-semibold text-navy">{formatBRL(product.precoDemonstracao)}</p>
                    <div className="mt-auto flex flex-wrap gap-2 pt-2">
                      <button
                        type="button"
                        className="rounded-sm border border-navy px-3 py-2 text-sm font-semibold text-navy"
                        onClick={() => {
                          setPendingDelete(null);
                          setForm(formFromProduct(product));
                          document.getElementById("ficha-form")?.scrollIntoView({ block: "start" });
                        }}
                      >
                        Editar
                      </button>
                      {pendingDelete === product.id ? (
                        <button
                          type="button"
                          className="rounded-sm bg-navy px-3 py-2 text-sm font-semibold text-white"
                          onClick={() => {
                            removeProduct(product.id);
                            setPendingDelete(null);
                            if (form.id === product.id) setForm(emptyForm());
                          }}
                        >
                          Confirmar exclusão
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="rounded-sm px-3 py-2 text-sm font-semibold text-navy underline"
                          onClick={() => setPendingDelete(product.id)}
                        >
                          Excluir
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <form id="ficha-form" onSubmit={submit} className="h-fit border border-line bg-white p-5 lg:sticky lg:top-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-navy">{form.id ? "Editar peça" : "Nova peça"}</h2>
          {form.id ? (
            <button type="button" className="text-sm font-semibold text-navy underline" onClick={() => setForm(emptyForm())}>
              Cancelar edição
            </button>
          ) : null}
        </div>
        <div className="mt-4 grid gap-3">
          <label className="grid gap-1 text-sm font-semibold text-navy">
            Nome
            <input value={form.name} onChange={(event) => update({ name: event.target.value })} className="border border-line px-3 py-2 font-normal" />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1 text-sm font-semibold text-navy">
              Linha
              <input value={form.line} onChange={(event) => update({ line: event.target.value })} className="border border-line px-3 py-2 font-normal" />
            </label>
            <label className="grid gap-1 text-sm font-semibold text-navy">
              Categoria
              <select
                value={form.categoryId}
                onChange={(event) => update({ categoryId: event.target.value })}
                className="border border-line bg-white px-3 py-2 font-normal"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="grid gap-1 text-sm font-semibold text-navy">
            Descrição
            <textarea
              rows={3}
              value={form.application}
              onChange={(event) => update({ application: event.target.value })}
              className="border border-line px-3 py-2 font-normal"
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1 text-sm font-semibold text-navy">
              Referências
              <input
                value={form.references}
                onChange={(event) => update({ references: event.target.value })}
                placeholder="Só se o código já existir"
                className="border border-line px-3 py-2 font-normal"
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold text-navy">
              Valor ilustrativo
              <input
                inputMode="decimal"
                value={form.price}
                onChange={(event) => update({ price: event.target.value })}
                className="border border-line px-3 py-2 font-normal"
              />
            </label>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1 text-sm font-semibold text-navy">
              Embalagem
              <input value={form.packaging} onChange={(event) => update({ packaging: event.target.value })} className="border border-line px-3 py-2 font-normal" />
            </label>
            <label className="grid gap-1 text-sm font-semibold text-navy">
              Garantia
              <input value={form.warranty} onChange={(event) => update({ warranty: event.target.value })} className="border border-line px-3 py-2 font-normal" />
            </label>
          </div>
          <label className="grid gap-1 text-sm font-semibold text-navy">
            Foto
            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                readPhoto(file).then(
                  (imagem) => update({ imagem }),
                  (error: Error) => update({ error: error.message }),
                );
              }}
              className="font-normal"
            />
          </label>
          {form.imagem ? <ProductThumb product={{ ...emptyProduct(), imagem: form.imagem, name: form.name }} /> : null}
          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-navy">Características</p>
              <button
                type="button"
                className="text-sm font-semibold text-navy underline"
                onClick={() => update({ specs: [...form.specs, { label: "", value: "" }] })}
              >
                Adicionar linha
              </button>
            </div>
            <div className="mt-2 grid gap-2">
              {form.specs.map((spec, index) => (
                <div key={index} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
                  <input
                    value={spec.label}
                    aria-label={`Rótulo da característica ${index + 1}`}
                    onChange={(event) => {
                      const specs = form.specs.map((item, itemIndex) =>
                        itemIndex === index ? { ...item, label: event.target.value } : item,
                      );
                      update({ specs });
                    }}
                    placeholder="Rótulo"
                    className="border border-line px-3 py-2 text-sm"
                  />
                  <input
                    value={spec.value}
                    aria-label={`Valor da característica ${index + 1}`}
                    onChange={(event) => {
                      const specs = form.specs.map((item, itemIndex) =>
                        itemIndex === index ? { ...item, value: event.target.value } : item,
                      );
                      update({ specs });
                    }}
                    placeholder="Valor"
                    className="border border-line px-3 py-2 text-sm"
                  />
                  <button
                    type="button"
                    className="text-sm font-semibold text-navy underline"
                    onClick={() => update({ specs: form.specs.filter((_, itemIndex) => itemIndex !== index) })}
                  >
                    Tirar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        {form.error ? (
          <p className="mt-3 text-sm font-semibold text-navy" role="alert">
            {form.error}
          </p>
        ) : null}
        <button type="submit" className="mt-4 w-full rounded-sm bg-navy px-4 py-3 text-sm font-semibold text-white sm:w-auto">
          {form.id ? "Salvar alterações" : "Adicionar peça"}
        </button>
      </form>
    </div>
  );
}

function emptyProduct(): Product {
  return {
    id: "preview",
    slug: "preview",
    categoryId: "",
    name: "",
    line: "",
    references: [],
    specs: [],
    source: "",
    demonstration: true,
    precoDemonstracao: 0,
  };
}
