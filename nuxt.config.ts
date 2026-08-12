// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',

  devtools: { enabled: true },

  modules: ['@pinia/nuxt', '@nuxt/eslint', '@nuxt/test-utils/module'],

  app: {
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
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    }
  },

  css: ['nes.css/css/nes.css', '~/assets/css/tokens.css', '~/assets/css/base.css'],

  eslint: {
    config: {
      stylistic: false
    }
  }
})
