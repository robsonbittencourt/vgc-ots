export function parseTeamSheet(enemysheet) {
  let pokePasteLines = []

  for (let index = 0; index < enemysheet.length; index++) {
    const line = enemysheet[index]

    if (line.includes("Ability:")) {
      pokePasteLines.push(enemysheet[index - 1].split("<span")[0].trim())
      pokePasteLines.push(line)
    }

    if (line.includes("Level:")) {
      pokePasteLines.push(line)
    }

    if (line.includes("Tera Type:")) {
      pokePasteLines.push(line)
      parseMoves(pokePasteLines, enemysheet, index)
    }
  }

  return pokePasteLines.join("\n")
}

function parseMoves(pokePasteLines, enemysheet, currentIndex) {
  for (let i = 1; i <= 4; i++) {
    const moveLine = enemysheet[currentIndex + i]

    if (moveLine.startsWith("- ")) {
      pokePasteLines.push(moveLine)
    }
  }

  pokePasteLines.push("")
}