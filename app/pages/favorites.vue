<script setup lang="ts">
definePageMeta({ requiresAuth: true })

useHead({ title: 'Favourites — Pokédex' })

const favorites = useFavoritePokemonStore()
</script>

<template>
  <div class="page">
    <header class="favorites__header">
      <h1>Your favourite Pokémon</h1>
      <NuxtLink class="nes-btn" to="/">Go back</NuxtLink>
    </header>

    <p v-if="!favorites.count" class="favorites__empty">
      You haven't picked any Pokémon yet.
    </p>

    <div v-else class="favorites__grid">
      <PokemonCard v-for="name in favorites.favorites" :key="name" :pokemon-name="name" />
    </div>
  </div>
</template>

<style scoped>
.favorites__header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: var(--space-5);
}

.favorites__grid {
  display: grid;
  gap: var(--space-4);
}

@media (min-width: 55rem) {
  .favorites__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.favorites__empty {
  text-align: center;
  color: var(--text-muted);
}
</style>
