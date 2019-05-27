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

<script lang="ts">
import { mapActions, mapState } from 'vuex'
import { validatePassword } from '@/utils/validatePassword'
import * as Cookies from 'js-cookie'
import { Component, Vue, Prop, namespace } from 'nuxt-property-decorator'
import { MetaInfo } from 'vue-meta'

const User = namespace('user')

@Component({
  name: 'Login',
  metaInfo: {
    meta: [{ requiresAuth: false }]
  }
})
export default class Login extends Vue {
  @User.Action setUserLoggedIn
  @User.Action setUsername

  @User.State loggedIn
  @User.State userName

  head() {
    return {
      title: 'Login pokédex'
    }
  }

  username: string = ''
  password: string = ''
  passwordCorrect: boolean = false
  showPasswordError: boolean = false

  checkPassword() {
    this.passwordCorrect = validatePassword(this.password)
    if (this.passwordCorrect) {
      this.setUserLoggedIn()
      Cookies.set(
        'pokedexNuxtUser',
        { userLoggedIn: true },
        { expires: 1, secure: false }
      )
      this.setUsername(this.username)
      this.$router.push('/')
    } else {
      this.showPasswordError = true
    }
  }
}
</script>

<style>
.login-screen__form {
  width: 500px;
  margin: 300px auto;
}
</style>
