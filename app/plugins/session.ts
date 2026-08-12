import { useUserStore } from '~/stores/user'
import { useFavoritePokemonStore } from '~/stores/favoritePokemon'

/**
 * Replaces plugins/vuex-persist.js.
 *
 * Runs on both server and client — hydrating from the cookie during SSR is
 * what keeps the server-rendered markup in step with the client, which the
 * old client-only `window.onNuxtReady` plugin could not do.
 */
export default defineNuxtPlugin(() => {
  const session = useSession()
  const user = useUserStore()
  const favorites = useFavoritePokemonStore()

  if (session.value) {
    user.username = session.value.username ?? ''
    user.loggedIn = session.value.userLoggedIn ?? false
    favorites.favorites = session.value.favorites ?? []
  }

  if (import.meta.client) {
    watch(
      () => ({
        userLoggedIn: user.loggedIn,
        username: user.username,
        favorites: [...favorites.favorites]
      }),
      (state) => {
        // Don't create a cookie for an anonymous visitor who hasn't done anything.
        if (!state.userLoggedIn && state.favorites.length === 0) {
          session.value = null
          return
        }
        session.value = state
      },
      { deep: true }
    )
  }
})
