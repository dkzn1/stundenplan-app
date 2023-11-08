export default function removeSpecialChars(str) {
  const startIndex = str.search(/[a-zA-Z0-9]/)
  const endIndex = str.search(/[a-zA-Z0-9](?=[^a-zA-Z0-9]*$)/)

  return str.slice(startIndex, endIndex + 1).trim()
}
