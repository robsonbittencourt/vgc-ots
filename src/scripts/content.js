import { createOpenTeamSheetElement } from './ots-component.js';
import { parseTeamSheet } from './team-sheet-parser.js';

async function updateTeamsheet() {
  if (window.location.toString().includes("vgc")) {
    var userName = await getUsername()
    var containers = await getContainers()

    for (var j = 0; j < containers.length; j++) {
      var container = containers[j]

      if (container.hasAttribute("value") != true) {
        container.setAttribute("value", "done")
        container.style.borderRight = "none"

        var teamsheet = container.querySelector('details')

        if (teamsheet == null) return

        var team_user = teamsheet.textContent.split('Open Team Sheet for ')[1].substring(0, userName.length)

        if (team_user != userName) {
          repositionsOriginalElements(container)

          var enemysheet = teamsheet.innerHTML.split('Open Team Sheet for ')[1].split('<br>')

          var pokemon_team = parseTeamSheet(enemysheet)
          var openTeamSheetElement = await createOpenTeamSheetElement(pokemon_team)

          var battleLog = battleLogElement(container)
          battleLog.parentNode.insertBefore(openTeamSheetElement, battleLog)
        }
      }
    }
  }
}

async function getUsername() {
  const userNameElement = await waitForElm('span.usernametext')

  return userNameElement.textContent.trim()
}

async function getContainers() {
  var teamboxSelector = '.infobox'
  await waitForElm(teamboxSelector)

  return document.querySelectorAll(teamboxSelector)
}

async function waitForElm(selector) {
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

async function runUpdate() {
  await updateTeamsheet()
  setTimeout(runUpdate, 2000)
}

runUpdate()