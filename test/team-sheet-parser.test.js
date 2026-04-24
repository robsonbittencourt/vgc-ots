import { parseTeamSheet } from "../src/scripts/team-sheet-parser.js"

describe("Team Sheet Parser", () => {
  it("should parse html team sheet to paste format", () => {
    const rawInput = [
      'bbnas</summary><span class="picon" style="backgrou…png?v18) no-repeat scroll -280px -1800px"></span>',
      'Incineroar (F) @ Assault Vest <span class="itemico…png?v1) no-repeat scroll -120px -864px"></span>  ',
      "Ability: Intimidate  ",
      "Level: 50  ",
      "Tera Type: Grass  ",
      "- Throat Chop  ",
      "- Fake Out  ",
      "- Flare Blitz  ",
      "- Parting Shot  ",
      "",
      '<span class="picon" style="background:transparent ….png?v18) no-repeat scroll -80px -3060px"></span>',
      'Zacian-Crowned @ Rusted Sword <span class="itemico…ng?v1) no-repeat scroll -240px -1032px"></span>  ',
      "Ability: Intrepid Sword  ",
      "Level: 50  ",
      "Tera Type: Fighting  ",
      "- Behemoth Blade  ",
      "- Play Rough  ",
      "- Poison Jab  ",
      "- Sacred Sword  ",
      "",
      '<span class="picon" style="background:transparent …png?v18) no-repeat scroll -120px -1470px"></span>',
      'Amoonguss (F) @ Leftovers <span class="itemicon" s….png?v1) no-repeat scroll -48px -360px"></span>  ',
      "Ability: Regenerator  ",
      "Level: 50  ",
      "Tera Type: Fire  ",
      "- Rage Powder  ",
      "- Protect  ",
      "- Spore  ",
      "- Energy Ball  ",
      "",
      '<span class="picon" style="background:transparent …png?v18) no-repeat scroll -160px -2700px"></span>',
      'Rotom-Wash @ Choice Specs <span class="itemicon" s….png?v1) no-repeat scroll -144px -96px"></span>  ',
      "Ability: Levitate  ",
      "Level: 50  ",
      "Tera Type: Ground  ",
      "- Electroweb  ",
      "- Shadow Ball  ",
      "- Trick  ",
      "- Helping Hand  ",
      "",
      '<span class="picon" style="background:transparent …png?v18) no-repeat scroll -360px -2430px"></span>',
      'Farigiraf (F) @ Safety Goggles <span class="itemic…png?v1) no-repeat scroll -288px -888px"></span>  ',
      "Ability: Armor Tail  ",
      "Level: 50  ",
      "Tera Type: Grass  ",
      "- Helping Hand  ",
      "- Psychic  ",
      "- Trick Room  ",
      "- Light Screen  ",
      "",
      '<span class="picon" style="background:transparent …t.png?v18) no-repeat scroll -40px -360px"></span>',
      'Zapdos @ Sitrus Berry <span class="itemicon" style…t.png?v1) no-repeat scroll -0px -672px"></span>  ',
      "Ability: Static  ",
      "Level: 50  ",
      "Tera Type: Rock  ",
      "- Thunderbolt  ",
      "- Tailwind  ",
      "- Volt Switch  ",
      "- Heat Wave  ",
      "",
      ""
    ]

    const result = parseTeamSheet(rawInput)
      .split("\n")
      .map(line => line.trim())

    expect(result[0]).toBe("Incineroar (F) @ Assault Vest")
    expect(result[1]).toBe("Ability: Intimidate")
    expect(result[2]).toBe("Level: 50")
    expect(result[3]).toBe("Tera Type: Grass")
    expect(result[4]).toBe("- Throat Chop")
    expect(result[5]).toBe("- Fake Out")
    expect(result[6]).toBe("- Flare Blitz")
    expect(result[7]).toBe("- Parting Shot")

    expect(result[9]).toBe("Zacian-Crowned @ Rusted Sword")
    expect(result[10]).toBe("Ability: Intrepid Sword")
    expect(result[11]).toBe("Level: 50")
    expect(result[12]).toBe("Tera Type: Fighting")
    expect(result[13]).toBe("- Behemoth Blade")
    expect(result[14]).toBe("- Play Rough")
    expect(result[15]).toBe("- Poison Jab")
    expect(result[16]).toBe("- Sacred Sword")

    expect(result[18]).toBe("Amoonguss (F) @ Leftovers")
    expect(result[19]).toBe("Ability: Regenerator")
    expect(result[20]).toBe("Level: 50")
    expect(result[21]).toBe("Tera Type: Fire")
    expect(result[22]).toBe("- Rage Powder")
    expect(result[23]).toBe("- Protect")
    expect(result[24]).toBe("- Spore")
    expect(result[25]).toBe("- Energy Ball")

    expect(result[27]).toBe("Rotom-Wash @ Choice Specs")
    expect(result[28]).toBe("Ability: Levitate")
    expect(result[29]).toBe("Level: 50")
    expect(result[30]).toBe("Tera Type: Ground")
    expect(result[31]).toBe("- Electroweb")
    expect(result[32]).toBe("- Shadow Ball")
    expect(result[33]).toBe("- Trick")
    expect(result[34]).toBe("- Helping Hand")

    expect(result[36]).toBe("Farigiraf (F) @ Safety Goggles")
    expect(result[37]).toBe("Ability: Armor Tail")
    expect(result[38]).toBe("Level: 50")
    expect(result[39]).toBe("Tera Type: Grass")
    expect(result[40]).toBe("- Helping Hand")
    expect(result[41]).toBe("- Psychic")
    expect(result[42]).toBe("- Trick Room")
    expect(result[43]).toBe("- Light Screen")

    expect(result[45]).toBe("Zapdos @ Sitrus Berry")
    expect(result[46]).toBe("Ability: Static")
    expect(result[47]).toBe("Level: 50")
    expect(result[48]).toBe("Tera Type: Rock")
    expect(result[49]).toBe("- Thunderbolt")
    expect(result[50]).toBe("- Tailwind")
    expect(result[51]).toBe("- Volt Switch")
    expect(result[52]).toBe("- Heat Wave")
  })

  it("should parse html team sheet without Tera Type (Champions format) to paste format", () => {
    const rawInput = [
      'sorcerer_rs_3</summary><span class="picon" style="background:transparent url(https://play.pokemonshowdown.com/sprites/pokemonicons-sheet.png?v21) no-repeat scroll -360px -0px"></span>',
      'Blastoise (M) @ Blastoisinite <span class="itemicon" style="background:transparent url(https://play.pokemonshowdown.com/sprites/itemicons-sheet.png?v1) no-repeat scroll -168px -864px"></span>',
      "Ability: Rain Dish",
      "Level: 50",
      "- Fake Out",
      "- Water Spout",
      "- Dark Pulse",
      "- Aura Sphere",
      "",
      '<span class="picon" style="background:transparent url(https://play.pokemonshowdown.com/sprites/pokemonicons-sheet.png?v21) no-repeat scroll -440px -2430px"></span>',
      'Kingambit (M) @ Chople Berry <span class="itemicon" style="background:transparent url(https://play.pokemonshowdown.com/sprites/itemicons-sheet.png?v1) no-repeat scroll -168px -96px"></span>',
      "Ability: Defiant",
      "Level: 50",
      "- Iron Head",
      "- Kowtow Cleave",
      "- Low Kick",
      "- Sucker Punch",
      "",
      '<span class="picon" style="background:transparent url(https://play.pokemonshowdown.com/sprites/pokemonicons-sheet.png?v21) no-repeat scroll -320px -600px"></span>',
      'Tyranitar (M) @ Tyranitarite <span class="itemicon" style="background:transparent url(https://play.pokemonshowdown.com/sprites/itemicons-sheet.png?v1) no-repeat scroll -360px -888px"></span>',
      "Ability: Sand Stream",
      "Level: 50",
      "- Protect",
      "- Rock Slide",
      "- Knock Off",
      "- Superpower",
      "",
      '<span class="picon" style="background:transparent url(https://play.pokemonshowdown.com/sprites/pokemonicons-sheet.png?v21) no-repeat scroll -200px -2520px"></span>',
      'Sinistcha @ Occa Berry <span class="itemicon" style="background:transparent url(https://play.pokemonshowdown.com/sprites/itemicons-sheet.png?v1) no-repeat scroll -168px -456px"></span>',
      "Ability: Hospitality",
      "Level: 50",
      "- Rage Powder",
      "- Matcha Gotcha",
      "- Life Dew",
      "- Trick Room",
      "",
      '<span class="picon" style="background:transparent url(https://play.pokemonshowdown.com/sprites/pokemonicons-sheet.png?v21) no-repeat scroll -360px -2430px"></span>',
      'Farigiraf (M) @ Sitrus Berry <span class="itemicon" style="background:transparent url(https://play.pokemonshowdown.com/sprites/itemicons-sheet.png?v1) no-repeat scroll -0px -672px"></span>',
      "Ability: Armor Tail",
      "Level: 50",
      "- Psychic",
      "- Rain Dance",
      "- Low Kick",
      "- Trick Room",
      "",
      '<span class="picon" style="background:transparent url(https://play.pokemonshowdown.com/sprites/pokemonicons-sheet.png?v21) no-repeat scroll -80px -2250px"></span>',
      'Basculegion (M) @ Choice Scarf <span class="itemicon" style="background:transparent url(https://play.pokemonshowdown.com/sprites/itemicons-sheet.png?v1) no-repeat scroll -120px -96px"></span>',
      "Ability: Adaptability",
      "Level: 50",
      "- Flip Turn",
      "- Wave Crash",
      "- Last Respects",
      "- Aqua Jet",
      "",
      ""
    ]

    const result = parseTeamSheet(rawInput)
      .split("\n")
      .map(line => line.trim())

    expect(result[0]).toBe("Blastoise (M) @ Blastoisinite")
    expect(result[1]).toBe("Ability: Rain Dish")
    expect(result[2]).toBe("Level: 50")
    expect(result[3]).toBe("- Fake Out")
    expect(result[4]).toBe("- Water Spout")
    expect(result[5]).toBe("- Dark Pulse")
    expect(result[6]).toBe("- Aura Sphere")

    expect(result[8]).toBe("Kingambit (M) @ Chople Berry")
    expect(result[9]).toBe("Ability: Defiant")
    expect(result[10]).toBe("Level: 50")
    expect(result[11]).toBe("- Iron Head")
    expect(result[12]).toBe("- Kowtow Cleave")
    expect(result[13]).toBe("- Low Kick")
    expect(result[14]).toBe("- Sucker Punch")

    expect(result[16]).toBe("Tyranitar (M) @ Tyranitarite")
    expect(result[17]).toBe("Ability: Sand Stream")
    expect(result[18]).toBe("Level: 50")
    expect(result[19]).toBe("- Protect")
    expect(result[20]).toBe("- Rock Slide")
    expect(result[21]).toBe("- Knock Off")
    expect(result[22]).toBe("- Superpower")

    expect(result[24]).toBe("Sinistcha @ Occa Berry")
    expect(result[25]).toBe("Ability: Hospitality")
    expect(result[26]).toBe("Level: 50")
    expect(result[27]).toBe("- Rage Powder")
    expect(result[28]).toBe("- Matcha Gotcha")
    expect(result[29]).toBe("- Life Dew")
    expect(result[30]).toBe("- Trick Room")

    expect(result[32]).toBe("Farigiraf (M) @ Sitrus Berry")
    expect(result[33]).toBe("Ability: Armor Tail")
    expect(result[34]).toBe("Level: 50")
    expect(result[35]).toBe("- Psychic")
    expect(result[36]).toBe("- Rain Dance")
    expect(result[37]).toBe("- Low Kick")
    expect(result[38]).toBe("- Trick Room")

    expect(result[40]).toBe("Basculegion (M) @ Choice Scarf")
    expect(result[41]).toBe("Ability: Adaptability")
    expect(result[42]).toBe("Level: 50")
    expect(result[43]).toBe("- Flip Turn")
    expect(result[44]).toBe("- Wave Crash")
    expect(result[45]).toBe("- Last Respects")
    expect(result[46]).toBe("- Aqua Jet")
  })

  it("should parse html team sheet with some Pokémon with less than 4 attacks to paste format", () => {
    const rawInput = [
      'mk1989</summary><span class="picon" style="background:transparent url(https://play.pokemonshowdown.com/sprites/pokemonicons-sheet.png?v18) no-repeat scroll -40px -3090px"></span>',
      'Calyrex-Shadow @ Life Orb <span class="itemicon" style="background:transparent url(https://play.pokemonshowdown.com/sprites/itemicons-sheet.png?v1) no-repeat scroll -216px -360px"></span>  ',
      "Ability: As One (Spectrier)  ",
      "Level: 50  ",
      "Tera Type: Fairy  ",
      "- Astral Barrage  ",
      "- Psychic  ",
      "- Protect  ",
      '<span class="picon" style="background:transparent url(https://play.pokemonshowdown.com/sprites/pokemonicons-sheet.png?v18) no-repeat scroll -120px -3060px"></span>',
      'Zamazenta-Crowned @ Rusted Shield <span class="itemicon" style="background:transparent url(https://play.pokemonshowdown.com/sprites/itemicons-sheet.png?v1) no-repeat scroll -264px -1032px"></span>  ',
      "Ability: Dauntless Shield  ",
      "Level: 50  ",
      "Tera Type: Grass  ",
      "- Wide Guard  ",
      "- Body Press  ",
      '<span class="picon" style="background:transparent url(https://play.pokemonshowdown.com/sprites/pokemonicons-sheet.png?v18) no-repeat scroll -160px -2220px"></span>',
      'Urshifu-Rapid-Strike (F) @ Choice Scarf <span class="itemicon" style="background:transparent url(https://play.pokemonshowdown.com/sprites/itemicons-sheet.png?v1) no-repeat scroll -120px -96px"></span>  ',
      "Ability: Unseen Fist  ",
      "Level: 50  ",
      "Tera Type: Ghost  ",
      "- Surging Strikes  ",
      '<span class="picon" style="background:transparent url(https://play.pokemonshowdown.com/sprites/pokemonicons-sheet.png?v18) no-repeat scroll -240px -2490px"></span>',
      'Chien-Pao @ Focus Sash <span class="itemicon" style="background:transparent url(https://play.pokemonshowdown.com/sprites/itemicons-sheet.png?v1) no-repeat scroll -168px -216px"></span>  ',
      "Ability: Sword of Ruin  ",
      "Level: 50  ",
      "Tera Type: Ghost  ",
      "- Ice Spinner  ",
      "- Sacred Sword  ",
      "- Sucker Punch  ",
      "- Protect  ",
      '<span class="picon" style="background:transparent url(https://play.pokemonshowdown.com/sprites/pokemonicons-sheet.png?v18) no-repeat scroll -120px -1470px"></span>',
      'Amoonguss (F) @ Rocky Helmet <span class="itemicon" style="background:transparent url(https://play.pokemonshowdown.com/sprites/itemicons-sheet.png?v1) no-repeat scroll -24px -624px"></span>  ',
      "Ability: Regenerator  ",
      "Level: 50  ",
      "Tera Type: Water  ",
      "- Rage Powder  ",
      "- Spore  ",
      "- Sludge Bomb  ",
      "- Protect  ",
      '<span class="picon" style="background:transparent url(https://play.pokemonshowdown.com/sprites/pokemonicons-sheet.png?v18) no-repeat scroll -0px -330px"></span>',
      'Ditto @ Focus Sash <span class="itemicon" style="background:transparent url(https://play.pokemonshowdown.com/sprites/itemicons-sheet.png?v1) no-repeat scroll -168px -216px"></span>',
      "Ability: Imposter",
      "Level: 50",
      "Tera Type: Ghost",
      "- Transform",
      "",
      "</details>"
    ]

    const result = parseTeamSheet(rawInput)
      .split("\n")
      .map(line => line.trim())

    expect(result[0]).toBe("Calyrex-Shadow @ Life Orb")
    expect(result[1]).toBe("Ability: As One (Spectrier)")
    expect(result[2]).toBe("Level: 50")
    expect(result[3]).toBe("Tera Type: Fairy")
    expect(result[4]).toBe("- Astral Barrage")
    expect(result[5]).toBe("- Psychic")
    expect(result[6]).toBe("- Protect")

    expect(result[8]).toBe("Zamazenta-Crowned @ Rusted Shield")
    expect(result[9]).toBe("Ability: Dauntless Shield")
    expect(result[10]).toBe("Level: 50")
    expect(result[11]).toBe("Tera Type: Grass")
    expect(result[12]).toBe("- Wide Guard")
    expect(result[13]).toBe("- Body Press")

    expect(result[15]).toBe("Urshifu-Rapid-Strike (F) @ Choice Scarf")
    expect(result[16]).toBe("Ability: Unseen Fist")
    expect(result[17]).toBe("Level: 50")
    expect(result[18]).toBe("Tera Type: Ghost")
    expect(result[19]).toBe("- Surging Strikes")

    expect(result[21]).toBe("Chien-Pao @ Focus Sash")
    expect(result[22]).toBe("Ability: Sword of Ruin")
    expect(result[23]).toBe("Level: 50")
    expect(result[24]).toBe("Tera Type: Ghost")
    expect(result[25]).toBe("- Ice Spinner")
    expect(result[26]).toBe("- Sacred Sword")
    expect(result[27]).toBe("- Sucker Punch")
    expect(result[28]).toBe("- Protect")

    expect(result[30]).toBe("Amoonguss (F) @ Rocky Helmet")
    expect(result[31]).toBe("Ability: Regenerator")
    expect(result[32]).toBe("Level: 50")
    expect(result[33]).toBe("Tera Type: Water")
    expect(result[34]).toBe("- Rage Powder")
    expect(result[35]).toBe("- Spore")
    expect(result[36]).toBe("- Sludge Bomb")
    expect(result[37]).toBe("- Protect")

    expect(result[39]).toBe("Ditto @ Focus Sash")
    expect(result[40]).toBe("Ability: Imposter")
    expect(result[41]).toBe("Level: 50")
    expect(result[42]).toBe("Tera Type: Ghost")
    expect(result[43]).toBe("- Transform")
  })
})
