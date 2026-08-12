import { defineStore } from 'pinia'
import type { PokemonListEntry } from '~/types/pokemon'

export const usePokemonListStore = defineStore('pokemonList', () => {
  const pokemon = ref<PokemonListEntry[]>([])

  function setPokemonData(list: PokemonListEntry[]) {
    pokemon.value = list
  }

  return { pokemon, setPokemonData }
})
