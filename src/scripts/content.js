import { getAllElements, getElement, getElementSync } from "./element-selector.js"
import { createOpenTeamSheetElement } from "./ots-component.js"
import { parseTeamSheet } from "./team-sheet-parser.js"

const teamboxSelector = ".infobox"

async function updateTeamSheet() {
  const roomBattle = await getRoomBattle()

  if (getElementSync(".pokemon-container", roomBattle)) return

  const watchBattle = await isWatchBattle(roomBattle)
  const container = await getContainer(roomBattle, watchBattle)

  await hideOriginalTeamSheets(roomBattle)

  const pokePaste = getPokePaste(container)
  const openTeamSheetElement = await createOpenTeamSheetElement(pokePaste, watchBattle)

  roomBattle.appendChild(openTeamSheetElement)
  createCopyButtonEvent(roomBattle)
  changePlayerButtonEvent(roomBattle)

  repositionsOriginalElements(roomBattle)
}

function createCopyButtonEvent(roomBattle) {
  const button = roomBattle.querySelector(".copy-button")
  const textSpan = button.querySelector(".button-text")

  button.addEventListener("click", () => {
    copy()

    textSpan.textContent = "Copied"
    button.disabled = true

    setTimeout(() => {
      textSpan.textContent = "Copy"
      button.disabled = false
    }, 2000)
  })
}

function changePlayerButtonEvent(roomBattle) {
  const button = roomBattle.querySelector(".switch-player-button")

  if (!button) return

  button.addEventListener("click", () => {
    getElementSync(".pokemon-container", roomBattle).remove()
    updateTeamSheet()
  })
}

async function copy() {
  const roomBattle = await getRoomBattle()
  const container = await getContainer(roomBattle)
  const pokePaste = getPokePaste(container)

  navigator.clipboard.writeText(pokePaste)
}

async function getContainer(roomBattle, watchBattle) {
  const containers = Array.from(await getAllElements(teamboxSelector, roomBattle))

  if (watchBattle) {
    const playerIndex = containers.findIndex(c => c.getAttribute("active") === "true")

    if (playerIndex === -1) {
      containers[0].setAttribute("active", true)
      containers[1].setAttribute("active", false)
      return containers[0]
    } else {
      const anotherIndex = playerIndex === 0 ? 1 : 0
      containers[playerIndex].setAttribute("active", false)
      containers[anotherIndex].setAttribute("active", true)

      return containers[anotherIndex]
    }
  }

  const players = await getPlayers(roomBattle)
  const userName = await getUsername()
  const opponentIndex = players.indexOf(userName) === 0 ? 1 : 0

  return containers[opponentIndex]
}

async function isWatchBattle(roomBattle) {
  const userName = await getUsername()
  const players = await getPlayers(roomBattle)
  return !players.includes(userName)
}

async function getPlayers(roomBattle) {
  const chat = await getElement(".chat small", roomBattle)
  return chat.textContent.replace(/☆/g, "").replace(" joined", "").split(" and ")
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

function getPokePaste(container) {
  const teamSheet = getElementSync("details", container)
  const enemysheet = teamSheet.innerHTML.split("Open Team Sheet for ")[1].split("<br>")

  return parseTeamSheet(enemysheet)
}

async function repositionsOriginalElements(roomBattle) {
  const container = getElementSync(".pokemon-container", roomBattle)
  const containerHeigth = container.offsetHeight + 10

  const battleLog = getElementSync(".battle-log", roomBattle)
  battleLog.style.top = `${containerHeigth}px`

  const userList = getElementSync("ul.battle-userlist", roomBattle)
  userList.style.top = `${containerHeigth}px`
  userList.style.left = "640px"
}

function listenToBattleStart() {
  updateTeamSheet()

  let currentUrl = window.location.href

  setInterval(() => {
    if (currentUrl !== window.location.href) {
      currentUrl = window.location.href
      if (currentUrl.includes("vgc")) {
        updateTeamSheet()
      }
    }
  }, 500)
}

listenToBattleStart()
