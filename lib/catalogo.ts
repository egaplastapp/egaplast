import type { Category, Product } from "./types";

export const categories: Category[] = [
  {
    id: "cat-mecanismos",
    slug: "mecanismos",
    name: "Mecanismos para caixa acoplada",
    summary: "A especialidade da EGAPLAST desde 1999.",
    application: "Kits, entradas, saídas e acionadores para reposição de caixa acoplada.",
    imagem: "/fotos/kit-duplo.png",
  },
  {
    id: "cat-duchas",
    slug: "duchas-higienicas",
    name: "Duchas higiênicas",
    summary: "Metal, ABS cromado e ABS branco.",
    application: "Reposição e acabamento de ducha higiênica para o banheiro.",
    imagem: "/fotos/ducha.jpg",
  },
  {
    id: "cat-torneiras",
    slug: "torneiras-e-chuveiros",
    name: "Torneiras e chuveiros",
    summary: "Metal, ABS, gourmet e multidirecionais para lavatório, cozinha e tanque.",
    application: "Peças de uso aparente para cozinha, lavatório e tanque.",
    imagem: "/fotos/torneiras.png",
  },
  {
    id: "cat-black",
    slug: "linha-black",
    name: "Linha Black",
    summary: "Acabamento preto para torneiras, duchas, válvulas e ralos.",
    application: "Torneiras, duchas, válvulas e ralos na identidade Black.",
    imagem: "/fotos/black.png",
  },
  {
    id: "cat-reparos",
    slug: "reparos-e-acabamentos",
    name: "Reparos e acabamentos",
    summary: "Reparos e acabamentos para o registro embutido, sem quebrar a parede.",
    application: "Reparo de registro e torneira e acabamento visual da instalação.",
    imagem: "/fotos/reparos.jpg",
  },
  {
    id: "cat-prolongadores",
    slug: "prolongadores",
    name: "Prolongadores, conexões e adaptadores",
    summary: "Prolongadores, adaptadores e conexões para a instalação.",
    application: "Extensão de registro embutido, adaptadores e conexões.",
    imagem: "/fotos/prolongador.png",
  },
  {
    id: "cat-escoamento",
    slug: "escoamento",
    name: "Escoamento",
    summary: "Válvulas, ralos e acessórios para banheiro, cozinha e tanque.",
    application: "Saída de água de lavatório, pia e tanque.",
    imagem: "/fotos/valvula.png",
  },
];

export const products: Product[] = [
  {
    id: "prd-kit-egaflush",
    slug: "kit-completo-egaflush",
    categoryId: "cat-mecanismos",
    name: "Kit completo Egaflush, modelo superior, ajustável, com kit castelo",
    line: "Egaflush",
    references: ["10215", "12215"],
    referenceNote:
      "As duas referências aparecem no Guia 2023/2024 para esta descrição. A empresa ainda precisa confirmar qual código segue vigente.",
    application:
      "Reposição do mecanismo de caixa acoplada, com válvula de entrada ajustável e saída de 230 mm.",
    specs: [
      { label: "Entrada", value: "Ajustável de 190 mm a 300 mm" },
      { label: "Saída", value: "230 mm" },
      { label: "Temperatura máxima", value: "45 °C" },
      { label: "Pressão de rede", value: "1 a 210 m.c.a." },
      { label: "Rosca de entrada", value: "1/2”" },
      { label: "Rosca de saída", value: "2” (60 mm)" },
      { label: "Vida útil", value: "100.000 ciclos" },
    ],
    packaging: "Saco plástico, com vedação, parafusos e mangueira.",
    warranty: "5 anos",
    source: "Guia de Produtos 2023/2024",
    demonstration: true,
    precoDemonstracao: 89,
    imagem: "/fotos/kit-duplo.png",
  },
  {
    id: "prd-saida-dualflush",
    slug: "mecanismo-saida-dualflush",
    categoryId: "cat-mecanismos",
    name: "Mecanismo de saída Dualflush",
    line: "Dualflush",
    references: [],
    referenceNote: "O índice do site descreve o item e não publica o código.",
    application: "Duplo acionamento com dois estágios, 3 ou 6 litros, para acionamento superior.",
    specs: [
      { label: "Altura", value: "240 mm" },
      { label: "Vedação", value: "Vedante de silicone" },
      { label: "Instalação", value: "Universal para acionamento superior" },
      { label: "Vida útil", value: "100.000 ciclos" },
    ],
    warranty: "5 anos",
    source: "Índice público do site (llms.txt), ficha individual indisponível em outubro de 2026",
    demonstration: true,
    precoDemonstracao: 42,
  },
  {
    id: "prd-entrada-egaflush",
    slug: "mecanismo-entrada-egaflush",
    categoryId: "cat-mecanismos",
    name: "Mecanismo de entrada Egaflush",
    line: "Egaflush",
    references: [],
    referenceNote: "O índice do site descreve o item e não publica o código.",
    application: "Entrada de água da caixa acoplada, com altura regulável.",
    specs: [
      { label: "Ajuste de altura", value: "205 mm a 305 mm" },
      { label: "Temperatura máxima", value: "45 °C" },
      { label: "Pressão de rede", value: "1 a 210 m.c.a." },
      { label: "Pressão da água", value: "0,02 MPa a 1 MPa" },
      { label: "Rosca de entrada", value: "1/2”" },
      { label: "Vida útil", value: "100.000 ciclos" },
    ],
    source: "Índice público do site (llms.txt)",
    demonstration: true,
    precoDemonstracao: 31,
  },
  {
    id: "prd-ducha",
    slug: "ducha-higienica-ega",
    categoryId: "cat-duchas",
    name: "Ducha higiênica Ega",
    line: "Duchas higiênicas",
    references: [],
    referenceNote:
      "O índice lista várias duchas com este nome. Acabamento, código e medida de cada variação ainda não foram confirmados.",
    application: "Ducha higiênica da linha em metal, ABS cromado e ABS branco.",
    specs: [],
    source: "Nome no índice do site; subdivisões na home",
    demonstration: true,
    precoDemonstracao: 27,
    imagem: "/fotos/ducha-produto.png",
  },
  {
    id: "prd-torneira-lavatorio",
    slug: "torneira-para-lavatorio",
    categoryId: "cat-torneiras",
    name: "Torneira para lavatório",
    line: "Torneiras e chuveiros",
    references: [],
    referenceNote: "O índice agrupa várias torneiras sob este nome, sem código nesta fonte.",
    application: "Torneira de lavatório em metal ou ABS.",
    specs: [],
    source: "Nome no índice do site",
    demonstration: true,
    precoDemonstracao: 39,
    imagem: "/fotos/torneira-abs.png",
  },
  {
    id: "prd-gourmet",
    slug: "torneira-gourmet-multidirecional",
    categoryId: "cat-torneiras",
    name: "Torneira gourmet multidirecional",
    line: "Torneiras e chuveiros",
    references: [],
    referenceNote: "Código não publicado no índice consultado.",
    application: "Torneira de cozinha com rotação de 360º.",
    specs: [],
    source: "Nome no índice do site; texto de linha na home",
    demonstration: true,
    precoDemonstracao: 96,
    imagem: "/fotos/gourmet.png",
  },
  {
    id: "prd-black",
    slug: "torneira-multidirecional-preta",
    categoryId: "cat-black",
    name: "Torneira multidirecional preta",
    line: "Linha Black",
    references: [],
    referenceNote: "Código não publicado no índice consultado.",
    application: "Torneira com acabamento preto da Linha Black.",
    specs: [],
    source: "Nome no índice do site",
    demonstration: true,
    precoDemonstracao: 104,
    imagem: "/fotos/black-torneira.png",
  },
  {
    id: "prd-mvs",
    slug: "mvs-para-registro",
    categoryId: "cat-reparos",
    name: "MVS para registro",
    line: "Reparos e acabamentos",
    references: [],
    referenceNote:
      "O índice do site reúne dezenas de variações com este nome. Nenhuma referência foi copiada sem o código correspondente.",
    application: "Reparo de registro para vedação da instalação.",
    specs: [],
    source: "Nome no índice do site; texto de linha na home",
    demonstration: true,
    precoDemonstracao: 14,
    imagem: "/fotos/mvs.png",
  },
  {
    id: "prd-prolongador",
    slug: "prolongador",
    categoryId: "cat-prolongadores",
    name: "Prolongador",
    line: "Prolongadores",
    references: [],
    referenceNote: "O índice descreve a peça e não publica o código.",
    specs: [
      { label: "Material", value: "Metal cromado" },
      { label: "Rosca", value: "MF 1/2”" },
    ],
    source: "Índice público do site (llms.txt)",
    demonstration: true,
    precoDemonstracao: 9,
    imagem: "/fotos/prolongador.png",
  },
  {
    id: "prd-valvula",
    slug: "valvula-para-lavatorio",
    categoryId: "cat-escoamento",
    name: "Válvula para lavatório",
    line: "Escoamento",
    references: [],
    referenceNote: "O índice descreve uma das válvulas e não publica o código nesta fonte.",
    specs: [
      { label: "Material", value: "Metal cromado" },
      { label: "Furação", value: "7/8”" },
      { label: "Acompanha", value: "Tampão de plástico" },
    ],
    warranty: "5 anos",
    source: "Índice público do site (llms.txt)",
    demonstration: true,
    precoDemonstracao: 19,
    imagem: "/fotos/valvula.png",
  },
];

export function categoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function productsByCategory(categoryId: string) {
  return products.filter((product) => product.categoryId === categoryId);
}

export function productBySlug(categorySlug: string, slug: string) {
  const category = categoryBySlug(categorySlug);
  if (!category) return undefined;
  return products.find((product) => product.categoryId === category.id && product.slug === slug);
}

export function productById(id: string) {
  return products.find((product) => product.id === id);
}

export function relatedProducts(product: Product) {
  return products.filter(
    (item) => item.categoryId === product.categoryId && item.id !== product.id,
  );
}
