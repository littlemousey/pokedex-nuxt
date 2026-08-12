<script setup lang="ts">
import type { PokemonListResponse } from '~/types/pokemon'

definePageMeta({ requiresAuth: true })

useHead({ title: 'Pokédex' })

const user = useUserStore()
const pokemonList = usePokemonListStore()

const { pending, error } = await useAsyncData('pokemon-list', async () => {
  const data = await $fetch<PokemonListResponse>(
    'https://pokeapi.co/api/v2/pokemon?limit=151'
  )
  pokemonList.setPokemonData(data.results)
  return data.results
})
</script>

<template>
  <div class="page">
    <header class="home__header">
      <img src="~/assets/img/logo-pixel.gif" alt="Pokémon" class="home__logo" />
      <p>Welcome {{ user.username || 'trainer' }}</p>
    </header>

    <p v-if="error" class="nes-container is-rounded nes-text is-error home__error" role="alert">
      The Pokédex could not reach PokéAPI. Check your connection and refresh.
    </p>

    <div v-else class="home__content">
      <PokemonList :pokemon="pokemonList.pokemon" :pending="pending" />
      <SummaryFavorites :pokemon="pokemonList.pokemon" />
    </div>
  </div>
</template>

<style scoped>
.home__header {
  display: grid;
  justify-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-5);
  text-align: center;
}

.home__logo {
  width: min(100%, 20rem);
}

.home__error {
  background-color: var(--bg-raised);
  text-align: center;
}

.home__content {
  display: grid;
  gap: var(--space-5);
}

/*
 * The Nuxt 2 version was a two-column flex with no wrap, so it overflowed on
 * anything narrow. The summary drops below the list on small screens.
 */
@media (min-width: 60rem) {
  .home__content {
    grid-template-columns: 1fr minmax(16rem, 22rem);
    align-items: start;
  }
}
</style>
