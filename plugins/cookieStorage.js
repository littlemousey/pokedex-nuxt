import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

export default ({ store }) => {
  createPersistedState({
    storage: {
      getItem: key => {
        Cookies.getJSON(key)
      },
      setItem: (key, value) => {
        Cookies.set(key, value, { expires: 1, secure: false })
      },
      removeItem: key => Cookies.remove(key)
    },
    key: 'pokedex-nuxt',
    paths: ['user', 'favoritePokemon']
  })(store)
}
