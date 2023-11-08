export function splitIntoSubarrays(array, subArrayLength) {
  const subarrays = []
  const length = array.length
  let i = 0

  while (i < length) {
    subarrays.push(array.slice(i, i + subArrayLength))
    i += subArrayLength
  }

  return subarrays
}
