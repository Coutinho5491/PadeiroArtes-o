# Pendências de validação — O Padeiro Artesão

Pesquisa feita em 14/10/2026 no iFood, no Instagram @opadeiroartesao e no Google Maps.
Nada abaixo foi inventado; os itens listados precisam de confirmação da loja antes da publicação.

## 1. Horários de funcionamento — divergentes
O site **não exibe horários** enquanto `hours.status = "pending"` em `src/data/site.ts`. Mostra um aviso e um link para o Google Maps.

| Fonte | Horário informado |
|---|---|
| Google Maps (ficha da loja) | Seg fechado · Ter–Sex 07:30–19:00 · Sáb 08:00–17:00 · Dom 08:00–13:00 |
| Restaurant Guru | Seg 07:30–18:00 · Ter–Sex 07:30–19:00 · Sáb 08:00–17:00 · Dom 08:00–13:00 |
| Instagram (post de 10/10/2026) | "Horário de funcionamento: 08h às 17h" |
| iFood (aba Horário) | "Não abre" em todos os dias (provável configuração do delivery) |

**Ação:** confirmar com a loja, ajustar `hours.week` e trocar o status para `"confirmed"`. Os horários passam a aparecer no site, no rodapé e nos dados estruturados (JSON-LD).

## 2. Telefone e WhatsApp — divergentes
- (19) 99263-0242: Google Maps
- (19) 99142-7359: Restaurant Guru / Site da Cidade
- (19) 3826-3506: Solutudo
- (19) 99204-1016: cadastro de CNPJ (cnpj.biz)

Nenhum número foi confirmado como WhatsApp oficial, por isso o site **não tem botão de WhatsApp**.
**Ação:** preencher `contact.phone`, `contact.whatsapp` (só dígitos, com 55) e o status `"confirmed"`. O botão aparece no rodapé, e o telefone na seção "Visite" e no JSON-LD.
Confirmar também os usos do WhatsApp (dúvidas, encomendas).

## 3. Dados legais (CNPJ)
- O iFood mostra o CNPJ **10.548.885/0001-11**.
- O cnpj.biz lista "O Padeiro Artesão LTDA", **51.356.650/0001-05**, na Av. Benedito Storani, 1011 (Santa Rosa).

O rodapé não exibe CNPJ. **Ação:** confirmar a razão social e o CNPJ que devem aparecer.

## 4. Autorização das fotografias
Todas as fotos foram publicadas pela própria marca:
- 33 fotos de produto do cardápio no iFood, usadas no tamanho original, sem ampliação
- 3 fotos do Instagram: chef com o pão (12/10/2026), mãos modelando o pão de alecrim (01/10/2026) e oficina de cupcakes (10/10/2026)

**Ação:** obter autorização formal de uso e, de preferência, os arquivos originais em alta resolução. As fotos do Instagram têm no máximo 640px.
Para trocar uma foto, substitua o arquivo em `src/assets/photos/` mantendo o mesmo nome.
O logotipo veio do iFood (262px) e recebeu fundo transparente. **Ação:** pedir o arquivo vetorial (SVG/PDF) do logo.

## 5. Conteúdo a confirmar com o proprietário
- **Identidade na foto da seção História:** o post de 12/10 está em primeira pessoa ("O pão me levou pelo mundo"). Assumimos que a pessoa na foto é o chef Fernando de Oliveira, mas isso precisa ser confirmado.
- **Papel do chef:** o iFood fala em "receitas do chef Fernando de Oliveira". O site não o chama de fundador nem de proprietário.
- **Brunches (Petit Déjeuner e Brunch Famille):** anunciados no Instagram em 03/10/2026, sem preço e fora do cardápio do iFood. Confirmar se são servidos só na loja.
- **Massa Show (almoço):** lançado em 08/10/2026. O preço "a partir de R$ 39,90" foi omitido de propósito, porque era promocional.
- **Matéria na VEJA Gastronomia (set/2026):** citada a partir do post da marca. Se quiser, envie o link da matéria.
- **Bairro:** o iFood e o Google usam "Nova Vinhedo", e um post usa "Jd Santa Rosa". O site usa Nova Vinhedo.
- **Facebook:** existe uma página "O Padeiro Artesão – Boulangerie & Pâtisserie" (facebook.com/opadeiroartesao). Ela não foi linkada porque não deu para confirmar que é oficial.

## 6. Preços
Os preços são do iFood em 14/10/2026 (`priceUpdatedAt` em `src/data/products.ts`). Kombuchas com desconto temporário e bebidas de terceiros ficaram de fora.
Sem integração com o iFood, os preços precisam ser revisados manualmente.

## 7. Publicação
- Definir o domínio e configurar `NEXT_PUBLIC_SITE_URL` (usado em canonical, Open Graph, sitemap, robots e JSON-LD).
- Hoje o padrão é `http://localhost:3000`.
- Ao publicar como site oficial, trocar `business.proposalMode` para `false` (remove a linha "Proposta de site" do rodapé).

## Avaliações públicas (referência interna, não publicadas)
Google: nota 4,0 com 540 avaliações. iFood: 4,9.

Temas positivos recorrentes:
- pão de fermentação natural
- croissant e doces
- café da manhã
- ambiente agradável
- "técnica europeia"

Temas negativos recorrentes:
- atendimento lento e organização do serviço
- experiências ruins com delivery

O site não exibe avaliações nem depoimentos.
