# AGENTS.md

## Projeto
- Site estatico de portfolio em portugues (`pt-BR`), sem framework, bundler, package manager, testes ou CI configurados.
- Entrypoint unico: `index.html`, que carrega `styles.css` e `script.js` por caminhos relativos na raiz.
- Nao invente comandos `npm`, build, lint ou test: nao ha `package.json` nem configuracao equivalente neste repositorio.

## Estrutura
- `index.html`: conteudo, navegacao por ancoras (`#hero`, `#skills`, `#projects`, `#contact`) e inclusao da fonte Inter via Google Fonts.
- `styles.css`: tema visual completo, responsividade e estados usados pelo JavaScript (`.is-open`, `.fade-section`, `.is-visible`).
- `script.js`: menu mobile acessivel via `aria-expanded` e animacao de entrada com `IntersectionObserver`.

## Cuidados Ao Alterar
- Ao renomear secoes, IDs ou classes em `index.html`, atualize tambem os seletores correspondentes em `styles.css` e `script.js`.
- Preserve o comportamento mobile: o botao `.menu-toggle` abre/fecha `.nav-links` e deve manter `aria-expanded` sincronizado.
- O JavaScript assume que `.menu-toggle`, `.nav-links` e as secoes existem; se remover esses elementos, ajuste o script para evitar erro em tempo de execucao.
- O texto do site esta majoritariamente em portugues sem acentos; mantenha consistencia salvo pedido explicito para revisar a ortografia.

## Verificacao
- Verificacao principal e manual no navegador abrindo `index.html`; confira desktop e largura mobile.
- Teste minimo apos mudancas visuais ou de markup: links de navegacao por ancora, menu mobile, animacoes de entrada e layout responsivo nos breakpoints de `860px` e `1060px`.
