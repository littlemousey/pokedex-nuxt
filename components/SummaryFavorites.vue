<template>
  <div>
    <h2>Your chosen favorite Pokémon</h2>
    <p v-if="favoriteListLength < maximumList">
      I can't choose, help me
      <button class="nes-btn is-success" @click="startInterval">
        Pick Pokémon
      </button>
    </p>
    <p
      v-for="(pokemonName, index) in stateFavoritePokemonList"
      :key="`fav-pkm-${index}`"
      class="chosen-pokemon"
    >
      <img src="../assets/img/pokeball.png" alt="pokeball" />
      {{ pokemonName }}
    </p>
    <p v-show="morePokemonCanBeAdded">
      You can add {{ maximumList - favoriteListLength }} more Pokémon
    </p>
    <p v-if="favoriteListLength > 9">
      Your list is full!
    </p>
    <p v-if="favoriteListLength > 9">
      Do you want to
      <button class="nes-btn is-error" @click="emptyFavoritePokemonList">
        Delete
      </button>
      the list?
    </p>
    <router-link v-if="favoriteListLength > 0" class="nes-btn" to="/favorites">
      View your favorite Pokémon
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import Pokemon from '~/types/Pokemon.type'

@Component({
  name: 'SummaryFavorites'
})
export default class SummaryFavorites extends Vue {
  @Prop({ required: true })
  statePokemonDataList!: Array<Pokemon>

  @Prop({ required: true })
  stateFavoritePokemonList!: Array<string>

  maximumList: number = 10

  get favoriteListLength(): number {
    return this.stateFavoritePokemonList.length
  }

  get morePokemonCanBeAdded(): boolean {
    return (
      this.favoriteListLength > 1 && this.favoriteListLength < this.maximumList
    )
  }
  startInterval() {
    const self = this
    const intervalID = window.setInterval(pickRandomPokemonOrClearInterval, 500)
    function pickRandomPokemonOrClearInterval() {
      if (self.favoriteListLength < self.maximumList) {
        self.pickRandomPokemon()
      } else {
        clearInterval(intervalID)
      }
    }
  }

  pickRandomPokemon() {
    const list = this.statePokemonDataList.filter(pokemon => {
      return !this.stateFavoritePokemonList.includes(pokemon.name)
    })

    const number = Math.floor(Math.random() * Math.floor(list.length))
    this.$emit('addFavoritePokemon', list[number].name)
  }

  emptyFavoritePokemonList() {
    this.$emit('eraseFavoritePokemonList')
  }
}
</script>

<style scoped>
.chosen-pokemon {
  text-transform: capitalize;
}
</style>
