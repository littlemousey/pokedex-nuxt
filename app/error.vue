<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const isNotFound = computed(() => props.error.statusCode === 404)

useHead({ title: () => (isNotFound.value ? 'Page not found' : 'Something went wrong') })

function goHome() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="error-page page">
    <div class="nes-container is-rounded error-page__panel">
      <template v-if="isNotFound">
        <h1>Page not found</h1>
        <p>{{ error.message || 'That Pokémon is not in this Pokédex.' }}</p>
      </template>
      <template v-else>
        <h1>Oops! An error occurred</h1>
        <p>Error code: {{ error.statusCode }}</p>
        <p>Try to refresh, or head back home.</p>
      </template>

      <img
        src="~/assets/img/slowpoke-oops.gif"
        alt=""
        aria-hidden="true"
        class="error-page__image"
      />

      <button type="button" class="nes-btn is-primary" @click="goHome">Go home</button>
    </div>
  </div>
</template>

<style scoped>
.error-page {
  display: grid;
  place-items: center;
  min-height: 100vh;
}

.error-page__panel {
  display: grid;
  justify-items: center;
  gap: var(--space-5);
  text-align: center;
  width: min(100% , 36rem);
  background-color: var(--bg-raised);
}

.error-page__image {
  width: min(100%, 12rem);
}
</style>
