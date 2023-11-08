export default function createNavigationRoute(cw, year, view) {
  //
  const adjustedCW = cw && cw < 10 && cw[0] != 0 ? `0${cw}` : cw
  const adjustedYear = cw === 52 ? year - 1 : year

  const scheduleID = `${adjustedYear}cw${adjustedCW}`

  const baseRoute = `/week/${scheduleID}`

  return view === 'berichtsheft' ? baseRoute.concat('/berichtsheft') : baseRoute
}
