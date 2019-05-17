<template>
  <section>
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
          <i v-show="showPokeball" class="nes-pokeball throw-pokeball"></i>
          <p>{{ statusText }}</p>
        </div>
        <div class="capture-screen__actions">
          <a class="nes-btn" @click="catchPokemon">Throw ball</a>
          <a class="nes-btn" @click="useItem('rock')">Throw rock</a>
          <a class="nes-btn" @click="useItem('berry')">Give berry</a>
          <a class="nes-btn" @click="flee">Flee</a>
        </div>
      </div>
      <div
        v-show="caught"
        class="nes-container is-rounded pokemon-caught-window"
      >
        <div class="capture-screen__pokemon">
          <i class="nes-pokeball"></i>
          <p>Congratulations! You caught {{ pokemon.name }}!</p>
          <nuxt-link to="/" class="nes-btn is-primary">
            Go back
          </nuxt-link>
        </div>
      </div>
      <dialog id="nes-dialog" :open="showDialog" class="nes-dialog is-rounded">
        <p class="title">{{ dialogTitle }}</p>
        <p>{{ dialogText }}</p>
        <menu class="dialog-menu">
          <button class="nes-btn is-primary" @click="closeDialog">OK</button>
        </menu>
      </dialog>
    </div>
  </section>
</template>

<script>
import catchCalculator from '~/utils/catchCalculator'
import { setTimeout } from 'timers'

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
      dialogTitle: '',
      dialogText: '',
      showDialog: false,
      statusText: '',
      playerUsedItem: false,
      caught: false,
      showPokeball: false,
      backgroundMusic: null,
      sound: null
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
    this.pokemon.name = this.capitalizePokemonName(this.pokemon.name)
    this.backgroundMusic = new Audio('/sounds/catch-wild-pokemon.mp3')
    this.sound = new Audio()
    this.playMusic()
    this.statusText = `You encountered a ${this.pokemon.name}. Try to catch it!`
  },
  beforeRouteLeave(to, from, next) {
    this.backgroundMusic.pause()
    this.backgroundMusic.currentTime = 0
    next()
  },
  methods: {
    capitalizePokemonName(name) {
      return name.charAt(0).toUpperCase() + name.slice(1)
    },
    playMusic() {
      this.backgroundMusic.play()
    },
    flee() {
      const self = this
      setTimeout(function() {
        self.$router.push('/')
      }, 2000)
      this.statusText = 'You ran away safely...'
      this.sound.src = '/sounds/flee.mp3'
      this.sound.play()
    },
    closeDialog() {
      this.showDialog = false
    },
    useItem(item) {
      if (item === 'rock') {
        this.statusText = `${this.pokemon.name} is getting angry!`
      }
      if (item === 'berry') {
        this.statusText = `${this.pokemon.name} is eager for the berry`
      }
      this.playerUsedItem = true
    },
    determineCatch() {
      const catchResult = catchCalculator(
        this.pokemonCatchRate,
        this.playerUsedItem
      )
      if (catchResult) {
        this.caught = true
        this.sound.src = '/sounds/pokemon_capture.mp3'
        this.sound.play()
      } else {
        this.dialogTitle = 'Oh no it failed!'
        this.dialogText = 'Try again'
        this.showDialog = true
        this.backgroundMusic.play()
      }
    },
    throwBall() {
      this.showPokeball = true
      setTimeout(() => {
        this.showPokeball = false
      }, 300)
    },
    catchPokemon() {
      this.backgroundMusic.pause()
      this.throwBall()
      this.sound.src = '/sounds/pokeball-throw.mp3'
      this.sound.play()
      const self = this
      setTimeout(function() {
        self.determineCatch()
      }, 2000)
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

.pokemon-caught-window {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: white;
  height: 650px;
  margin: 25px 15%;
}

#nes-dialog {
  position: fixed; /* Sit on top of the page content */
  top: 150px;
  margin: 0 auto;
  background-color: white;
  z-index: 2;
}

.capture-screen__pokemon-image {
  height: 400px;
  image-rendering: pixelated;
  animation-duration: 3s;
  animation-name: move-pokemon;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.throw-pokeball {
  left: -250px;
  -webkit-animation: slide-bl 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse
    both;
  animation: slide-bl 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both;
}

@keyframes move-pokemon {
  from {
    margin-left: 30%;
  }

  to {
    margin-left: -30%;
  }
}

/* ----------------------------------------------
 * Generated by Animista on 2019-5-17 20:50:29
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */
@keyframes slide-bl {
  0% {
    -webkit-transform: translateY(0) translateX(0);
    transform: translateY(0) translateX(0);
  }
  100% {
    -webkit-transform: translateY(100px) translateX(-100px);
    transform: translateY(600px) translateX(600px);
  }
}
</style>
