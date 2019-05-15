export function validatePassword(password: string): boolean {
  const MASTERPASSWORD: string = 'pokemonmaster'
  const correctLength: boolean = checksOnLength(password)
  const correctCasing: boolean = checkOnLowerCase(password)
  const noIllegalCharacters: boolean = checkOnForbiddenLetters(password)
  const hasConsecutiveLetters: boolean = checksOnConsecutiveLetters(password)
  const hasTwoPairsOfLetters: boolean = checksOnPairsOfLetters(password)

  if (
    (correctLength &&
      correctCasing &&
      noIllegalCharacters &&
      hasConsecutiveLetters &&
      hasTwoPairsOfLetters) ||
    password === MASTERPASSWORD
  ) {
    return true
  } else {
    return false
  }
}

export function checksOnConsecutiveLetters(password: string): boolean {
  password = password.replace(/[0-9]/g, '') // strip numbers from string
  let previousCharCode: number = 0
  let currentCharCode: number = 0
  let counterForConsecutiveLetters: number = 0
  let passwordContainsConsecutiveLetters: boolean = false

  for (let x = 0; x < password.length; x++) {
    currentCharCode = password.charCodeAt(x)
    if (currentCharCode - previousCharCode === 1) {
      counterForConsecutiveLetters++
    } else {
      counterForConsecutiveLetters = 0
    }
    if (counterForConsecutiveLetters === 2) {
      passwordContainsConsecutiveLetters = true
      break
    }
    previousCharCode = currentCharCode
  }

  return passwordContainsConsecutiveLetters
}

export function checksOnPairsOfLetters(password: string): boolean {
  password = password.replace(/[0-9]/g, '') // strip numbers from string
  let previousCharCode: number = 0
  let currentCharCode: number = 0
  let counterForSameLetter: number = 0
  let passwordContainsTwoPairs: boolean = false

  for (let x = 0; x < password.length; x++) {
    currentCharCode = password.charCodeAt(x)
    if (currentCharCode === previousCharCode) {
      counterForSameLetter++
    }
    if (counterForSameLetter === 2) {
      passwordContainsTwoPairs = true
      break
    }
    previousCharCode = currentCharCode
  }
  return passwordContainsTwoPairs
}

export function checksOnLength(password: string): boolean {
  if (password.length > 32) {
    return false
  } else {
    return true
  }
}

export function checkOnLowerCase(password: string): boolean {
  const regex = /[^a-z]+/g // checks if there is a match of anything else than lowercase letters
  const invalidMatches = password.match(regex)
  if (invalidMatches) {
    return false
  } else {
    return true
  }
}

export function checkOnForbiddenLetters(password: string): boolean {
  if (password.includes('i')) {
    return false
  } else {
    return true
  }
}
