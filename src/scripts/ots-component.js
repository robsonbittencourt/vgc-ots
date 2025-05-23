import template from "../ots-component.handlebars"
import { Koffing } from "koffing"

export async function createOpenTeamSheetElement(pokePaste, watchBattle) {
  const otsContainerElement = document.createElement("div")
  otsContainerElement.className = "pokemon-container"

  const team = Koffing.parse(pokePaste).teams[0].pokemon

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

  const otsHtml = template({ pokemonList, watchBattle })
  otsContainerElement.innerHTML = otsHtml

  return otsContainerElement
}

function imageLink(name) {
  let imageName = name.toLowerCase()
  imageName = imageName.replace(" ", "-")
  imageName = imageName.replace("calyrex-shadow", "calyrex-shadow-rider")
  imageName = imageName.replace("calyrex-ice", "calyrex-ice-rider")
  imageName = imageName.replace("urshifu-rapid-strike", "urshifu")
  imageName = imageName.replace(/-f$/, "-female")
  imageName = imageName.replace("-hisui", "-hisuian")
  imageName = imageName.replace("-alola", "-alolan")
  imageName = imageName.replace("-galar", "-galarian")

  if (imageName.includes("-")) {
    const onlyName = imageName.substring(0, imageName.indexOf("-"))

    if (pokemonWithAlternativeForm().includes(onlyName)) {
      imageName = onlyName
    }
  }

  return "https://img.pokemondb.net/sprites/scarlet-violet/normal/" + imageName + ".png"
}

function pokemonWithAlternativeForm() {
  return ["rockruff", "polteageist", "sinistea", "sinistcha", "vivillon", "alcremie", "dudunsparce", "pikachu", "flabébé", "floette", "florges", "squawkabilly", "maushold", "tatsugiri"]
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
