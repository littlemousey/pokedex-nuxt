import { afterEach, describe, expect, it, vi } from 'vitest'
import catchCalculator from '../app/utils/catchCalculator'

/**
 * The catch succeeds when Math.random() lands below `catchRate / 255`, plus a
 * flat 0.02 bonus when the player has used an item. Math.random is stubbed so
 * the threshold boundaries are exact rather than probabilistic.
 */
function stubRandom(value: number) {
  return vi.spyOn(Math, 'random').mockReturnValue(value)
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('catchCalculator', () => {
  it('catches when the roll is below the threshold', () => {
    stubRandom(0.1) // threshold is 255/255 = 1
    expect(catchCalculator(255, false)).toBe(true)
  })

  it('fails when the roll is above the threshold', () => {
    stubRandom(0.9) // threshold is 3/255 ≈ 0.0118
    expect(catchCalculator(3, false)).toBe(false)
  })

  it('fails when the roll exactly equals the threshold', () => {
    // The comparison is strictly `<`, so equality is a miss.
    stubRandom(0.5)
    expect(catchCalculator(127.5, false)).toBe(false)
  })

  it('always fails at a catch rate of 0', () => {
    stubRandom(0)
    expect(catchCalculator(0, false)).toBe(false)
  })

  it('always succeeds at a catch rate of 255', () => {
    stubRandom(0.999999)
    expect(catchCalculator(255, false)).toBe(true)
  })

  describe('when the player has used an item', () => {
    it('adds a 0.02 bonus to the threshold', () => {
      const catchRate = 3 // base threshold ≈ 0.01176, with bonus ≈ 0.03176
      const roll = 0.02

      stubRandom(roll)
      expect(catchCalculator(catchRate, false)).toBe(false)

      vi.restoreAllMocks()
      stubRandom(roll)
      expect(catchCalculator(catchRate, true)).toBe(true)
    })

    it('does not make an impossible catch certain', () => {
      stubRandom(0.5)
      expect(catchCalculator(0, true)).toBe(false)
    })
  })
})
