import template from "../ots-component.handlebars"
import { Koffing } from "koffing"

export async function createOpenTeamSheetElement(pokePaste, watchBattle) {
  const otsContainerElement = document.createElement("div")
  otsContainerElement.className = "pokemon-container"

  const team = Koffing.parse(pokePaste).teams[0].pokemon

  const pokemonList = team.map(pokemon => ({
    imageLink: imageLink(pokemon.name),
    fallbackImageLink: fallbackImageLink(pokemon.name),
    itemLink: itemLink(pokemon.item),
    fallbackItemLink: fallbackItemLink(pokemon.item),
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

function normalizeImageName(name) {
  let imageName = name.toLowerCase()
  imageName = imageName.replace(" ", "-")
  imageName = imageName.replace("calyrex-shadow", "calyrex-shadow-rider")
  imageName = imageName.replace("calyrex-ice", "calyrex-ice-rider")
  imageName = imageName.replace("urshifu-rapid-strike", "urshifu")
  imageName = imageName.replace(/-f$/, "-female")
  imageName = imageName.replace("-hisui", "-hisuian")
  imageName = imageName.replace("-alola", "-alolan")
  imageName = imageName.replace("-galar", "-galarian")

  if (imageName.includes("-") && !pokemonKeepFullForm().includes(imageName)) {
    const onlyName = imageName.substring(0, imageName.indexOf("-"))

    if (pokemonWithAlternativeForm().includes(onlyName)) {
      imageName = onlyName
    }
  }

  return imageName
}

function imageLink(name) {
  const imageName = normalizeImageName(name)

  if (pokemonWithoutSvSprite().includes(imageName)) {
    return "https://img.pokemondb.net/sprites/bank/normal/" + imageName + ".png"
  }

  return "https://img.pokemondb.net/sprites/scarlet-violet/normal/" + imageName + ".png"
}

function fallbackImageLink(name) {
  return "https://img.pokemondb.net/sprites/bank/normal/" + normalizeImageName(name) + ".png"
}

function pokemonWithoutSvSprite() {
  return [
    "absol", "aerodactyl", "aegislash", "aggron", "alakazam", "aromatisse",
    "audino", "aurorus", "beedrill", "castform", "cofagrigus", "diggersby",
    "drampa", "emolga", "furfrou", "garbodor", "gourgeist", "heliolisk",
    "kangaskhan", "liepard", "lopunny", "machamp", "manectric", "pangoro",
    "pidgeot", "pinsir", "roserade", "runerigus", "sharpedo", "simipour",
    "simisage", "simisear", "slurpuff", "starmie", "steelix", "stunfisk",
    "tyrantrum", "vanilluxe", "watchog"
  ]
}

function pokemonWithAlternativeForm() {
  return ["rockruff", "polteageist", "sinistea", "sinistcha", "vivillon", "alcremie", "dudunsparce", "pikachu", "flabebe", "floette", "florges", "squawkabilly", "maushold", "tatsugiri"]
}

function pokemonKeepFullForm() {
  return ["floette-eternal"]
}

function normalizeItemName(name) {
  return name.replace(/ /g, "").toLowerCase()
}

function itemLink(name) {
  if (name) {
    const itemName = normalizeItemName(name)
    const base = megaStones().includes(itemName) ? "za" : "sv"
    return `https://www.serebii.net/itemdex/sprites/${base}/${itemName}.png`
  }
}

function megaStones() {
  return [
    "abomasite", "absolite", "aerodactylite", "aggronite", "alakazite", "altarianite",
    "ampharosite", "audinite", "banettite", "beedrillite", "blastoisinite", "cameruptite",
    "chandelurite", "chesnaughtite", "chimechite", "clefablite", "crabominite", "delphoxite",
    "dragoninite", "drampanite", "emboarite", "excadrite", "feraligite", "floettite",
    "froslassite", "galladite", "garchompite", "gardevoirite", "gengarite", "glalitite",
    "glimmoranite", "golurkite", "greninjite", "gyaradosite", "hawluchanite", "heracronite",
    "houndoominite", "kangaskhanite", "lopunnite", "lucarionite", "manectite", "medichamite",
    "meganiumite", "meowsticite", "pidgeotite", "pinsirite", "sablenite", "scizorite",
    "scovillainite", "sharpedonite", "skarmorite", "slowbronite", "starminite", "steelixite",
    "tyranitarite", "venusaurite", "victreebelite"
  ]
}

function fallbackItemLink(name) {
  if (name) {
    return "https://www.serebii.net/itemdex/sprites/za/" + normalizeItemName(name) + ".png"
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
