import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const username = ref('')
  const loggedIn = ref(false)

  function setUsername(name: string) {
    username.value = name
  }

  function setUserLoggedIn() {
    loggedIn.value = true
  }

  function logout() {
    username.value = ''
    loggedIn.value = false
  }

  return { username, loggedIn, setUsername, setUserLoggedIn, logout }
})
