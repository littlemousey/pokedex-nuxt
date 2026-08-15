// https://nuxt.com/docs/api/configuration/nuxt-config

// GitHub Pages serves a project site from https://<user>.github.io/<repo>/, so
// every URL the app emits needs that prefix. The deploy workflow sets
// NUXT_APP_BASE_URL; locally it stays '/'.
const baseURL = (process.env.NUXT_APP_BASE_URL || '/').replace(/\/?$/, '/')

// `npm run generate:pages` sets this. Pages is a plain static host with no Node
// runtime, and every page here fetches PokéAPI from the browser anyway, so that
// build ships a SPA: `nuxt generate` emits an index.html plus a 404.html
// fallback, and deep links like /capture/25 hand off to the client router
// instead of prerendering 151 detail pages. Every other build stays universal.
const spa = process.env.NUXT_SPA === 'true'

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',

  ssr: !spa,

  devtools: { enabled: true },

  modules: ['@pinia/nuxt', '@nuxt/eslint', '@nuxt/test-utils/module'],

  app: {
    baseURL,

    head: {
      title: 'Pokédex',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Pokedex built with Vue Nuxt'
        },
        { name: 'theme-color', content: '#212529' }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: `${baseURL}favicon.ico` }]
    }
  },

  css: ['nes.css/css/nes.css', '~/assets/css/tokens.css', '~/assets/css/base.css'],

  eslint: {
    config: {
      stylistic: false
    }
  }
})
