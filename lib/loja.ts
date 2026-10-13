import { categories } from "./catalogo";
import type { RetailStore, StoreKind, StoreStatus } from "./types";

export const STORE_STATUS_LABEL: Record<StoreStatus, string> = {
  ativo: "Ativo",
  inativo: "Inativo",
};

export const STORE_KINDS: { id: StoreKind; label: string }[] = [
  { id: "construcao", label: "Loja de material de construção" },
  { id: "hidraulica", label: "Casa de hidráulica" },
  { id: "home_center", label: "Home center" },
  { id: "distribuidor", label: "Distribuidor" },
  { id: "representante", label: "Representante" },
];

export const UFS = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG",
  "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
] as const;

const KIND_IDS = new Set(STORE_KINDS.map((item) => item.id));

export function cnpjDigits(value: string) {
  return value.replace(/\D/g, "").slice(0, 14);
}

export function formatCnpj(value: string) {
  const digits = cnpjDigits(value);
  const parts = [
    digits.slice(0, 2),
    digits.slice(2, 5),
    digits.slice(5, 8),
    digits.slice(8, 12),
    digits.slice(12, 14),
  ];
  let formatted = parts[0] ?? "";
  if (digits.length > 2) formatted += `.${parts[1]}`;
  if (digits.length > 5) formatted += `.${parts[2]}`;
  if (digits.length > 8) formatted += `/${parts[3]}`;
  if (digits.length > 12) formatted += `-${parts[4]}`;
  return formatted;
}

export function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function kindLabel(kind: StoreKind) {
  return STORE_KINDS.find((item) => item.id === kind)?.label ?? kind;
}

export type StoreInput = {
  tradeName: string;
  cnpj: string;
  city: string;
  state: string;
  buyerName: string;
  whatsapp: string;
  email: string;
  kind: string;
  interests: string[];
};

export type ParsedStore = Omit<RetailStore, "id" | "status" | "seeded" | "createdAt">;

export function parseStoreInput(input: StoreInput): { ok: true; value: ParsedStore } | { ok: false; message: string } {
  const tradeName = input.tradeName.trim();
  const city = input.city.trim();
  const buyerName = input.buyerName.trim();
  const state = input.state.trim().toUpperCase();
  const email = input.email.trim().toLowerCase();
  const cnpj = formatCnpj(input.cnpj);
  const whatsapp = formatPhone(input.whatsapp);
  const phoneDigits = whatsapp.replace(/\D/g, "");
  const interests = [...new Set(input.interests)].filter((id) => categories.some((category) => category.id === id));

  if (!tradeName || !city || !buyerName) {
    return { ok: false, message: "Informe o nome da loja, a cidade e quem compra." };
  }
  if (cnpjDigits(cnpj).length !== 14) {
    return { ok: false, message: "Informe o CNPJ com 14 números." };
  }
  if (!UFS.includes(state as (typeof UFS)[number])) {
    return { ok: false, message: "Escolha a UF." };
  }
  if (phoneDigits.length < 10) {
    return { ok: false, message: "Informe um WhatsApp com DDD." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: "Informe um e-mail válido." };
  }
  if (!KIND_IDS.has(input.kind as StoreKind)) {
    return { ok: false, message: "Escolha o tipo da loja." };
  }
  if (interests.length === 0) {
    return { ok: false, message: "Escolha ao menos uma linha de interesse." };
  }

  return {
    ok: true,
    value: {
      tradeName,
      cnpj,
      city,
      state,
      buyerName,
      whatsapp,
      email,
      kind: input.kind as StoreKind,
      interests,
    },
  };
}

export function parseContact(input: { whatsapp: string; email: string; interests: string[] }) {
  const email = input.email.trim().toLowerCase();
  const whatsapp = formatPhone(input.whatsapp);
  const interests = [...new Set(input.interests)].filter((id) => categories.some((category) => category.id === id));
  if (whatsapp.replace(/\D/g, "").length < 10) {
    return { ok: false as const, message: "Informe um WhatsApp com DDD." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false as const, message: "Informe um e-mail válido." };
  }
  if (interests.length === 0) {
    return { ok: false as const, message: "Escolha ao menos uma linha de interesse." };
  }
  return { ok: true as const, value: { whatsapp, email, interests } };
}
