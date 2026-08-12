/**
 * The persisted session, stored in a single cookie.
 *
 * The Nuxt 2 app split this across two cookies — one written by hand with
 * js-cookie in the login page, another by vuex-persist — and read them back
 * with `cookieparser` on the server and `Cookies.getJSON` on the client.
 * `useCookie` handles JSON encoding and works identically on both sides, so
 * one cookie and one accessor covers it.
 */
export interface SessionData {
  userLoggedIn: boolean
  username: string
  favorites: string[]
}

export const SESSION_COOKIE = 'pokedexNuxtUser'

const SESSION_MAX_AGE = 60 * 60 * 24 * 3 // 3 days, matching the old vuex-persist config

export function useSession() {
  return useCookie<SessionData | null>(SESSION_COOKIE, {
    default: () => null,
    maxAge: SESSION_MAX_AGE,
    sameSite: 'lax',
    path: '/',
    // The client needs to read this, so it cannot be httpOnly. It holds no
    // secret — the app's "login" is a puzzle, not real authentication.
    secure: import.meta.env.PROD
  })
}
