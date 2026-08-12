<script setup lang="ts">
import type { Pokemon, PokemonSpecies } from '~/types/pokemon'

const props = defineProps<{ pokemonName: string }>()

const { data, pending, error } = await useAsyncData(
  () => `pokemon-card-${props.pokemonName}`,
  async () => {
    const pokemon = await $fetch<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${props.pokemonName}/`
    )
    const species = await $fetch<PokemonSpecies>(pokemon.species.url)

    const englishEntry = species.flavor_text_entries.find(
      (entry) => entry.language.name === 'en'
    )

    return {
      pokemon,
      // PokéAPI embeds form feeds and newlines in flavour text.
      description: englishEntry?.flavor_text.replace(/[\n\f\r]/g, ' ') ?? ''
    }
  },
  { watch: [() => props.pokemonName] }
)
</script>

<template>
  <article class="nes-container is-rounded pokemon-detail">
    <p v-if="pending" class="pokemon-detail__status">Loading {{ pokemonName }}…</p>

    <p v-else-if="error || !data" class="pokemon-detail__status nes-text is-error">
      Could not load {{ pokemonName }}. Check your connection and refresh.
    </p>

    <template v-else>
      <img
        :src="spriteUrl(data.pokemon.id)"
        :alt="capitalize(data.pokemon.name)"
        class="pokemon-detail__image"
        width="150"
        height="150"
      />

      <div class="pokemon-detail__body">
        <h2 class="pokemon-detail__name">{{ capitalize(data.pokemon.name) }}</h2>
        <p class="pokemon-detail__number">No. {{ String(data.pokemon.id).padStart(3, '0') }}</p>

        <p class="pokemon-detail__types">
          <span class="visually-hidden">Types:</span>
          <TypeBadge v-for="entry in data.pokemon.types" :key="entry.slot" :type="entry.type.name" />
        </p>

        <p v-if="data.description" class="pokemon-detail__description">
          {{ data.description }}
        </p>

        <NuxtLink class="nes-btn is-primary" :to="`/capture/${data.pokemon.id}`">
          Catch
        </NuxtLink>
      </div>
    </template>
  </article>
</template>

<style scoped>
.pokemon-detail {
  display: grid;
  gap: var(--space-4);
  align-items: center;
  background-color: var(--bg-raised);
  height: 100%;
}

/* Side-by-side once there is room; stacked on narrow screens */
@media (min-width: 30rem) {
  .pokemon-detail {
    grid-template-columns: auto 1fr;
  }

  .pokemon-detail:has(.pokemon-detail__status) {
    grid-template-columns: 1fr;
  }
}

.pokemon-detail__image {
  width: 150px;
  height: 150px;
  justify-self: center;
}

.pokemon-detail__body {
  display: grid;
  gap: var(--space-2);
  justify-items: start;
}

.pokemon-detail__name {
  font-size: var(--text-lg);
}

.pokemon-detail__number,
.pokemon-detail__description {
  font-size: var(--text-sm);
  color: var(--text-muted);
}

.pokemon-detail__types {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.pokemon-detail__status {
  text-align: center;
}
</style>
