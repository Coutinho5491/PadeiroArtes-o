# O Padeiro Artesão — site

Landing page da boulangerie & pâtisserie O Padeiro Artesão, em Vinhedo/SP.
Proposta comercial com conteúdo real: cardápio, preços e fotos vêm do iFood e do Instagram oficiais.
Antes de publicar, veja **[PENDENCIAS.md](PENDENCIAS.md)**.

## Rodar o projeto

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm run start   # produção
```

Node 20.9+.

## Stack

- Next.js 16 (App Router, Turbopack, Cache Components) com React 19 e TypeScript
- Tailwind CSS 4: tokens da marca em `src/app/globals.css`
- GSAP + ScrollTrigger: parallax, seções fixadas, rolagem horizontal e zoom no scroll
- Motion: microinterações, stagger, menu, abas, toast e lightbox
- lucide-react: ícones

Não há Three.js: as fotos são as protagonistas e o efeito 3D sutil (inclinação no card de destaque) é feito com Motion.

## Onde editar o conteúdo

| O quê | Arquivo |
|---|---|
| Links (iFood, Instagram, Maps), endereço, horários, telefone/WhatsApp | `src/data/site.ts` |
| Categorias, produtos, descrições e preços | `src/data/products.ts` |
| Fotos da galeria | `src/data/gallery.ts` |
| Fotografias | `src/assets/photos/` (substitua mantendo o nome) |
| Logotipo | `src/assets/brand/` |
| Título, descrição e SEO | `src/app/layout.tsx` |

**Horários e WhatsApp:** os campos com `status: "pending"` não aparecem no site. Quando confirmar, troque para `"confirmed"`; o site, o rodapé e o JSON-LD passam a exibir os dados.

**Novas fotos em alta resolução:** coloque os originais numa pasta e rode `node scripts/process-images.mjs <pasta-ifood> <pasta-instagram>`. O script reduz para no máximo 1600px e nunca amplia.

## Estrutura da página

1. Hero
2. Detalhes sensoriais (seção fixada no desktop)
3. Vitrine por categoria
4. Produto em foco (Entremet citron)
5. História e chef
6. Momentos (rolagem horizontal)
7. Galeria com lightbox
8. Como pedir
9. Visite a loja (mapa)
10. Instagram
11. Rodapé

## Acessibilidade e desempenho

- Respeita "reduzir movimento": sem pin, sem parallax e sem animações de entrada.
- Navegação completa por teclado:
  - abas com setas, Home e End
  - lightbox com setas e Esc, devolvendo o foco
  - menu móvel com Esc
  - link "Pular para o conteúdo"
- Imagens com `next/image`: AVIF/WebP, dimensões explícitas, placeholder blur e lazy loading abaixo da dobra.
- Sem integração com o iFood: todos os botões de pedido abrem a página oficial da loja.
