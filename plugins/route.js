export default ({ app, store }) => {
  app.router.beforeEach((to, from, next) => {
    if (!store.state.loggedIn && to.path !== '/') {
      next('/')
    } else {
      next()
    }
  })
}
