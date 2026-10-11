"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { DemoRole, PreOrder, PreOrderItem, PreOrderStatus } from "./types";

type DemoStore = {
  role: DemoRole | null;
  enter: (role: DemoRole) => void;
  leave: () => void;
  draft: PreOrderItem[];
  draftObservation: string;
  setDraftObservation: (value: string) => void;
  addItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  setItemNote: (productId: string, note: string) => void;
  removeItem: (productId: string) => void;
  orders: PreOrder[];
  submitDraft: () => PreOrder | null;
  updateStatus: (orderId: string, status: PreOrderStatus, note: string) => void;
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

export function DemoProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<DemoRole | null>(null);
  const [draft, setDraft] = useState<PreOrderItem[]>([]);
  const [draftObservation, setDraftObservation] = useState("");
  const [orders, setOrders] = useState<PreOrder[]>(seedOrders);

  const value = useMemo<DemoStore>(
    () => ({
      role,
      enter: setRole,
      leave: () => setRole(null),
      draft,
      draftObservation,
      setDraftObservation,
      addItem: (productId) => {
        setDraft((current) => {
          const existing = current.find((item) => item.productId === productId);
          if (existing) {
            return current.map((item) =>
              item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item,
            );
          }
          return [...current, { productId, quantity: 1, note: "" }];
        });
      },
      setQuantity: (productId, quantity) => {
        setDraft((current) =>
          current.map((item) =>
            item.productId === productId ? { ...item, quantity: Math.max(1, quantity) } : item,
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
    }),
    [role, draft, draftObservation, orders],
  );

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const store = useContext(DemoContext);
  if (!store) throw new Error("useDemo precisa do DemoProvider");
  return store;
}
