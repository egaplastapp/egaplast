"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products as seedProducts } from "./catalogo";
import { cnpjDigits, parseContact, parseStoreInput, type StoreInput } from "./loja";
import type {
  DemoRole,
  PreOrder,
  PreOrderItem,
  PreOrderStatus,
  Product,
  RetailStore,
  Spec,
  StoreStatus,
} from "./types";

export type RegisterResult =
  | { ok: true; storeId: string; created: boolean }
  | { ok: false; message: string };

type DemoStore = {
  role: DemoRole | null;
  enter: (role: DemoRole) => void;
  leave: () => void;
  draft: PreOrderItem[];
  draftObservation: string;
  setDraftObservation: (value: string) => void;
  addItem: (productId: string) => void;
  addQuantity: (productId: string, amount: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  setItemNote: (productId: string, note: string) => void;
  removeItem: (productId: string) => void;
  orders: PreOrder[];
  submitDraft: () => PreOrder | null;
  updateStatus: (orderId: string, status: PreOrderStatus, note: string) => void;
  catalog: Product[];
  saveProduct: (input: ProductDraft) => void;
  removeProduct: (productId: string) => void;
  stores: RetailStore[];
  currentStoreId: string | null;
  registerStore: (input: StoreInput) => RegisterResult;
  updateStore: (storeId: string, input: StoreInput) => RegisterResult;
  setStoreStatus: (storeId: string, status: StoreStatus) => void;
  updateOwnContact: (input: { whatsapp: string; email: string; interests: string[] }) => RegisterResult;
};

export type ProductDraft = {
  id?: string;
  categoryId: string;
  name: string;
  line: string;
  references: string[];
  application?: string;
  specs: Spec[];
  packaging?: string;
  warranty?: string;
  imagem?: string;
  precoDemonstracao: number;
};

const DemoContext = createContext<DemoStore | null>(null);

let protocolSeq = 142;
let pedidoSeq = 7;

function protocol() {
  const value = `EGA-2026-${String(protocolSeq).padStart(4, "0")}`;
  protocolSeq += 1;
  return value;
}

function nextPedido() {
  const value = `PED-2026-${String(pedidoSeq).padStart(4, "0")}`;
  pedidoSeq += 1;
  return value;
}

function seedStores(): RetailStore[] {
  return [
    {
      id: "loja-seed-aguas",
      tradeName: "Materiais Exemplo Águas Claras",
      cnpj: "12.345.678/0001-95",
      city: "Brasília",
      state: "DF",
      buyerName: "Comprador exemplo",
      whatsapp: "(61) 90000-0001",
      email: "aguas@example.com",
      kind: "construcao",
      interests: ["cat-mecanismos", "cat-reparos"],
      status: "ativo",
      seeded: true,
      createdAt: "2026-10-08T14:00:00.000Z",
    },
    {
      id: "loja-seed-taguatinga",
      tradeName: "Hidráulica Exemplo Taguatinga",
      cnpj: "98.765.432/0001-10",
      city: "Taguatinga",
      state: "DF",
      buyerName: "Comprador exemplo",
      whatsapp: "(61) 90000-0002",
      email: "taguatinga@example.com",
      kind: "hidraulica",
      interests: ["cat-mecanismos", "cat-prolongadores"],
      status: "ativo",
      seeded: true,
      createdAt: "2026-10-09T16:10:00.000Z",
    },
    {
      id: "loja-seed-pausada",
      tradeName: "Distribuidora Exemplo Pausada",
      cnpj: "11.111.111/0001-11",
      city: "Anápolis",
      state: "GO",
      buyerName: "Comprador exemplo",
      whatsapp: "(62) 90000-0003",
      email: "pausada@example.com",
      kind: "distribuidor",
      interests: ["cat-escoamento"],
      status: "inativo",
      seeded: true,
      createdAt: "2026-10-07T10:00:00.000Z",
    },
  ];
}

function seedOrders(): PreOrder[] {
  return [
    {
      id: "seed-138",
      protocol: "EGA-2026-0138",
      status: "em_analise",
      items: [{ productId: "prd-kit-egaflush", quantity: 20, note: "" }],
      observation: "Exemplo para a demonstração. Não é um pré-pedido real.",
      createdAt: "2026-10-08T14:00:00.000Z",
      seeded: true,
      numeroPedido: null,
      storeId: "loja-seed-aguas",
      history: [
        {
          at: "2026-10-08T14:00:00.000Z",
          from: null,
          to: "enviado",
          note: "Registro de exemplo.",
        },
        {
          at: "2026-10-09T11:30:00.000Z",
          from: "enviado",
          to: "em_analise",
          note: "Comercial abriu a solicitação. Exemplo.",
        },
      ],
    },
    {
      id: "seed-140",
      protocol: "EGA-2026-0140",
      status: "aguardando_informacoes",
      items: [{ productId: "prd-prolongador", quantity: 40, note: "Confirmar acabamento." }],
      observation: "Exemplo para a demonstração. Não é um pré-pedido real.",
      createdAt: "2026-10-09T16:10:00.000Z",
      seeded: true,
      numeroPedido: null,
      storeId: "loja-seed-taguatinga",
      history: [
        {
          at: "2026-10-09T16:10:00.000Z",
          from: null,
          to: "enviado",
          note: "Registro de exemplo.",
        },
        {
          at: "2026-10-10T09:00:00.000Z",
          from: "enviado",
          to: "aguardando_informacoes",
          note: "Falta confirmar a referência vigente. Exemplo.",
        },
      ],
    },
  ];
}

function addToDraft(current: PreOrderItem[], productId: string, amount: number) {
  const existing = current.find((item) => item.productId === productId);
  if (existing) {
    return current.map((item) =>
      item.productId === productId ? { ...item, quantity: item.quantity + amount } : item,
    );
  }
  return [...current, { productId, quantity: amount, note: "" }];
}

function cloneCatalog(): Product[] {
  return seedProducts.map((product) => ({
    ...product,
    references: [...product.references],
    specs: product.specs.map((spec) => ({ ...spec })),
  }));
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function DemoProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<DemoRole | null>(null);
  const [draft, setDraft] = useState<PreOrderItem[]>([]);
  const [draftObservation, setDraftObservation] = useState("");
  const [orders, setOrders] = useState<PreOrder[]>(seedOrders);
  const [catalog, setCatalog] = useState<Product[]>(cloneCatalog);
  const [stores, setStores] = useState<RetailStore[]>(seedStores);
  const [currentStoreId, setCurrentStoreId] = useState<string | null>(null);

  const value = useMemo<DemoStore>(
    () => ({
      role,
      enter: setRole,
      leave: () => setRole(null),
      draft,
      draftObservation,
      setDraftObservation,
      addItem: (productId) => {
        setDraft((current) => addToDraft(current, productId, 1));
      },
      addQuantity: (productId, amount) => {
        const step = Math.floor(Number(amount));
        if (!Number.isFinite(step) || step < 1) return;
        setDraft((current) => addToDraft(current, productId, step));
      },
      setQuantity: (productId, quantity) => {
        const next = Math.floor(Number(quantity));
        if (!Number.isFinite(next)) return;
        setDraft((current) =>
          current.map((item) =>
            item.productId === productId ? { ...item, quantity: Math.max(1, next) } : item,
          ),
        );
      },
      setItemNote: (productId, note) => {
        setDraft((current) =>
          current.map((item) => (item.productId === productId ? { ...item, note } : item)),
        );
      },
      removeItem: (productId) => {
        setDraft((current) => current.filter((item) => item.productId !== productId));
      },
      orders,
      submitDraft: () => {
        if (draft.length === 0) return null;
        const store = stores.find((item) => item.id === currentStoreId) ?? null;
        if (role === "lojista" && (!store || store.status !== "ativo")) return null;
        if (store && store.status !== "ativo") return null;
        const now = new Date().toISOString();
        const order: PreOrder = {
          id: `local-${now}`,
          protocol: protocol(),
          status: "enviado",
          items: draft,
          observation: draftObservation,
          createdAt: now,
          seeded: false,
          numeroPedido: null,
          storeId: store?.id ?? null,
          history: [
            {
              at: now,
              from: "rascunho",
              to: "enviado",
              note: "Enviado na demonstração. Nenhum e-mail saiu e nenhuma venda foi confirmada.",
            },
          ],
        };
        setOrders((current) => [order, ...current]);
        setDraft([]);
        setDraftObservation("");
        return order;
      },
      updateStatus: (orderId, status, note) => {
        const now = new Date().toISOString();
        setOrders((current) =>
          current.map((order) => {
            if (order.id !== orderId || order.status === status) return order;
            const converting = status === "aprovado" && !order.numeroPedido;
            const numeroPedido = converting ? nextPedido() : order.numeroPedido;
            const written = note.trim();
            const historyNote = converting
              ? written
                ? `${written} Pedido ${numeroPedido}. A demonstração não confirma venda nem reserva estoque.`
                : `Aprovado e convertido em pedido ${numeroPedido}. A demonstração não confirma venda nem reserva estoque.`
              : written || "Atualização feita no painel de demonstração.";
            return {
              ...order,
              status,
              numeroPedido,
              history: [
                ...order.history,
                {
                  at: now,
                  from: order.status,
                  to: status,
                  note: historyNote,
                },
              ],
            };
          }),
        );
      },
      catalog,
      saveProduct: (input) => {
        setCatalog((current) => {
          const existing = input.id ? current.find((item) => item.id === input.id) : undefined;
          if (existing) {
            return current.map((item) =>
              item.id === existing.id
                ? {
                    ...existing,
                    ...input,
                    id: existing.id,
                    slug: existing.slug,
                    source: existing.source,
                    demonstration: existing.demonstration,
                    referenceNote: existing.referenceNote,
                  }
                : item,
            );
          }
          const id = `prd-sessao-${Date.now()}`;
          const created: Product = {
            ...input,
            id,
            slug: `${slugify(input.name) || "peca"}-${id.slice(-4)}`,
            source: "Cadastro desta sessão de demonstração.",
            demonstration: true,
          };
          return [...current, created];
        });
      },
      removeProduct: (productId) => {
        setCatalog((current) => current.filter((item) => item.id !== productId));
        setDraft((current) => current.filter((item) => item.productId !== productId));
      },
      stores,
      currentStoreId,
      registerStore: (input) => {
        const parsed = parseStoreInput(input);
        if (!parsed.ok) return parsed;
        const existing = stores.find((store) => cnpjDigits(store.cnpj) === cnpjDigits(parsed.value.cnpj));
        if (existing?.status === "inativo") {
          return { ok: false, message: "O comercial pausou esta loja. Ela não entra nem envia pré-pedido." };
        }
        if (existing) {
          if (currentStoreId && currentStoreId !== existing.id) {
            setDraft([]);
            setDraftObservation("");
          }
          setCurrentStoreId(existing.id);
          setRole("lojista");
          return { ok: true, storeId: existing.id, created: false };
        }
        const created: RetailStore = {
          ...parsed.value,
          id: `loja-sessao-${Date.now()}`,
          status: "ativo",
          seeded: false,
          createdAt: new Date().toISOString(),
        };
        setStores((current) => [...current, created]);
        setDraft([]);
        setDraftObservation("");
        setCurrentStoreId(created.id);
        setRole("lojista");
        return { ok: true, storeId: created.id, created: true };
      },
      updateStore: (storeId, input) => {
        const parsed = parseStoreInput(input);
        if (!parsed.ok) return parsed;
        const clash = stores.some(
          (store) => store.id !== storeId && cnpjDigits(store.cnpj) === cnpjDigits(parsed.value.cnpj),
        );
        if (clash) return { ok: false, message: "Este CNPJ já está em outra loja da sessão." };
        const found = stores.some((store) => store.id === storeId);
        if (!found) return { ok: false, message: "Loja não encontrada." };
        setStores((current) =>
          current.map((store) => (store.id === storeId ? { ...store, ...parsed.value } : store)),
        );
        return { ok: true, storeId, created: false };
      },
      setStoreStatus: (storeId, status) => {
        setStores((current) => current.map((store) => (store.id === storeId ? { ...store, status } : store)));
      },
      updateOwnContact: (input) => {
        if (role !== "lojista" || !currentStoreId) {
          return { ok: false, message: "Entre com a loja para atualizar o contato." };
        }
        const parsed = parseContact(input);
        if (!parsed.ok) return parsed;
        setStores((current) =>
          current.map((store) => (store.id === currentStoreId ? { ...store, ...parsed.value } : store)),
        );
        return { ok: true, storeId: currentStoreId, created: false };
      },
    }),
    [role, draft, draftObservation, orders, catalog, stores, currentStoreId],
  );

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const store = useContext(DemoContext);
  if (!store) throw new Error("useDemo precisa do DemoProvider");
  return store;
}
