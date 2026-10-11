# Protótipo EGAPLAST

Site clicável para o diretor avaliar a direção do novo site institucional e do futuro portal de pré-pedidos. Nada aqui confirma venda, grava cliente ou envia e-mail.

## Como abrir

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

A barra do topo alterna duas apresentações com os mesmos dados:

- Versão 1, em `/`
- Apresentação v2, em `/v2`, com o portal em `/v2/portal/entrar`

## O que dá para percorrer

Área pública, sem entrada:

- Início, linhas, categoria e ficha.
- A EGAPLAST, Para a sua loja, Materiais e Atendimento.
- Os formulários só confirmam na tela.

Área do lojista, em memória:

- Entrar como lojista monta um carrinho e gera um pré-pedido, por exemplo `EGA-2026-0142`.
- No portal da v2, a tabela é fictícia e não aparece no site público. O número de pedido, por exemplo `PED-2026-0007`, só nasce quando o comercial aprova e converte.
- Abrir o painel comercial troca o status e registra a mudança no histórico.
- Recarregar a página apaga a sessão, a lista e os protocolos criados na hora. Dois exemplos voltam a aparecer.

## O que é demonstração

- Catálogo curto, com texto já publicado no site ou no Guia 2023/2024. Código e medida que não estavam na fonte ficam pendentes. A ficha pública diz “sob consulta”. No portal da v2, os preços são números redondos e fictícios, sem imposto e sem frete. A foto fica reservada até existir um arquivo cadastrado.
- A empresa “Loja Exemplo Materiais Ltda.” não existe.
- O logotipo é o SVG oficial do site. A fonte é Manrope, livre, no lugar da Gotham, cuja licença ainda não foi confirmada.
- O laranja da marca aparece no losango e no contorno do botão secundário. O botão principal é azul `#002F87` com texto branco, para o rótulo continuar legível.

## O que fica para a implementação

Supabase (PostgreSQL, Auth, Storage), RLS, variáveis de ambiente, envio real ao comercial, WhatsApp único, download dos arquivos, ficha vigente confirmada pela fábrica e publicação. O catálogo público e o portal devem continuar lendo os mesmos produtos, trocando só a origem dos dados.
