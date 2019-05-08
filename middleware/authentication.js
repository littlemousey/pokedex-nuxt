import * as Cookies from 'js-cookie'

export default ({ route, redirect }) => {
  const userLoggedIn = Cookies.getJSON('pokedex-nuxt-user')

  if (!userLoggedIn && route.meta[0].requiresAuth) {
    return redirect('/login')
  } else if (userLoggedIn && !route.meta[0].requiresAuth) {
    return redirect('/home')
  }
}
