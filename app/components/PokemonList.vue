<script setup lang="ts">
import type { PokemonListEntry, Pokemon } from '~/types/pokemon'
import { MAX_FAVORITES } from '~/stores/favoritePokemon'

const props = defineProps<{
  pokemon: PokemonListEntry[]
  pending?: boolean
}>()

const favorites = useFavoritePokemonStore()
const { play, create } = useAudio()

const items = computed(() =>
  props.pokemon.map((entry) => {
    const id = pokemonId(entry)
    return {
      ...entry,
      id,
      displayName: capitalize(entry.name),
      spriteUrl: spriteUrl(id),
      isFavorite: favorites.isFavorite(entry.name)
    }
  })
)

async function toggle(name: string, id: number) {
  const result = favorites.toggleFavorite(name)
  if (result === 'added') await playPokemonCry(id)
}

/**
 * PokéAPI serves cries itself now, so this no longer depends on
 * pokemoncries.com. The URL is only known after a fetch, so this looks the
 * pokemon up on demand — cached by useAsyncData's payload for repeat picks.
 */
async function playPokemonCry(id: number) {
  try {
    const data = await $fetch<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const cry = data.cries?.legacy ?? data.cries?.latest
    if (cry) play(create(cry))
  } catch {
    // A missing cry should never interrupt picking a favourite.
  }
}
</script>

<template>
  <section aria-labelledby="pokemon-list-heading">
    <h2 id="pokemon-list-heading">Choose your Pokémon</h2>

    <p v-if="pending" class="pokemon-list__status">Loading the Pokédex…</p>

    <ul v-else class="pokemon-list">
      <li v-for="item in items" :key="item.url" class="pokemon-list__item">
        <article class="nes-container is-rounded pokemon-card">
          <p class="pokemon-card__number">
            No. {{ String(item.id).padStart(3, '0') }}
            <i
              v-if="item.isFavorite"
              class="nes-icon is-small heart"
              role="img"
              aria-label="Favourite"
            />
          </p>

          <img
            :src="item.spriteUrl"
            :alt="item.displayName"
            class="pokemon-card__sprite"
            width="96"
            height="96"
            loading="lazy"
          />

          <h3 class="pokemon-card__name">{{ item.displayName }}</h3>

          <button
            v-if="!item.isFavorite"
            type="button"
            class="nes-btn"
            :class="{ 'is-disabled': favorites.isFull }"
            :disabled="favorites.isFull"
            :aria-label="`Add ${item.displayName} to favourites`"
            @click="toggle(item.name, item.id)"
          >
            Pick me!
          </button>
          <button
            v-else
            type="button"
            class="nes-btn is-error"
            :aria-label="`Remove ${item.displayName} from favourites`"
            @click="toggle(item.name, item.id)"
          >
            Remove
          </button>
        </article>
      </li>
    </ul>

    <p v-if="favorites.isFull" class="pokemon-list__status" role="status">
      Your team is full — {{ MAX_FAVORITES }} Pokémon. Remove one to swap.
    </p>
  </section>
</template>

<style scoped>
.pokemon-list {
  list-style: none;
  padding: 0;
  margin-top: var(--space-4);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--card-min), 1fr));
  gap: var(--space-4);
}

.pokemon-card {
  display: grid;
  justify-items: center;
  gap: var(--space-2);
  height: 100%;
  background-color: var(--bg-raised);
  text-align: center;
}

.pokemon-card__number {
  font-size: var(--text-sm);
  color: var(--text-muted);
}

.pokemon-card__sprite {
  width: 96px;
  height: 96px;
}

.pokemon-card__name {
  font-size: var(--text-base);
  word-break: break-word;
}

.pokemon-list__status {
  margin-block: var(--space-4);
  text-align: center;
}
</style>
