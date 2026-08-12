/**
 * Replaces middleware/authentication.js.
 *
 * The Nuxt 2 version began with `if (!process.server) return`, so it only ever
 * ran during the initial server render — every client-side navigation to a
 * protected route went unchecked. This runs on both sides.
 */
export default defineNuxtRouteMiddleware((to) => {
  const session = useSession()
  const loggedIn = Boolean(session.value?.userLoggedIn)

  const requiresAuth = to.meta.requiresAuth === true
  const isLoginRoute = to.meta.requiresAuth === false

  if (!loggedIn && requiresAuth) {
    return navigateTo('/login')
  }

  if (loggedIn && isLoginRoute) {
    return navigateTo('/')
  }
})
