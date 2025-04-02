import template from "../ots-component.handlebars"

export async function createOpenTeamSheetElement(team) {
  const otsContainerElement = document.createElement("div")
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
    item: pokemon.item
  }))

  const otsHtml = template({ pokemonList })
  otsContainerElement.innerHTML = otsHtml

  return otsContainerElement
}

function imageLink(name) {
  let imageName = name.toLowerCase()
  imageName = imageName.replace(" ", "-")
  imageName = imageName.replace("calyrex-shadow", "calyrex-shadow-rider")
  imageName = imageName.replace("calyrex-ice", "calyrex-ice-rider")
  imageName = imageName.replace(/-f$/, "-female")
  imageName = imageName.replace("-hisui", "-hisuian")
  imageName = imageName.replace("-alola", "-alolan")
  imageName = imageName.replace("-galar", "-galarian")
  imageName = imageName.replace("rockruff-dusk", "rockruff")
  imageName = imageName.replace("polteageist-antique", "polteageist")
  imageName = imageName.replace("urshifu-rapid-strike", "urshifu")

  return "https://img.pokemondb.net/sprites/scarlet-violet/normal/" + imageName + ".png"
}

function itemLink(name) {
  if (name) {
    return "https://www.serebii.net/itemdex/sprites/sv/" + name.replace(" ", "").toLowerCase() + ".png"
  }
}

function colorType(type) {
  const typeColors = {
    Normal: "#9FA19F",
    Fire: "#E62829",
    Water: "#2980EF",
    Electric: "#FAC000",
    Grass: "#3FA129",
    Ice: "#3DCEF3",
    Fighting: "#FF8000",
    Poison: "#9141CB",
    Ground: "#915121",
    Flying: "#81B9EF",
    Psychic: "#EF4179",
    Bug: "#91A119",
    Rock: "#AFA981",
    Ghost: "#704170",
    Dragon: "#5060E1",
    Dark: "#624D4E",
    Steel: "#60A1B8",
    Fairy: "#EF70EF",
    Stellar: "#83CFC5"
  }

  if (type in typeColors) {
    return typeColors[type]
  } else {
    return "#9FA19F"
  }
}
