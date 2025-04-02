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
})
