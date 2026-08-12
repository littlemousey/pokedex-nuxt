import { defineStore } from 'pinia'

/**
 * The Nuxt 2 version repeated this cap as a literal `10` in PokemonList.vue,
 * SummaryFavorites.vue and both their templates. It lives in one place now.
 */
export const MAX_FAVORITES = 10

export const useFavoritePokemonStore = defineStore('favoritePokemon', () => {
  const favorites = ref<string[]>([])

  const count = computed(() => favorites.value.length)
  const isFull = computed(() => count.value >= MAX_FAVORITES)
  const remaining = computed(() => MAX_FAVORITES - count.value)

  function isFavorite(name: string) {
    return favorites.value.includes(name)
  }

  function addFavorite(name: string) {
    if (isFull.value || isFavorite(name)) return false
    favorites.value.push(name)
    return true
  }

  function deleteFavorite(name: string) {
    const index = favorites.value.indexOf(name)
    if (index !== -1) favorites.value.splice(index, 1)
  }

  function toggleFavorite(name: string) {
    if (isFavorite(name)) {
      deleteFavorite(name)
      return 'removed' as const
    }
    return addFavorite(name) ? ('added' as const) : ('rejected' as const)
  }

  function eraseFavoritePokemonList() {
    favorites.value = []
  }

  return {
    favorites,
    count,
    isFull,
    remaining,
    isFavorite,
    addFavorite,
    deleteFavorite,
    toggleFavorite,
    eraseFavoritePokemonList
  }
})
