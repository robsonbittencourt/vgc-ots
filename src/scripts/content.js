import { createOpenTeamSheetElement } from './ots-component.js';
import { parseTeamSheet } from './team-sheet-parser.js';

const teamboxSelector = '.infobox'

async function updateTeamsheet() {
  if (window.location.toString().includes("vgc")) {
    const userName = await getUsername()
    const container = await getOpponentContainer(userName)

    if (container == null) return

    container.setAttribute("value", "done")
    hideOriginalTeamSheets()

    repositionsOriginalElements(container)

    const pokemonTeam = getOpponentTeam(container)
    const openTeamSheetElement = await createOpenTeamSheetElement(pokemonTeam)

    const battleLog = battleLogElement(container)
    battleLog.parentNode.insertBefore(openTeamSheetElement, battleLog)
  }
}

async function getUsername() {
  const userNameElement = await waitForElement('span.usernametext')

  return userNameElement.textContent.trim()
}

async function getOpponentContainer(userName) {
  await waitForElement(teamboxSelector)

  const constainers = Array.from(document.querySelectorAll(teamboxSelector))

  return constainers.filter(container => {
    const teamSheet = container.querySelector('details')

    if (teamSheet == null) return

    const teamUser = teamSheet.textContent.split('Open Team Sheet for ')[1].substring(0, userName.length)

    return teamUser != userName && !container.hasAttribute("value")
  })[0]
}

function hideOriginalTeamSheets() {
  Array.from(document.querySelectorAll(teamboxSelector)).forEach(container => {
    container.style.display = "none"
  })
}

function getOpponentTeam(container) {
  const teamSheet = container.querySelector('details')
  const enemysheet = teamSheet.innerHTML.split('Open Team Sheet for ')[1].split('<br>')
  return parseTeamSheet(enemysheet)
}

function repositionsOriginalElements(container) {
  const battleLog = battleLogElement(container)
  battleLog.style.top = "215px"

  const userList = battleLog.parentNode.querySelector("ul.battle-userlist")
  userList.style.top = "215px"
  userList.style.left = "640px"
}

function battleLogElement(container) {
  return container.parentNode.parentNode.parentNode
}

async function waitForElement(selector) {
  return new Promise(resolve => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector))
    }

    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        resolve(document.querySelector(selector))
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    })
  })
}

async function runUpdate() {
  await updateTeamsheet()
  setTimeout(runUpdate, 2000)
}

runUpdate()