import { createOpenTeamSheetElement } from './ots-component.js';
import { parseTeamSheet } from './team-sheet-parser.js';

async function updateTeamsheet() {
  if (window.location.toString().includes("vgc")) {
    var userName = await getUsername()
    var container = await getOpponentContainer(userName)

    if (container == null) return

    container.setAttribute("value", "done")

    repositionsOriginalElements(container)

    var pokemonTeam = getOpponentTeam(container)
    var openTeamSheetElement = await createOpenTeamSheetElement(pokemonTeam)

    var battleLog = battleLogElement(container)
    battleLog.parentNode.insertBefore(openTeamSheetElement, battleLog)
  }
}

async function getUsername() {
  const userNameElement = await waitForElement('span.usernametext')

  return userNameElement.textContent.trim()
}

async function getOpponentContainer(userName) {
  var teamboxSelector = '.infobox'
  await waitForElement(teamboxSelector)

  var constainers = Array.from(document.querySelectorAll(teamboxSelector))

  return constainers.filter(container => {
    var teamSheet = container.querySelector('details')

    if (teamSheet == null) return

    var teamUser = teamSheet.textContent.split('Open Team Sheet for ')[1].substring(0, userName.length)

    return teamUser != userName && !container.hasAttribute("value")
  })[0]
}

function getOpponentTeam(container) {
  var teamSheet = container.querySelector('details')
  var enemysheet = teamSheet.innerHTML.split('Open Team Sheet for ')[1].split('<br>')
  return parseTeamSheet(enemysheet)
}

function repositionsOriginalElements(container) {
  var battleLog = battleLogElement(container)
  battleLog.style.top = "260px"

  var userList = battleLog.parentNode.querySelector("ul.battle-userlist")
  userList.style.top = "260px"
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