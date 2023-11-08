export default function setCalendarWeekRoutes(cw, currentPathSplit) {
  //
  const splitPath = [...currentPathSplit]
  const formattedCW = cw < 10 && cw[0] != 0 ? `0${cw}` : cw

  const updatedCwID = splitPath[1]?.slice(0, -2) + formattedCW

  splitPath[1] = updatedCwID

  return splitPath.join('/')
}
