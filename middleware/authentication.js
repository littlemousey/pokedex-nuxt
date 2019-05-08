const cookieparser = process.server ? require('cookieparser') : undefined

export default ({ route, redirect, req, error }) => {
  if (process.server && req.headers.cookie) {
    const cookie = cookieparser.parse(req.headers.cookie)
    const userLoggedIn = cookie.pokedexNuxtUser
    if (!userLoggedIn && route.meta.length > 0 && route.meta[0].requiresAuth) {
      return redirect('/login')
    } else if (
      userLoggedIn &&
      route.meta.length > 0 &&
      !route.meta[0].requiresAuth
    ) {
      return redirect('/home')
    }
  }
}
