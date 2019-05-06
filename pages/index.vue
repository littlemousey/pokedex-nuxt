<template>
  <div class="login-screen__form">
    <p>Who dares to open this Pokédex? Are you a trainer?</p>
    <div class="nes-field">
      <label for="name_field">Your name</label>
      <input
        id="name_field"
        v-model="username"
        type="text"
        class="nes-input"
        @keyup.enter="checkPassword"
      />
    </div>
    <div class="nes-field">
      <label for="password_field">Password</label>
      <input
        id="password_field"
        v-model="password"
        type="password"
        class="nes-input"
        @keyup.enter="checkPassword"
      />
    </div>
    <a class="nes-btn" @click="checkPassword">Continue</a>
    <p v-if="showPasswordError" class="nes-text is-error">
      Oops, that was a wrong password. Try again
    </p>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { validatePassword } from '@/utils/validatePassword'

const LOCAL_STORAGE_PKM_NAMES = 'favoritePokemonNames'
const LOCAL_STORAGE_USER = 'userLoggedIn'

export default {
  data: function() {
    return {
      username: '',
      password: '',
      passwordCorrect: false,
      showPasswordError: false
    }
  },
  computed: {
    ...mapState(['loggedIn'])
  },
  async created() {
    const pokemonData = await this.getPokemonData()
    this.setPokemonData(pokemonData)
  },
  mounted() {
    this.getDataFromLocalStorage()
    if (this.loggedIn) {
      this.$router.push('/selectPokemon')
    }
  },
  methods: {
    checkPassword() {
      this.passwordCorrect = validatePassword(this.password)
      if (this.passwordCorrect) {
        this.setUserLoggedIn()
        this.$router.push('selectPokemon')
      } else {
        this.showPasswordError = true
      }
    },
    getDataFromLocalStorage() {
      const localStoragePkmNames = JSON.parse(
        window.localStorage.getItem(LOCAL_STORAGE_PKM_NAMES)
      )
      const localStorageUser = JSON.parse(
        window.localStorage.getItem(LOCAL_STORAGE_USER)
      )
      if (localStoragePkmNames) {
        this.setFavoritePokemonList(localStoragePkmNames)
      }
      if (localStorageUser) {
        this.setUserLoggedIn()
      }
    },
    async getPokemonData() {
      const data = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      const json = await data.json()
      return json.results
    },
    ...mapActions([
      'setFavoritePokemonList',
      'setPokemonData',
      'setUserLoggedIn'
    ])
  }
}
</script>

<style>
.login-screen__form {
  width: 500px;
  margin: 300px auto;
}
</style>
