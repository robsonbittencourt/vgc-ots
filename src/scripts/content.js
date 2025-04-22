import { getAllElements, getElement, getElementSync } from "./element-selector.js"
import { createOpenTeamSheetElement } from "./ots-component.js"
import { parseTeamSheet } from "./team-sheet-parser.js"

const teamboxSelector = ".infobox"

let player = null

async function updateTeamsheet() {
  const roomBattle = await getRoomBattle()

  if (getElementSync(".pokemon-container", roomBattle)) return

  const container = await getContainer(roomBattle)

  await hideOriginalTeamSheets(roomBattle)

  const pokePaste = getPokePaste(container)

  const openTeamSheetElement = await createOpenTeamSheetElement(pokePaste)

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
  const button = roomBattle.querySelector(".change-player-button")

  button.addEventListener("click", () => {
    changePlayer(player)
    getElementSync(".pokemon-container").remove()
    updateTeamsheet()
  })
}

async function copy() {
  const roomBattle = await getRoomBattle()
  const container = await getContainer(roomBattle)
  const pokePaste = getPokePaste(container)

  navigator.clipboard.writeText(pokePaste)
}

async function getContainer(roomBattle) {
  const userName = await getUsername()
  const containers = Array.from(await getAllElements(teamboxSelector, roomBattle))

  const players = roomBattle.querySelector(".chat small").textContent.replace(/☆/g, "").replace(" joined", "").split(" and ")

  if (players.includes(userName) && player == null) {
    changePlayer(players.indexOf(userName))
  }

  return containers[player]
}

async function getUsername() {
  const userNameElement = await getElement("span.usernametext")

  return userNameElement.textContent.trim()
}

function changePlayer(actualPlayer) {
  player = actualPlayer === 0 ? 1 : 0
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

function repositionsOriginalElements(roomBattle) {
  const copyButtonTop = document.querySelector(".copy-button").getBoundingClientRect().top
  const copyButtonTopPosition = `${copyButtonTop - 25}px`

  const battleLog = getElementSync(".battle-log", roomBattle)
  battleLog.style.top = copyButtonTopPosition

  const userList = getElementSync("ul.battle-userlist", roomBattle)
  userList.style.top = copyButtonTopPosition
  userList.style.left = "640px"
}

function listenToBattleStart() {
  updateTeamsheet()

  let currentUrl = window.location.href

  setInterval(() => {
    if (currentUrl !== window.location.href) {
      currentUrl = window.location.href
      if (currentUrl.includes("vgc")) {
        updateTeamsheet()
      }
    }
  }, 500)
}

listenToBattleStart()
