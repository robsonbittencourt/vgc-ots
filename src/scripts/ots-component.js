import template from '../ots-component.handlebars'

export async function createOpenTeamSheetElement(pokemon_team) {
  const pokemonList = document.createElement('div')
  pokemonList.className = "pokemon-container"
  pokemonList.style.padding = '10px'

  const pokemonData = pokemon_team.map(pokemon => ({
    imlink: linkImage(pokemon.name),
    backuplink: linkBackup(pokemon.name),
    itemlink: linkItem(pokemon.item),
    teracolor: colorType(pokemon.tera),
    tera: pokemon.tera,
    ability: pokemon.ability,
    move1: pokemon.move1,
    move2: pokemon.move2,
    move3: pokemon.move3,
    move4: pokemon.move4,
    name: pokemon.name,
    item: pokemon.item,
  }))

  const pokemonHtml = template({ pokemon_team: pokemonData })
  pokemonList.innerHTML = pokemonHtml

  return pokemonList
}

function linkImage(name) {
  var imname = name.toLowerCase()
  imname = imname.replace(' ', '-').replace(')', '').replace('(', '')
  imname = imname.replace('-f', '-female').replace('-bloodmoon', '').replace('-rapid-strike', '')
  imname = imname.replace('-alola', '-alolan')

  if (imname.includes("sinistcha")) {
    return "https://img.game8.co/3763925/f08cd2e93762e07532cf393e899eb0c0.png/show"
  }

  var imlink = "https://img.pokemondb.net/sprites/scarlet-violet/normal/" + imname + ".png"
  if (name.includes("hisui") || name.includes("galar")) {
    imlink = "https://img.pokemondb.net/sprites/home/normal/2x/avif/" + imname + "an.avif"
  } else if (name.includes("Ogerpon")) {
    imlink = "https://img.pokemondb.net/artwork/avif/ogerpon-teal.avif"
  }

  return imlink
}

function linkBackup(name) {
  var imname = name.toLowerCase()
  imname = imname.replace(' ', '-').replace(')', '').replace('(', '')
  imname = imname.replace('-f', '-female').replace('-bloodmoon', '').replace('-rapid-strike', '')
  imname = imname.replace('-alola', '-alolan')

  var backuplink = "https://img.pokemondb.net/sprites/home/normal/2x/" + imname + ".jpg"
  return backuplink
}

function linkItem(name) {
  var itemlink = "https://www.serebii.net/itemdex/sprites/sv/" + name.replace(' ', '').toLowerCase() + ".png"
  return itemlink
}

function colorType(type) {
  const type_colors = {
    'Normal': 'A8A77A',
    'Fire': 'EE8130',
    'Water': '6390F0',
    'Electric': 'F7D02C',
    'Grass': '7AC74C',
    'Ice': '96D9D6',
    'Fighting': 'C22E28',
    'Poison': 'A33EA1',
    'Ground': 'E2BF65',
    'Flying': 'A98FF3',
    'Psychic': 'F95587',
    'Bug': 'A6B91A',
    'Rock': 'B6A136',
    'Ghost': '735797',
    'Dragon': '6F35FC',
    'Dark': '705746',
    'Steel': 'B7B7CE',
    'Fairy': 'D685AD',
    'None': 'AAAAAA',
    '0': 'AAAAAA',
    '-1': 'AAAAAA'
  }

  if (type in type_colors) {
    return "#" + type_colors[type]
  } else {
    return "#AAAAAA"
  }
}