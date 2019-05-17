<template>
  <div class="pokemon-list">
    <h2>Choose your Pokémon</h2>
    <p
      v-for="(pokemon, index) in pokemonList"
      :key="pokemon.url"
      class="pokemon-list-item"
    >
      {{ index + 1 + '. ' }}
      <i v-if="pokemon.isFavorite" class="nes-icon is-small heart" />
      <i v-else class="nes-icon is-small heart is-empty" />
      {{ pokemon.name }}
      <img
        :key="pokemon.url"
        :src="
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index +
            1}.png`
        "
        alt="Pokemon`"
      />
      <a
        v-show="!pokemon.isFavorite"
        class="nes-btn"
        :class="{ 'is-disabled': favoriteListLength === 10 }"
        @click="setFavorites(pokemon.name), playPokemonCry(index + 1)"
        >Pick me!</a
      >
      <button
        v-show="pokemon.isFavorite"
        class="nes-btn is-error"
        @click="setFavorites(pokemon.name), playPokemonCry(index + 1)"
      >
        Remove
      </button>
    </p>
  </div>
</template>

<script>
export default {
  name: 'PokemonList',
  props: {
    statePokemonDataList: {
      type: Array,
      required: true
    },
    stateFavoritePokemonList: {
      type: Array,
      required: true
    }
  },
  computed: {
    favoriteListLength() {
      return this.stateFavoritePokemonList.length
    },
    pokemonList() {
      return this.statePokemonDataList.map(pokemon => ({
        ...pokemon,
        isFavorite: this.stateFavoritePokemonList.includes(pokemon.name)
      }))
    }
  },
  methods: {
    setFavorites(name) {
      if (this.stateFavoritePokemonList.includes(name)) {
        const indexInArray = this.stateFavoritePokemonList.indexOf(name)
        this.$emit('deleteFavoritePokemon', indexInArray)
        return
      }
      if (this.favoriteListLength < 10) {
        this.$emit('addFavoritePokemon', name)
      }
    },
    playPokemonCry(pokemonId) {
      const audio = new Audio(
        `https://pokemoncries.com/cries-old/${pokemonId}.mp3`
      )
      audio.play()
    }
  }
}
</script>

<style scoped>
.pokemon-list {
  text-transform: capitalize;
}
.pokemon-list-item {
  display: flex;
  align-items: center;
}
</style>
