import { Koffing } from 'koffing'

export function parseTeamSheet(enemysheet) {
  const pokePaste = enemysheet.filter(line => {
    return !line.includes("<span class=\"picon")
  }).map(line => {
    if (line.includes("@")) {
      return line.split("<span")[0].trim() + "\n"
    } else {
      return line.trim() + "\n"
    }
  }).join("")

  return Koffing.parse(pokePaste).teams[0].pokemon
}