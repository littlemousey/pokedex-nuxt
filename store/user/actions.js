export default {
  setUsername(context, payload) {
    context.commit('setUsername', payload)
  },
  setUserLoggedIn(context) {
    context.commit('setUserLoggedIn')
  }
}
