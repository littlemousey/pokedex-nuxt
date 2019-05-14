<template>
  <div class="capture-screen">
    <div v-show="!caught" class="nes-container is-rounded catch-window">
      <div class="capture-screen__pokemon">
        <img
          :src="
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              pokemon.id
            }.png`
          "
          alt="wild pokemon"
          class="capture-screen__pokemon-image"
        />
        <p>You encountered a {{ pokemon.name }}. Try to catch it!</p>
      </div>
      <div class="capture-screen__actions">
        <a class="nes-btn" @click="catchPokemon">Throw ball</a>
        <a class="nes-btn">Throw rock</a>
        <a class="nes-btn">Give berry</a>
        <a class="nes-btn" @click="openDialog">Flee</a>
      </div>
      <dialog
        id="dialog-rounded"
        :open="showDialog"
        class="nes-dialog is-rounded"
      >
        <p class="title">Flee</p>
        <p>You ran away safely</p>
        <menu class="dialog-menu">
          <button class="nes-btn is-primary" @click="navigateToHome">OK</button>
        </menu>
      </dialog>
    </div>
    <div v-show="caught" class="nes-container is-rounded catch-window">
      <div class="capture-screen__pokemon">
        <i class="nes-pokeball"></i>
        <p>Congratulations!</p>
      </div>
    </div>
  </div>
</template>

<script>
import determineCatch from '~/utils/catchCalculator.js'
const audio = new Audio(`/sounds/catch-wild-pokemon.mp3`)
export default {
  head() {
    return {
      title: 'Capture pokémon'
    }
  },
  data: function() {
    return {
      pokemon: null,
      pokemonCatchRate: null,
      showDialog: false,
      caught: false
    }
  },
  validate({ params }) {
    // page id url must be a number and should not start with 0
    return /^[1-9]\d*$/.test(params.id)
  },
  async asyncData(context) {
    const pokemonData = await context.$axios.$get(
      `https://pokeapi.co/api/v2/pokemon/${context.params.id}`
    )
    const species = await context.$axios.$get(pokemonData.species.url)
    return { pokemon: pokemonData, pokemonCatchRate: species.capture_rate }
  },
  mounted() {
    this.playMusic()
  },
  beforeRouteLeave(to, from, next) {
    audio.pause()
    next()
  },
  methods: {
    playMusic() {
      audio.play()
    },
    openDialog() {
      this.showDialog = true
    },
    navigateToHome() {
      this.showDialog = false
      this.$router.push('/')
    },
    catchPokemon() {
      const catchResult = determineCatch(this.pokemonCatchRate)
      if (catchResult) {
        alert('congratulations! you caught the pokemon')
        this.caught = true
      } else {
        alert('try again')
      }
    }
  }
}
</script>

<style scoped>
.capture-screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: #83de7b;
}

.catch-window {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  height: 650px;
  margin: 25px 15%;
}

.capture-screen__pokemon-image {
  height: 400px;
  image-rendering: pixelated;
}
</style>
