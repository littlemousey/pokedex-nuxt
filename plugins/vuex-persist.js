import VuexPersistence from 'vuex-persist'
import Cookies from 'js-cookie'

export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
      restoreState: (key, storage) => Cookies.getJSON(key),
      saveState: (key, state, storage) =>
        Cookies.set(key, state, {
          expires: 3
        }),
      modules: ['user', 'favoritePokemon']
    }).plugin(store)
  })
}
