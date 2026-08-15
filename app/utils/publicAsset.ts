/**
 * Resolves a path in `public/` against the app's base URL.
 *
 * Absolute paths like `/sounds/flee.mp3` are correct when the app is served
 * from the domain root, but the GitHub Pages deploy serves it from
 * `/pokedex-nuxt/`. Nuxt rewrites asset URLs it generates itself; strings
 * handed to `new Audio()` are invisible to it, so they need this.
 */
export function publicAsset(path: string) {
  const base = useRuntimeConfig().app.baseURL
  return `${base.replace(/\/?$/, '/')}${path.replace(/^\//, '')}`
}
