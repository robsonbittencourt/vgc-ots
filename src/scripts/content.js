function updateTeamsheet() {
  var gameNumber = getGameNumber();
  var pokemonListId = `pokemon-list-${gameNumber}`;
  var listExists = document.getElementById(pokemonListId) != null;

  if (window.location.toString().includes("vgc") && !listExists) {
    var user_selector = 'span.usernametext';
    var teambox_selector = '.notice.uhtml-ots .infobox';

    if (window.location.toString().includes("bo3")) {
      teambox_selector = '.infobox';
    }

    waitForElm(user_selector).then((elm) => {
      var userObj = document.querySelector(user_selector).textContent;
      var user = userObj.substring(1, userObj.length);

      waitForElm(teambox_selector).then((elm) => {
        var pokemonContainers = document.querySelectorAll(teambox_selector);

        for (var j = 0; j < pokemonContainers.length; j++) {

          var container = pokemonContainers[j];
          container.style.borderRight = "none";

          var teamsheet = container.querySelector('details');
          var team_user = teamsheet.textContent.split('Open Team Sheet for ')[1].substring(0, user.length);

          if (team_user != user) {

            var enemysheet = teamsheet.innerHTML.split('Open Team Sheet for ')[1].split('<br>');

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

            var pokemonList = document.createElement('div');
            pokemonList.id = `pokemon-list-${gameNumber}`;
            pokemonList.innerHTML = '';
            pokemonList.className = "pokemon-container";
            pokemonList.style.padding = '10px';

            for (const pokemon of pokemon_team) {
              const pokemonDiv = document.createElement('div');

              var imlink = linkImage(pokemon.name);
              var backuplink = linkBackup(pokemon.name);
              var itemlink = linkItem(pokemon.item);
              var teracolor = colorType(pokemon.tera);

              pokemonDiv.className = 'pokemon-card';
              pokemonDiv.innerHTML = `
                  <div class="image-container" width=80px height=80px>
                    <img src=${imlink} alt=${pokemon.name} onerror="if (this.src!='${backuplink}') this.src='${backuplink}';" width=80px height=80px class=poke-image>
                    <img src=${itemlink} alt=${pokemon.item} width=30px height=32px class=item-image>
                  </div>
                  <p style="background-color:${teracolor}">${pokemon.tera}</p>
                  <p style="margin-bottom:2px;font-size:10px"><strong>${pokemon.ability}</strong></p>
                  <p style="margin-bottom:2px;font-size:10px">${pokemon.move1}</p>
                  <p style="margin-bottom:2px;font-size:10px">${pokemon.move2}</p>
                  <p style="margin-bottom:2px;font-size:10px">${pokemon.move3}</p>
                  <p style="margin-bottom:2px;font-size:10px">${pokemon.move4}</p>
                `;
              pokemonList.appendChild(pokemonDiv);
            }

            var teambox = document.querySelector(teambox_selector)

            var battleLog = teambox.parentNode.parentNode.parentNode;
            battleLog.style.top = "260px";

            var userList = battleLog.parentNode.querySelector("ul.battle-userlist");
            userList.style.top = "260px";
            userList.style.left = "640px";

            battleLog.parentNode.insertBefore(pokemonList, battleLog);
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

function getGameNumber() {
  const element = document.querySelector(".notice.uhtml-bestof h2 strong");
  return element ? element.textContent.trim().toLowerCase().replaceAll(" ", "") : null;
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

function pageObserver() {
  if (!window.teamsheetObserver) {
    const targetNode = document.body;
    const config = { childList: true, subtree: true };

    window.teamsheetObserver = new MutationObserver((mutations) => {
      updateTeamsheet();
    });

    window.teamsheetObserver.observe(targetNode, config);
  }
}

pageObserver();
add_accept_listener();