import { createOpenTeamSheetElement } from './ots-component.js';
import { parseTeamSheet } from './team-sheet-parser.js';

function updateTeamsheet() {
  if (window.location.toString().includes("vgc")) {
    var user_selector = 'span.usernametext';
    var teambox_selector = '.infobox';

    waitForElm(user_selector).then((elm) => {
      var userObj = document.querySelector(user_selector).textContent;
      var user = userObj.substring(1, userObj.length);

      waitForElm(teambox_selector).then(async (elm) => {
        var pokemonContainers = document.querySelectorAll(teambox_selector);

        for (var j = 0; j < pokemonContainers.length; j++) {
          var container = pokemonContainers[j];

          if (container.hasAttribute("value") != true) {
            container.setAttribute("value", "done");
            container.style.borderRight = "none";

            var teamsheet = container.querySelector('details');

            if (teamsheet == null) return;

            var team_user = teamsheet.textContent.split('Open Team Sheet for ')[1].substring(0, user.length);

            if (team_user != user) {
              repositionsOriginalElements(container);

              var enemysheet = teamsheet.innerHTML.split('Open Team Sheet for ')[1].split('<br>');

              var pokemon_team = parseTeamSheet(enemysheet);
              var openTeamSheetElement = await createOpenTeamSheetElement(pokemon_team);

              var battleLog = battleLogElement(container);
              battleLog.parentNode.insertBefore(openTeamSheetElement, battleLog);
            }
          }
        }
      });
    });
  }
}

function waitForElm(selector) {
  return new Promise(resolve => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver(mutations => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        resolve(document.querySelector(selector));
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}

function repositionsOriginalElements(container) {
  var battleLog = battleLogElement(container);
  battleLog.style.top = "260px";

  var userList = battleLog.parentNode.querySelector("ul.battle-userlist");
  userList.style.top = "260px";
  userList.style.left = "640px";
}

function battleLogElement(container) {
  return container.parentNode.parentNode.parentNode
}

setInterval(updateTeamsheet, 2000);