export default function createPraxisUnitsArray(lecturesLength) {
  //
  const difference = 5 - lecturesLength
  const praxisUnits = Array.from({ length: difference }, (_, index) => index)

  return praxisUnits
}
