<script setup lang="ts">
definePageMeta({ requiresAuth: false })

useHead({ title: 'Login — Pokédex' })

const router = useRouter()
const user = useUserStore()

const username = ref('')
const password = ref('')
const showPasswordError = ref(false)

async function checkPassword() {
  if (!validatePassword(password.value)) {
    showPasswordError.value = true
    return
  }

  showPasswordError.value = false
  user.setUsername(username.value)
  user.setUserLoggedIn()

  // The session plugin's watcher writes the cookie; wait a tick so it lands
  // before the global auth middleware reads it on the next navigation.
  await nextTick()
  await router.push('/')
}
</script>

<template>
  <div class="login">
    <form class="nes-container is-rounded login__form" @submit.prevent="checkPassword">
      <h1 class="login__title">Pokédex</h1>
      <p>Who dares to open this Pokédex? Are you a trainer?</p>

      <div class="nes-field">
        <label for="name_field">Your name</label>
        <input id="name_field" v-model="username" type="text" class="nes-input" autocomplete="nickname" />
      </div>

      <div class="nes-field">
        <label for="password_field">Password</label>
        <input
          id="password_field"
          v-model="password"
          type="password"
          class="nes-input"
          autocomplete="current-password"
          :aria-invalid="showPasswordError"
          :aria-describedby="showPasswordError ? 'password_error' : undefined"
        />
      </div>

      <button type="submit" class="nes-btn is-primary">Continue</button>

      <p v-if="showPasswordError" id="password_error" class="nes-text is-error" role="alert">
        Oops, that was a wrong password. Try again.
      </p>
    </form>
  </div>
</template>

<style scoped>
.login {
  display: grid;
  place-items: center;
  min-height: 100vh;
  padding: var(--space-4);
}

.login__form {
  display: grid;
  gap: var(--space-4);
  width: min(100%, var(--measure-form));
  background-color: var(--bg-raised);
}

.login__title {
  text-align: center;
}
</style>
