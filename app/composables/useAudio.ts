/**
 * Audio playback that survives modern browser autoplay policies.
 *
 * The Nuxt 2 capture page called `new Audio(...).play()` straight from
 * `mounted()`. Browsers block that without a prior user gesture and the
 * returned promise rejects unhandled, so the music silently never started.
 * Here `play()` always catches, and `playOnFirstInteraction` defers the
 * background track until the user actually touches the page.
 */
export function useAudio() {
  const tracks = new Set<HTMLAudioElement>()
  const cleanups = new Set<() => void>()

  function create(src: string, options: { loop?: boolean } = {}) {
    if (!import.meta.client) return null
    const audio = new Audio(src)
    audio.loop = options.loop ?? false
    tracks.add(audio)
    return audio
  }

  /** Play, swallowing the rejection browsers throw for blocked autoplay. */
  function play(audio: HTMLAudioElement | null) {
    if (!audio) return
    audio.play().catch(() => {
      // Autoplay blocked, or the element was torn down mid-play. Not fatal.
    })
  }

  function stop(audio: HTMLAudioElement | null) {
    if (!audio) return
    audio.pause()
    audio.currentTime = 0
  }

  function stopAll() {
    for (const audio of tracks) stop(audio)
  }

  /**
   * Start `audio` now if allowed, otherwise on the first user interaction.
   */
  function playOnFirstInteraction(audio: HTMLAudioElement | null) {
    if (!audio || !import.meta.client) return

    const start = () => {
      play(audio)
      removeListeners()
    }
    const events = ['pointerdown', 'keydown', 'touchstart'] as const
    const removeListeners = () => {
      for (const event of events) {
        window.removeEventListener(event, start)
      }
      cleanups.delete(removeListeners)
    }

    audio
      .play()
      .then(removeListeners)
      .catch(() => {
        for (const event of events) {
          window.addEventListener(event, start, { once: true })
        }
        // Registered on the composable, not on the current scope, so this is
        // safe to call from onMounted as well as from setup.
        cleanups.add(removeListeners)
      })
  }

  // Whatever the page does, nothing keeps playing after it unmounts. The old
  // page relied on a `beforeRouteLeave` guard, which missed other teardowns.
  onScopeDispose(() => {
    for (const cleanup of [...cleanups]) cleanup()
    stopAll()
    tracks.clear()
  })

  return { create, play, stop, stopAll, playOnFirstInteraction }
}
