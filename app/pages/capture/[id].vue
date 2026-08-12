<script setup lang="ts">
import type { Pokemon, PokemonSpecies } from '~/types/pokemon'

definePageMeta({
  requiresAuth: true,
  // Page id must be a number and must not start with 0 — same guard as the
  // Nuxt 2 `validate()` option.
  validate: (route) => /^[1-9]\d*$/.test(String(route.params.id))
})

const route = useRoute()
const router = useRouter()

const { data } = await useAsyncData(`capture-${route.params.id}`, async () => {
  const pokemon = await $fetch<Pokemon>(
    `https://pokeapi.co/api/v2/pokemon/${route.params.id}`
  )
  const species = await $fetch<PokemonSpecies>(pokemon.species.url)
  return { pokemon, catchRate: species.capture_rate }
})

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Pokémon not found', fatal: true })
}

const pokemon = computed(() => data.value!.pokemon)
const pokemonName = computed(() => capitalize(pokemon.value.name))

useHead({ title: () => `Catch ${pokemonName.value} — Pokédex` })

const statusText = ref(`You encountered a ${pokemonName.value}. Try to catch it!`)
const playerUsedItem = ref(false)
const caught = ref(false)
const showPokeball = ref(false)
const throwInFlight = ref(false)
const dialog = reactive({ open: false, title: '', text: '' })

const { create, play, stop, playOnFirstInteraction } = useAudio()

const backgroundMusic = create('/sounds/catch-wild-pokemon.mp3', { loop: true })
const throwSound = create('/sounds/pokeball-throw.mp3')
const captureSound = create('/sounds/pokemon_capture.mp3')
const fleeSound = create('/sounds/flee.mp3')

const timers: ReturnType<typeof setTimeout>[] = []
function later(fn: () => void, ms: number) {
  timers.push(setTimeout(fn, ms))
}

onMounted(() => {
  playOnFirstInteraction(backgroundMusic)
})

onUnmounted(() => {
  for (const timer of timers) clearTimeout(timer)
  stop(backgroundMusic)
})

function useItem(item: 'rock' | 'berry') {
  statusText.value =
    item === 'rock'
      ? `${pokemonName.value} is getting angry!`
      : `${pokemonName.value} is eager for the berry`
  playerUsedItem.value = true
}

function throwBall() {
  showPokeball.value = true
  later(() => {
    showPokeball.value = false
  }, 300)
}

function catchPokemon() {
  if (throwInFlight.value) return
  throwInFlight.value = true

  stop(backgroundMusic)
  throwBall()
  play(throwSound)
  statusText.value = 'You threw a Poké Ball…'

  later(determineCatch, 2000)
}

function determineCatch() {
  throwInFlight.value = false

  if (catchCalculator(data.value!.catchRate, playerUsedItem.value)) {
    caught.value = true
    statusText.value = `You caught ${pokemonName.value}!`
    play(captureSound)
    return
  }

  dialog.title = 'Oh no it failed!'
  dialog.text = 'Try again'
  dialog.open = true
  statusText.value = `${pokemonName.value} broke free!`
  play(backgroundMusic)
}

function closeDialog() {
  dialog.open = false
}

function flee() {
  statusText.value = 'You ran away safely…'
  stop(backgroundMusic)
  play(fleeSound)
  later(() => router.push('/'), 2000)
}
</script>

<template>
  <div class="capture">
    <div v-if="!caught" class="nes-container is-rounded capture__window">
      <div class="capture__stage">
        <img
          :src="spriteUrl(pokemon.id)"
          :alt="`Wild ${pokemonName}`"
          class="capture__sprite"
        />
        <i v-show="showPokeball" class="nes-pokeball capture__pokeball" aria-hidden="true" />
      </div>

      <p class="capture__status" role="status" aria-live="polite">{{ statusText }}</p>

      <div class="capture__actions">
        <button type="button" class="nes-btn" :disabled="throwInFlight" @click="catchPokemon">
          Throw ball
        </button>
        <button type="button" class="nes-btn" :disabled="throwInFlight" @click="useItem('rock')">
          Throw rock
        </button>
        <button type="button" class="nes-btn" :disabled="throwInFlight" @click="useItem('berry')">
          Give berry
        </button>
        <button type="button" class="nes-btn is-error" @click="flee">Flee</button>
      </div>
    </div>

    <div v-else class="nes-container is-rounded capture__window capture__window--caught">
      <i class="nes-pokeball capture__trophy" aria-hidden="true" />
      <p>Congratulations! You caught {{ pokemonName }}!</p>
      <NuxtLink to="/" class="nes-btn is-primary">Go back</NuxtLink>
    </div>

    <dialog v-if="dialog.open" class="nes-dialog is-rounded capture__dialog" open>
      <h2 class="title">{{ dialog.title }}</h2>
      <p>{{ dialog.text }}</p>
      <menu class="dialog-menu">
        <button class="nes-btn is-primary" autofocus @click="closeDialog">OK</button>
      </menu>
    </dialog>
  </div>
</template>

<style scoped>
.capture {
  min-height: 100vh;
  background-color: var(--grass);
  display: grid;
  place-items: center;
  padding: var(--space-4);
}

.capture__window {
  display: grid;
  gap: var(--space-4);
  align-content: space-between;
  background-color: var(--bg-raised);
  width: min(100%, 60rem);
  /* was a fixed height: 650px — now it can grow on small screens */
  min-height: min(80vh, 40rem);
}

.capture__window--caught {
  place-items: center;
  align-content: center;
  text-align: center;
}

.capture__stage {
  position: relative;
  display: grid;
  place-items: center;
  overflow: hidden;
  min-height: 12rem;
}

.capture__sprite {
  width: min(60%, 20rem);
  height: auto;
  animation: move-pokemon 3s infinite alternate;
}

.capture__pokeball {
  position: absolute;
  left: 15%;
  bottom: 10%;
  animation: throw-pokeball 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both;
}

.capture__trophy {
  transform: scale(2);
  margin-bottom: var(--space-5);
}

.capture__status {
  text-align: center;
  min-height: 3rem;
}

.capture__actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
  gap: var(--space-3);
}

.capture__dialog {
  position: fixed;
  inset-block-start: 20%;
  inset-inline: 0;
  margin-inline: auto;
  width: min(100% - var(--space-6), 28rem);
  background-color: var(--bg-raised);
  color: var(--text);
  z-index: 2;
}

@keyframes move-pokemon {
  from {
    transform: translateX(-25%);
  }
  to {
    transform: translateX(25%);
  }
}

/* Generated by Animista — http://animista.net, @cssanimista */
@keyframes throw-pokeball {
  0% {
    transform: translateY(0) translateX(0);
  }
  100% {
    transform: translateY(300px) translateX(-300px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .capture__sprite,
  .capture__pokeball {
    animation: none;
  }
}
</style>
