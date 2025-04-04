import { getAllElements, getElement, getElementSync } from "./element-selector.js"
import { createOpenTeamSheetElement } from "./ots-component.js"
import { parseTeamSheet } from "./team-sheet-parser.js"

const teamboxSelector = ".infobox"

async function updateTeamsheet() {
  const roomBattle = await getRoomBattle()

  if (getElementSync(".pokemon-container", roomBattle)) return

  const container = await getOpponentContainer(roomBattle)

  await hideOriginalTeamSheets(roomBattle)
  repositionsOriginalElements(roomBattle)

  const pokemonTeam = getOpponentTeam(container)
  const openTeamSheetElement = await createOpenTeamSheetElement(pokemonTeam)

  roomBattle.appendChild(openTeamSheetElement)
}

async function getOpponentContainer(roomBattle) {
  const userName = await getUsername()
  const containers = Array.from(await getAllElements(teamboxSelector, roomBattle))

  return containers.filter(container => {
    const teamSheet = getElementSync("details", container)

    if (teamSheet == null) return

    const teamUser = teamSheet.textContent.split("Open Team Sheet for ")[1].substring(0, userName.length)

    return teamUser != userName
  })[0]
}

async function getUsername() {
  const userNameElement = await getElement("span.usernametext")

  return userNameElement.textContent.trim()
}

function extractBattleId(url) {
  const match = url.match(/battle-(.*)/)

  if (match && match[1]) {
    return match[1]
  }

  return null
}

async function getRoomBattle() {
  const url = window.location.href
  const battleId = extractBattleId(url)

  return await getElement("#room-battle-" + battleId)
}

async function hideOriginalTeamSheets(roomBattle) {
  const elements = await getAllElements(teamboxSelector, roomBattle)
  Array.from(elements).forEach(container => {
    container.style.display = "none"
  })
}

function getOpponentTeam(container) {
  const teamSheet = getElementSync("details", container)
  const enemysheet = teamSheet.innerHTML.split("Open Team Sheet for ")[1].split("<br>")

  return parseTeamSheet(enemysheet)
}

function repositionsOriginalElements(roomBattle) {
  const battleLog = getElementSync(".battle-log", roomBattle)
  battleLog.style.top = "240px"

  const userList = getElementSync("ul.battle-userlist", roomBattle)
  userList.style.top = "240px"
  userList.style.left = "640px"
}

function listenToBattleStart() {
  updateTeamsheet()

  let currentUrl = window.location.href;

  setInterval(() => {
    if (currentUrl !== window.location.href) {
      currentUrl = window.location.href;
      if (currentUrl.includes("vgc")) {
        updateTeamsheet();
      }
    }
  }, 500);
}

listenToBattleStart()
