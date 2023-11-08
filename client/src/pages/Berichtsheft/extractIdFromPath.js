export default function extractIdFromPath(path) {
  //
  return path.replace('/berichtsheft', '').slice(-8)
}
