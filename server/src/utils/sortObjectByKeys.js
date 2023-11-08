function sortObjectByKeys(obj) {
  const sortedEntries = Object.entries(obj).sort(([keyA], [keyB]) => {
    const [dayA, monthA, yearA] = keyA.split('-').map(Number)
    const [dayB, monthB, yearB] = keyB.split('-').map(Number)

    if (yearA !== yearB) return yearA - yearB
    if (monthA !== monthB) return monthA - monthB
    return dayA - dayB
  })

  return Object.fromEntries(sortedEntries)
}

module.exports = sortObjectByKeys
