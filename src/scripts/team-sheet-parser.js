export function parseTeamSheet(enemysheet) {
  var pokemon_team = []

  var current_pokemon = {
    name: '',
    nickname: '',
    item: '',
    ability: '',
    level: '',
    tera: '',
    move1: '',
    move2: '',
    move3: '',
    move4: ''
  }

  for (var i = 0; i < enemysheet.length; i++) {
    var line = enemysheet[i]
    line = line.replace(' (M)', '').replace(' (F)', '')

    if (line.includes('@')) {
      if (current_pokemon.name != '') {
        pokemon_team.push(current_pokemon)
        current_pokemon = {
          name: '',
          nickname: '',
          item: '',
          ability: '',
          level: '',
          tera: '',
          move1: '',
          move2: '',
          move3: '',
          move4: ''
        }
      }
      if (line.includes("</summary>")) {
        line = line.split("</summary>")[1]
      }
      current_pokemon.name = line.split('@')[0].trim()
      if (current_pokemon.name.includes('(')) {
        current_pokemon.nickname = current_pokemon.name.split('(')[0].trim()
        current_pokemon.name = current_pokemon.name.split('(')[1]
        current_pokemon.name = current_pokemon.name.substring(0, current_pokemon.name.length - 1)
      }
      current_pokemon.item = line.substring(line.indexOf('@') + 1, line.indexOf('<')).trim()
    } else if (line.includes('Ability: ')) {
      current_pokemon.ability = line.split('Ability: ')[1].trim()
    } else if (line.includes('Level: ')) {
      current_pokemon.level = line.split('Level: ')[1].trim()
    } else if (line.includes('Tera Type: ')) {
      current_pokemon.tera = line.split('Tera Type: ')[1].trim()
    } else if (line.includes('- ')) {
      if (current_pokemon.move1 == '') {
        current_pokemon.move1 = line.split('- ')[1].trim()
      }
      else if (current_pokemon.move2 == '') {
        current_pokemon.move2 = line.split('- ')[1].trim()
      }
      else if (current_pokemon.move3 == '') {
        current_pokemon.move3 = line.split('- ')[1].trim()
      }
      else if (current_pokemon.move4 == '') {
        current_pokemon.move4 = line.split('- ')[1].trim()
      }
    }
  }

  if (current_pokemon.name != '') {
    pokemon_team.push(current_pokemon)
  }

  return pokemon_team
}