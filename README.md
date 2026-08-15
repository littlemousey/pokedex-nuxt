# pokedex-nuxt

> Pokédex built with Nuxt 4 and Vue 3.
> This project started as a mirror of the [pokedex-vue](https://github.com/littlemousey/pokedex-vue) project, built with Nuxt in universal (server-side rendering) mode.

Originally written on Nuxt 2 / Vue 2 in 2019, rebuilt on Nuxt 4 in 2026. The retro
NES.css look is unchanged; the layouts are now responsive, dark-mode aware and
keyboard accessible.

## Stack

- [Nuxt 4](https://nuxt.com) — routing, SSR, auto-imports
- [Pinia](https://pinia.vuejs.org/) — state (`app/stores/`)
- [NES.CSS](https://nostalgic-css.github.io/NES.css/) — retro UI
- [PokéAPI](https://pokeapi.co/) — Pokémon data, sprites and cries
- [Vitest](https://vitest.dev) — tests

## Structure

```
app/
  components/   PokemonList, PokemonCard, SummaryFavorites, TypeBadge
  composables/  useAudio (autoplay-safe playback), useSession (cookie)
  middleware/   auth.global.ts — guards routes on server and client
  pages/        index, login, favorites, capture/[id]
  stores/       user, pokemonList, favoritePokemon
  utils/        catchCalculator, validatePassword, pokemon helpers
public/         sounds, favicon
test/           Vitest specs
```

## Requirements

Node >= 22.12 (see `.nvmrc`; run `nvm use`).

`npm run dev` does work on Node 20.19, but `npm run build` does not: the
production CSS minifier calls `Set.prototype.isSubsetOf`, which only exists
from Node 22. Since a build you cannot run is not much use, `engines` requires
22.

## Build setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm run dev

# build for production and serve
npm run build
npm run preview

# production start (what the Procfile runs)
npm run build && npm start

# generate a static site
npm run generate

# generate the SPA build GitHub Pages deploys
NUXT_APP_BASE_URL=/pokedex-nuxt/ npm run generate:pages

# tests, lint, types
npm run test
npm run lint
npm run typecheck
```

## Deployment

Pushes to `master` run [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):
lint, typecheck and tests, then `generate:pages`, then publish to GitHub Pages at
https://littlemousey.github.io/pokedex-nuxt/. Enable it once under
**Settings → Pages → Source → GitHub Actions**.

Because Pages has no Node runtime, that build alone runs with `ssr: false`
(`NUXT_SPA=true`) and serves `404.html` as the SPA fallback for deep links.
`npm run build && npm start` is unaffected and still server-renders.

Anything read from `public/` at runtime must go through `publicAsset()` so it
picks up the `/pokedex-nuxt/` base path.

## Logging in

The login is a puzzle, not real authentication. A password is accepted when it
is at most 32 characters, all lowercase letters, contains no `i`, contains three
consecutive ascending letters, and contains two pairs of repeated letters — for
example `abcaabb`. `pokemonmaster` bypasses all of it.

Session state (name and favourites) is kept in the `pokedexNuxtUser` cookie for
three days.
