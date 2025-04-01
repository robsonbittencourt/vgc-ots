import template from '../ots-component.handlebars'

export async function createOpenTeamSheetElement(team) {
  const otsContainerElement = document.createElement('div')
  otsContainerElement.className = "pokemon-container"

  const pokemonList = team.map(pokemon => ({
    imageLink: imageLink(pokemon.name),
    itemLink: itemLink(pokemon.item),
    teraColor: colorType(pokemon.teraType),
    tera: pokemon.teraType,
    ability: pokemon.ability,
    move1: pokemon.moves[0],
    move2: pokemon.moves[1],
    move3: pokemon.moves[2],
    move4: pokemon.moves[3],
    name: pokemon.name,
    item: pokemon.item,
  }))

  const otsHtml = template({ pokemonList })
  otsContainerElement.innerHTML = otsHtml

  return otsContainerElement
}

function imageLink(name) {
  var imageName = name.toLowerCase()
  imageName = imageName.replace(' ', '-')
  imageName = imageName.replace('calyrex-shadow', 'calyrex-shadow-rider')
  imageName = imageName.replace('calyrex-ice', 'calyrex-ice-rider')
  imageName = imageName.replace(/-f$/, '-female')
  imageName = imageName.replace('-hisui', '-hisuian')
  imageName = imageName.replace('-alola', '-alolan')
  imageName = imageName.replace('-galar', '-galarian')
  imageName = imageName.replace('rockruff-dusk', 'rockruff')
  imageName = imageName.replace('polteageist-antique', 'polteageist')
  imageName = imageName.replace('urshifu-rapid-strike', 'urshifu')

  return "https://img.pokemondb.net/sprites/scarlet-violet/normal/" + imageName + ".png"
}

function itemLink(name) {
  if (name) {
    return "https://www.serebii.net/itemdex/sprites/sv/" + name.replace(' ', '').toLowerCase() + ".png"
  }
}

function colorType(type) {
  const typeColors = {
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

  if (type in typeColors) {
    return "#" + typeColors[type]
  } else {
    return "#AAAAAA"
  }
}