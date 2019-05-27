export default ({ app, route, redirect }) => {
  const isOnRequiredAuthRoute =
    route.meta.length > 0 && route.meta[0].requiresAuth

  const cookie = app.$cookies.get('pokedexNuxtUser')
  let userLoggedIn = false
  if (cookie) {
    userLoggedIn = cookie.userLoggedIn ? cookie.userLoggedIn : false
  }

  if (!userLoggedIn && isOnRequiredAuthRoute) {
    return redirect('/login')
  } else if (
    userLoggedIn &&
    route.meta.length > 0 &&
    !route.meta[0].requiresAuth
  ) {
    return redirect('/')
  }
}
