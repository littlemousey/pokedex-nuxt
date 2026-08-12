import { describe, expect, it } from 'vitest'
import {
  validatePassword,
  checkOnForbiddenLetters,
  checkOnLowerCase,
  checksOnConsecutiveLetters,
  checksOnLength,
  checksOnPairsOfLetters
} from '../app/utils/validatePassword'

/**
 * A password is valid when it is <= 32 characters, all lowercase letters,
 * contains no `i`, contains three ascending consecutive letters, and contains
 * two pairs of repeated letters. `pokemonmaster` bypasses all of it.
 *
 * `abcaabb` satisfies every rule: 7 chars, lowercase, no `i`, `abc` is a run
 * of three ascending letters, and `aa` + `bb` are the two pairs.
 */
const VALID = 'abcaabb'

describe('validatePassword', () => {
  it('accepts a password satisfying every rule', () => {
    expect(validatePassword(VALID)).toBe(true)
  })

  it('accepts the master password despite it breaking the rules', () => {
    // No consecutive ascending run and no two pairs — only the bypass saves it.
    expect(checksOnConsecutiveLetters('pokemonmaster')).toBe(false)
    expect(validatePassword('pokemonmaster')).toBe(true)
  })

  it('rejects an empty password', () => {
    expect(validatePassword('')).toBe(false)
  })

  it('rejects a password missing the consecutive-letters rule', () => {
    // Two pairs, lowercase, short, no `i`, but no ascending run of three.
    expect(validatePassword('aabb')).toBe(false)
  })

  it('rejects a password missing the two-pairs rule', () => {
    // Has `abc`, but only one pair.
    expect(validatePassword('abcaa')).toBe(false)
  })

  it('rejects a password containing the forbidden letter i', () => {
    expect(validatePassword(`${VALID}i`)).toBe(false)
  })

  it('rejects a password with uppercase letters', () => {
    expect(validatePassword('Abcaabb')).toBe(false)
  })

  it('rejects a password longer than 32 characters', () => {
    expect(validatePassword('abcaabb'.repeat(6))).toBe(false)
  })
})

describe('checksOnLength', () => {
  it('accepts exactly 32 characters', () => {
    expect(checksOnLength('a'.repeat(32))).toBe(true)
  })

  it('rejects 33 characters', () => {
    expect(checksOnLength('a'.repeat(33))).toBe(false)
  })
})

describe('checkOnLowerCase', () => {
  it.each([
    ['abc', true],
    ['aBc', false],
    ['abc1', false],
    ['abc ', false],
    ['abc-', false]
  ])('%s -> %s', (password, expected) => {
    expect(checkOnLowerCase(password)).toBe(expected)
  })
})

describe('checkOnForbiddenLetters', () => {
  it('rejects any password containing i', () => {
    expect(checkOnForbiddenLetters('pikachu')).toBe(false)
  })

  it('accepts a password without i', () => {
    expect(checkOnForbiddenLetters('abcaabb')).toBe(true)
  })
})

describe('checksOnConsecutiveLetters', () => {
  it('accepts three ascending letters in a row', () => {
    expect(checksOnConsecutiveLetters('xyz')).toBe(true)
  })

  it('rejects only two ascending letters', () => {
    expect(checksOnConsecutiveLetters('ab')).toBe(false)
  })

  it('rejects descending letters', () => {
    expect(checksOnConsecutiveLetters('cba')).toBe(false)
  })

  it('strips digits before checking', () => {
    expect(checksOnConsecutiveLetters('a1b2c3')).toBe(true)
  })
})

describe('checksOnPairsOfLetters', () => {
  it('accepts two separate pairs', () => {
    expect(checksOnPairsOfLetters('aabb')).toBe(true)
  })

  it('rejects a single pair', () => {
    expect(checksOnPairsOfLetters('aab')).toBe(false)
  })

  it('accepts a triple, which counts as two repeats', () => {
    expect(checksOnPairsOfLetters('aaa')).toBe(true)
  })
})
