/**
 * Type the custom page meta the global auth middleware reads. Nuxt 2 exposed
 * this as a `meta` component option; Nuxt 4 uses `definePageMeta`.
 */
declare module '#app' {
  interface PageMeta {
    requiresAuth?: boolean
  }
}

export {}
