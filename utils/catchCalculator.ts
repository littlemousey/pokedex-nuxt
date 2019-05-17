export default function(catchRate: number, offset: boolean): boolean {
  let catchThreshold: number
  if (offset) {
    catchThreshold = catchRate / 255 + 0.02
  } else {
    catchThreshold = catchRate / 255
  }
  const chance: number = Math.random()

  if (chance < catchThreshold) {
    return true
  }

  return false
}
