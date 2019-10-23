<template>
  <div class="select-pokemon-page">
    <img src="~/assets/img/logo-pixel.gif" alt="pokémon" />
    <p>
      Welcome <span v-if="username">{{ username }}</span>
      <span v-else>trainer</span>
    </p>
    <div class="select-pokemon-content">
      <pokemon-list
        :state-pokemon-data-list="statePokemonDataList"
        :state-favorite-pokemon-list="stateFavoritePokemonList"
        class="select-pokemon-list"
        @deleteFavoritePokemon="deleteFavorite"
        @addFavoritePokemon="addFavorite"
      />
      <summary-favorites
        :state-pokemon-data-list="statePokemonDataList"
        :state-favorite-pokemon-list="stateFavoritePokemonList"
        class="select-pokemon-summary"
        @addFavoritePokemon="addFavorite"
        @eraseFavoritePokemonList="eraseFavoritePokemonList"
      />
    </div>
  </div>
</template>

<script lang="ts">
import PokemonList from '@/components/PokemonList.vue'
import SummaryFavorites from '@/components/SummaryFavorites.vue'
import { mapState, mapActions } from 'vuex'
import { Component, Vue, Prop, namespace } from 'nuxt-property-decorator'
import axios, { AxiosResponse, AxiosPromise } from 'axios'

const user = namespace('user')
const favoritePokemon = namespace('favoritePokemon')
const pokemonList = namespace('pokemonList')

@Component({
  name: 'index',
  components: {
    PokemonList,
    SummaryFavorites
  },
  metaInfo: {
    meta: [{ requiresAuth: true }]
  }
})
export default class Index extends Vue {
  @pokemonList.Action setPokemonData
  @favoritePokemon.Action deleteFavorite
  @favoritePokemon.Action addFavorite
  @favoritePokemon.Action eraseFavoritePokemonList

  @pokemonList.State statePokemonDataList
  @favoritePokemon.State stateFavoritePokemonList
  @user.State username

  head() {
    return {
      title: 'Pokédex'
    }
  }
  async created() {
    const pokemonData = await this.getPokemonData()
    this.setPokemonData(pokemonData)
  }

  async getPokemonData() {
    const data = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
    return data.results
  }
}

// export default {
//   head() {
//     return {
//       title: 'Pokédex'
//     }
//   },
//   components: {
//     PokemonList,
//     SummaryFavorites
//   },
//   computed: {
//     ...mapState('pokemonList', ['statePokemonDataList']),
//     ...mapState('favoritePokemon', ['stateFavoritePokemonList']),
//     ...mapState('user', ['username'])
//   },
//   async created() {
//     const pokemonData = await this.getPokemonData()
//     this.setPokemonData(pokemonData)
//   },
//   methods: {
//     async getPokemonData() {
//       const data = await this.$axios.$get(
//         'https://pokeapi.co/api/v2/pokemon?limit=151'
//       )
//       return data.results
//     },
//     ...mapActions('pokemonList', ['setPokemonData']),
//     ...mapActions('favoritePokemon', ['deleteFavorite']),
//     ...mapActions('favoritePokemon', ['addFavorite']),
//     ...mapActions('favoritePokemon', ['eraseFavoritePokemonList'])
//   },
//   meta: {
//     requiresAuth: true
//   }
// }
</script>

<style scoped>
.select-pokemon-page {
  text-align: center;
}

.select-pokemon-content {
  text-align: left;
  display: flex;
  justify-content: space-evenly;
}
</style>
