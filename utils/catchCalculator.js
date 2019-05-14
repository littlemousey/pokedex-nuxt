export default function(catchRate, offset) {
  let catchThreshold
  if (offset) {
    catchThreshold = catchRate / 255 + 0.02
  } else {
    catchThreshold = catchRate / 255
  }
  const chance = Math.random()

  if (chance < catchThreshold) {
    return true
  }

  return false
}
