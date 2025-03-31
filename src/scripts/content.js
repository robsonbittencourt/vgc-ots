import { createOpenTeamSheetElement } from './ots-component.js';

function updateTeamsheet() {
  if (window.location.toString().includes("vgc")) {
    var user_selector = 'span.usernametext';
    var teambox_selector = teamBoxSelector();

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

function add_accept_listener() {
  var accept_teamsheet_button_selector = 'button[value="/acceptopenteamsheets"]';
  waitForElm(accept_teamsheet_button_selector).then((elm) => {
    var buttons = document.querySelectorAll(accept_teamsheet_button_selector);

    for (var i = 0; i < buttons.length; i++) {
      button = buttons[i];

      button.addEventListener('click', function () {
        updateTeamsheet();
      });
    }
  });
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

function parseTeamSheet(enemysheet) {
  var pokemon_team = []

  var current_pokemon = {
    name: '',
    nickname: '',
    item: '',
    ability: '',
    level: '',
    tera: '',
    move1: '',
    move2: '',
    move3: '',
    move4: ''
  };

  for (var i = 0; i < enemysheet.length; i++) {
    var line = enemysheet[i];
    line = line.replace(' (M)', '').replace(' (F)', '');

    if (line.includes('@')) {
      if (current_pokemon.name != '') {
        pokemon_team.push(current_pokemon);
        current_pokemon = {
          name: '',
          nickname: '',
          item: '',
          ability: '',
          level: '',
          tera: '',
          move1: '',
          move2: '',
          move3: '',
          move4: ''
        };
      }
      if (line.includes("</summary>")) {
        line = line.split("</summary>")[1];
      }
      current_pokemon.name = line.split('@')[0].trim();
      if (current_pokemon.name.includes('(')) {
        current_pokemon.nickname = current_pokemon.name.split('(')[0].trim();
        current_pokemon.name = current_pokemon.name.split('(')[1];
        current_pokemon.name = current_pokemon.name.substring(0, current_pokemon.name.length - 1);
      }
      current_pokemon.item = line.substring(line.indexOf('@') + 1, line.indexOf('<')).trim();
    } else if (line.includes('Ability: ')) {
      current_pokemon.ability = line.split('Ability: ')[1].trim();
    } else if (line.includes('Level: ')) {
      current_pokemon.level = line.split('Level: ')[1].trim();
    } else if (line.includes('Tera Type: ')) {
      current_pokemon.tera = line.split('Tera Type: ')[1].trim();
    } else if (line.includes('- ')) {
      if (current_pokemon.move1 == '') {
        current_pokemon.move1 = line.split('- ')[1].trim();
      }
      else if (current_pokemon.move2 == '') {
        current_pokemon.move2 = line.split('- ')[1].trim();
      }
      else if (current_pokemon.move3 == '') {
        current_pokemon.move3 = line.split('- ')[1].trim();
      }
      else if (current_pokemon.move4 == '') {
        current_pokemon.move4 = line.split('- ')[1].trim();
      }
    }
  }

  if (current_pokemon.name != '') {
    pokemon_team.push(current_pokemon);
  }

  return pokemon_team;
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

function teamBoxSelector() {
  var teambox_selector = '.notice.uhtml-ots .infobox';

  if (window.location.toString().includes("bo3")) {
    teambox_selector = '.infobox';
  }

  return teambox_selector;
}

setInterval(updateTeamsheet, 2000);
add_accept_listener();