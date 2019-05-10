<template>
  <section class="error-page">
    <span v-if="error.statusCode === 404">
      <h1>Page not found</h1>
      <p>{{ error.message }}</p>
      <p>
        Return to
        <nuxt-link to="/" class="nes-btn is-primary">
          Home
        </nuxt-link>
      </p>
    </span>
    <span v-else>
      <h1>Oops! An error occurred</h1>
      <p>Error code: {{ error.statusCode }}</p>
      <p>
        Try to refresh or return to
        <nuxt-link to="/" class="nes-btn is-primary">
          Home
        </nuxt-link>
      </p>
    </span>
    <section>
      <img src="~/assets/img/slowpoke-oops.gif" alt="slowpoke error" />
    </section>
  </section>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.error-page {
  text-align: center;
}
</style>
