/** Tipos alinhados às tabelas previstas para o portal real. Nesta fase só existem em memória. */

export type Category = {
  id: string;
  slug: string;
  name: string;
  summary: string;
  application: string;
  /** Foto publicada no site da EGAPLAST. */
  imagem?: string;
};

export type Spec = {
  label: string;
  value: string;
};

export type Product = {
  id: string;
  slug: string;
  categoryId: string;
  name: string;
  line: string;
  /** Códigos impressos em fonte oficial. Vazio quando o índice não publica código. */
  references: string[];
  referenceNote?: string;
  application?: string;
  specs: Spec[];
  packaging?: string;
  warranty?: string;
  /** Origem do texto técnico. */
  source: string;
  /** A ficha usa dado publicado, mas a vigência em 2026 ainda não foi confirmada pela empresa. */
  demonstration: boolean;
  /** Caminho ou URL da foto. Vazio até o cadastro ou o arquivo existir. */
  imagem?: string;
  /** Valor redondo e fictício, em reais. Só o portal de demonstração pode exibir. */
  precoDemonstracao: number;
};

export type PreOrderStatus =
  | "rascunho"
  | "enviado"
  | "em_analise"
  | "aguardando_informacoes"
  | "aprovado"
  | "rejeitado"
  | "cancelado";

export type PreOrderItem = {
  productId: string;
  quantity: number;
  note: string;
};

export type StatusChange = {
  at: string;
  from: PreOrderStatus | null;
  to: PreOrderStatus;
  note: string;
};

export type PreOrder = {
  id: string;
  protocol: string;
  status: PreOrderStatus;
  items: PreOrderItem[];
  observation: string;
  createdAt: string;
  history: StatusChange[];
  /** Pedidos de exemplo, distintos dos que o diretor criar na sessão. */
  seeded: boolean;
  /** Preenchido só quando o comercial aprova e converte. */
  numeroPedido: string | null;
  /** Loja da sessão que enviou. Nulo quando a v1 envia sem cadastro. */
  storeId: string | null;
};

export type StoreStatus = "ativo" | "inativo";

export type StoreKind =
  | "construcao"
  | "hidraulica"
  | "home_center"
  | "distribuidor"
  | "representante";

export type RetailStore = {
  id: string;
  tradeName: string;
  cnpj: string;
  city: string;
  state: string;
  buyerName: string;
  whatsapp: string;
  email: string;
  kind: StoreKind;
  /** Ids das categorias já existentes no catálogo. */
  interests: string[];
  status: StoreStatus;
  /** Loja fictícia da demonstração. Não é cliente da EGAPLAST. */
  seeded: boolean;
  createdAt: string;
};

export type DemoRole = "lojista" | "comercial";

export const STATUS_LABEL: Record<PreOrderStatus, string> = {
  rascunho: "Rascunho",
  enviado: "Enviado",
  em_analise: "Em análise",
  aguardando_informacoes: "Aguardando informações",
  aprovado: "Aprovado",
  rejeitado: "Rejeitado",
  cancelado: "Cancelado",
};

export const DEMO_COMPANY = {
  name: "Loja Exemplo Materiais Ltda.",
  city: "Brasília",
  state: "DF",
  phone: "(61) 90000-0000",
  note: "Empresa fictícia, usada só nesta demonstração. Não é um cliente da EGAPLAST.",
};
