<script setup lang="ts">
import type { PokemonListEntry } from '~/types/pokemon'
import { MAX_FAVORITES } from '~/stores/favoritePokemon'

const props = defineProps<{ pokemon: PokemonListEntry[] }>()

const favorites = useFavoritePokemonStore()

/**
 * Auto-picker for the "I can't choose, help me" button.
 *
 * Three bugs in the Nuxt 2 version: the interval was never cleared on unmount
 * so it kept firing after navigation; clicking twice started a second parallel
 * interval; and it indexed into the filtered list without checking it was
 * non-empty, throwing once everything was already picked.
 */
const intervalId = ref<ReturnType<typeof setInterval> | null>(null)
const isPicking = computed(() => intervalId.value !== null)

function stopPicking() {
  if (intervalId.value !== null) {
    clearInterval(intervalId.value)
    intervalId.value = null
  }
}

function pickRandomPokemon() {
  const available = props.pokemon.filter((p) => !favorites.isFavorite(p.name))
  if (available.length === 0) return false

  const choice = available[Math.floor(Math.random() * available.length)]
  if (!choice) return false

  return favorites.addFavorite(choice.name)
}

function startPicking() {
  if (isPicking.value) return // guard against a second parallel interval

  intervalId.value = setInterval(() => {
    if (favorites.isFull || !pickRandomPokemon()) {
      stopPicking()
    }
  }, 500)
}

onUnmounted(stopPicking)
</script>

<template>
  <aside class="favorites-summary" aria-labelledby="favorites-summary-heading">
    <div class="nes-container is-rounded favorites-summary__panel">
      <h2 id="favorites-summary-heading">Your favourites</h2>

      <p class="favorites-summary__count" role="status">
        {{ favorites.count }} / {{ MAX_FAVORITES }} chosen
      </p>

      <p v-if="!favorites.isFull">
        Can't choose?
        <button
          type="button"
          class="nes-btn is-success"
          :disabled="isPicking"
          @click="startPicking"
        >
          {{ isPicking ? 'Picking…' : 'Pick for me' }}
        </button>
      </p>

      <ul v-if="favorites.count" class="favorites-summary__list">
        <li v-for="name in favorites.favorites" :key="name" class="favorites-summary__item">
          <img src="~/assets/img/pokeball.png" alt="" aria-hidden="true" width="24" height="24" />
          {{ capitalize(name) }}
        </li>
      </ul>
      <p v-else class="favorites-summary__empty">No Pokémon picked yet.</p>

      <p v-if="!favorites.isFull && favorites.count > 0">
        You can add {{ favorites.remaining }} more.
      </p>

      <template v-if="favorites.isFull">
        <p>Your list is full!</p>
        <button
          type="button"
          class="nes-btn is-error"
          @click="favorites.eraseFavoritePokemonList()"
        >
          Delete the list
        </button>
      </template>

      <NuxtLink v-if="favorites.count" class="nes-btn is-primary" to="/favorites">
        View your favourites
      </NuxtLink>
    </div>
  </aside>
</template>

<style scoped>
.favorites-summary__panel {
  display: grid;
  gap: var(--space-3);
  background-color: var(--bg-raised);
}

.favorites-summary__list {
  list-style: none;
  padding: 0;
  display: grid;
  gap: var(--space-2);
}

.favorites-summary__item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
}

.favorites-summary__empty,
.favorites-summary__count {
  color: var(--text-muted);
  font-size: var(--text-sm);
}

/* Sticky sidebar on desktop only — on mobile it sits in the normal flow */
@media (min-width: 60rem) {
  .favorites-summary__panel {
    position: sticky;
    top: var(--space-4);
  }
}
</style>
