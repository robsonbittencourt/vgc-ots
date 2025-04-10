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

    expect(result[0].name).toBe("Incineroar")
    expect(result[0].item).toBe("Assault Vest")
    expect(result[0].ability).toBe("Intimidate")
    expect(result[0].teraType).toBe("Grass")
    expect(result[0].moves[0]).toBe("Throat Chop")
    expect(result[0].moves[1]).toBe("Fake Out")
    expect(result[0].moves[2]).toBe("Flare Blitz")
    expect(result[0].moves[3]).toBe("Parting Shot")

    expect(result[1].name).toBe("Zacian-Crowned")
    expect(result[1].item).toBe("Rusted Sword")
    expect(result[1].ability).toBe("Intrepid Sword")
    expect(result[1].teraType).toBe("Fighting")
    expect(result[1].moves[0]).toBe("Behemoth Blade")
    expect(result[1].moves[1]).toBe("Play Rough")
    expect(result[1].moves[2]).toBe("Poison Jab")
    expect(result[1].moves[3]).toBe("Sacred Sword")

    expect(result[2].name).toBe("Amoonguss")
    expect(result[2].item).toBe("Leftovers")
    expect(result[2].ability).toBe("Regenerator")
    expect(result[2].teraType).toBe("Fire")
    expect(result[2].moves[0]).toBe("Rage Powder")
    expect(result[2].moves[1]).toBe("Protect")
    expect(result[2].moves[2]).toBe("Spore")
    expect(result[2].moves[3]).toBe("Energy Ball")

    expect(result[3].name).toBe("Rotom-Wash")
    expect(result[3].item).toBe("Choice Specs")
    expect(result[3].ability).toBe("Levitate")
    expect(result[3].teraType).toBe("Ground")
    expect(result[3].moves[0]).toBe("Electroweb")
    expect(result[3].moves[1]).toBe("Shadow Ball")
    expect(result[3].moves[2]).toBe("Trick")
    expect(result[3].moves[3]).toBe("Helping Hand")

    expect(result[4].name).toBe("Farigiraf")
    expect(result[4].item).toBe("Safety Goggles")
    expect(result[4].ability).toBe("Armor Tail")
    expect(result[4].teraType).toBe("Grass")
    expect(result[4].moves[0]).toBe("Helping Hand")
    expect(result[4].moves[1]).toBe("Psychic")
    expect(result[4].moves[2]).toBe("Trick Room")
    expect(result[4].moves[3]).toBe("Light Screen")

    expect(result[5].name).toBe("Zapdos")
    expect(result[5].item).toBe("Sitrus Berry")
    expect(result[5].ability).toBe("Static")
    expect(result[5].teraType).toBe("Rock")
    expect(result[5].moves[0]).toBe("Thunderbolt")
    expect(result[5].moves[1]).toBe("Tailwind")
    expect(result[5].moves[2]).toBe("Volt Switch")
    expect(result[5].moves[3]).toBe("Heat Wave")
  })

  it("should parse html team sheet with some Pokémon with less than 4 attacks to paste format", () => {
    const rawInput = [
      'mk1989</summary><span class="picon" style="background:transparent url(https://play.pokemonshowdown.com/sprites/pokemonicons-sheet.png?v18) no-repeat scroll -40px -3090px"></span>',
      'Calyrex-Shadow @ Life Orb <span class="itemicon" style="background:transparent url(https://play.pokemonshowdown.com/sprites/itemicons-sheet.png?v1) no-repeat scroll -216px -360px"></span>  ',
      'Ability: As One (Spectrier)  ',
      'Level: 50  ',
      'Tera Type: Fairy  ',
      '- Astral Barrage  ',
      '- Psychic  ',
      '- Protect  ',
      '<span class="picon" style="background:transparent url(https://play.pokemonshowdown.com/sprites/pokemonicons-sheet.png?v18) no-repeat scroll -120px -3060px"></span>',
      'Zamazenta-Crowned @ Rusted Shield <span class="itemicon" style="background:transparent url(https://play.pokemonshowdown.com/sprites/itemicons-sheet.png?v1) no-repeat scroll -264px -1032px"></span>  ',
      'Ability: Dauntless Shield  ',
      'Level: 50  ',
      'Tera Type: Grass  ',
      '- Wide Guard  ',
      '- Body Press  ',
      '<span class="picon" style="background:transparent url(https://play.pokemonshowdown.com/sprites/pokemonicons-sheet.png?v18) no-repeat scroll -160px -2220px"></span>',
      'Urshifu-Rapid-Strike (F) @ Choice Scarf <span class="itemicon" style="background:transparent url(https://play.pokemonshowdown.com/sprites/itemicons-sheet.png?v1) no-repeat scroll -120px -96px"></span>  ',
      'Ability: Unseen Fist  ',
      'Level: 50  ',
      'Tera Type: Ghost  ',
      '- Surging Strikes  ',
      '<span class="picon" style="background:transparent url(https://play.pokemonshowdown.com/sprites/pokemonicons-sheet.png?v18) no-repeat scroll -240px -2490px"></span>',
      'Chien-Pao @ Focus Sash <span class="itemicon" style="background:transparent url(https://play.pokemonshowdown.com/sprites/itemicons-sheet.png?v1) no-repeat scroll -168px -216px"></span>  ',
      'Ability: Sword of Ruin  ',
      'Level: 50  ',
      'Tera Type: Ghost  ',
      '- Ice Spinner  ',
      '- Sacred Sword  ',
      '- Sucker Punch  ',
      '- Protect  ',
      '<span class="picon" style="background:transparent url(https://play.pokemonshowdown.com/sprites/pokemonicons-sheet.png?v18) no-repeat scroll -120px -1470px"></span>',
      'Amoonguss (F) @ Rocky Helmet <span class="itemicon" style="background:transparent url(https://play.pokemonshowdown.com/sprites/itemicons-sheet.png?v1) no-repeat scroll -24px -624px"></span>  ',
      'Ability: Regenerator  ',
      'Level: 50  ',
      'Tera Type: Water  ',
      '- Rage Powder  ',
      '- Spore  ',
      '- Sludge Bomb  ',
      '- Protect  ',
      '<span class="picon" style="background:transparent url(https://play.pokemonshowdown.com/sprites/pokemonicons-sheet.png?v18) no-repeat scroll -200px -1590px"></span>',
      'Tornadus (M) @ Covert Cloak <span class="itemicon" style="background:transparent url(https://play.pokemonshowdown.com/sprites/itemicons-sheet.png?v1) no-repeat scroll -336px -1104px"></span>  ',
      'Ability: Prankster  ',
      'Level: 50  ',
      'Tera Type: Dark  ',
      '- Tailwind  ',
      '- Bleakwind Storm  ',
      '- Rain Dance  ',
      '- Taunt  ',
      '</details>',
    ]

    const result = parseTeamSheet(rawInput)

    expect(result[0].name).toBe("Calyrex-Shadow")
    expect(result[0].item).toBe("Life Orb")
    expect(result[0].ability).toBe("As One (Spectrier)")
    expect(result[0].teraType).toBe("Fairy")
    expect(result[0].moves[0]).toBe("Astral Barrage")
    expect(result[0].moves[1]).toBe("Psychic")
    expect(result[0].moves[2]).toBe("Protect")
    expect(result[0].moves[3]).toBeUndefined()

    expect(result[1].name).toBe("Zamazenta-Crowned")
    expect(result[1].item).toBe("Rusted Shield")
    expect(result[1].ability).toBe("Dauntless Shield")
    expect(result[1].teraType).toBe("Grass")
    expect(result[1].moves[0]).toBe("Wide Guard")
    expect(result[1].moves[1]).toBe("Body Press")
    expect(result[1].moves[2]).toBeUndefined()
    expect(result[1].moves[3]).toBeUndefined()

    expect(result[2].name).toBe("Urshifu-Rapid-Strike")
    expect(result[2].item).toBe("Choice Scarf")
    expect(result[2].ability).toBe("Unseen Fist")
    expect(result[2].teraType).toBe("Ghost")
    expect(result[2].moves[0]).toBe("Surging Strikes")
    expect(result[2].moves[1]).toBeUndefined()
    expect(result[2].moves[2]).toBeUndefined()
    expect(result[2].moves[3]).toBeUndefined()

    expect(result[3].name).toBe("Chien-Pao")
    expect(result[3].item).toBe("Focus Sash")
    expect(result[3].ability).toBe("Sword of Ruin")
    expect(result[3].teraType).toBe("Ghost")
    expect(result[3].moves[0]).toBe("Ice Spinner")
    expect(result[3].moves[1]).toBe("Sacred Sword")
    expect(result[3].moves[2]).toBe("Sucker Punch")
    expect(result[3].moves[3]).toBe("Protect")

    expect(result[4].name).toBe("Amoonguss")
    expect(result[4].item).toBe("Rocky Helmet")
    expect(result[4].ability).toBe("Regenerator")
    expect(result[4].teraType).toBe("Water")
    expect(result[4].moves[0]).toBe("Rage Powder")
    expect(result[4].moves[1]).toBe("Spore")
    expect(result[4].moves[2]).toBe("Sludge Bomb")
    expect(result[4].moves[3]).toBe("Protect")

    expect(result[5].name).toBe("Tornadus")
    expect(result[5].item).toBe("Covert Cloak")
    expect(result[5].ability).toBe("Prankster")
    expect(result[5].teraType).toBe("Dark")
    expect(result[5].moves[0]).toBe("Tailwind")
    expect(result[5].moves[1]).toBe("Bleakwind Storm")
    expect(result[5].moves[2]).toBe("Rain Dance")
    expect(result[5].moves[3]).toBe("Taunt")
  })
})
