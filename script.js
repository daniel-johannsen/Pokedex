let currentPokemon;
let allPokemon = [];
let pokemonNames = [];
let dataList = document.getElementById('pokemon');

async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon/';
    let response = await fetch(url);
    let apiAsJson = await response.json();
    allPokemon = apiAsJson['results'];
    console.log('Loaded Pokemon:', allPokemon);

    renderPokemonInfo();
}

async function renderPokemonInfo() {
    for (let i = 0; i < allPokemon.length; i++) {
        let element = allPokemon[i];
        let newUrl = element['url'];
        let response = await fetch(newUrl);
        currentPokemon = await response.json();
        console.log('currentPokemon', currentPokemon);
        createInfoBox(i);
        let name = {
            'name': currentPokemon['name'],
            'id': `box${i}`
        };
        pokemonNames.push(name);
    }
}

pokemonNames.forEach(function(item) {
    let option = document.createElement('option');
    option.value = item;
    dataList.appendChild(option);
});


function createInfoBox(i) {
    document.getElementById('pokedex').innerHTML += `
    <div id="box${i}" class="box zoom bg_${currentPokemon['types'][0]['type']['name']}" onclick="showStats(${i})">
        <div class="name">${capitalizeFirstLetter(currentPokemon['name'])}</div>
        <div class="img"><img src="${currentPokemon['sprites']['front_shiny']}"></div>
        <div class="type">${currentPokemon['types'][0]['type']['name']}</div>
        <div class="stats_top borders_bottom" id="statsTop${i}">Stats</div>
        <div class="stats borders_bottom d-none" id="stats${i}">
            <div class="stats_element">
                <div class="stats_left">${currentPokemon['stats'][0]['stat']['name']}</div>
                <div class="stats_right"><div id="progressBar" class="progress-bar" role="progressbar" style="width: ${currentPokemon['stats'][0]['base_stat']}%;">${currentPokemon['stats'][0]['base_stat']}%</div></div>
            </div>
            <div class="stats_element">
                <div class="stats_left">${currentPokemon['stats'][1]['stat']['name']}</div>
                <div class="stats_right"><div id="progressBar" class="progress-bar" role="progressbar" style="width: ${currentPokemon['stats'][1]['base_stat']}%;">${currentPokemon['stats'][1]['base_stat']}%</div></div>
            </div>
            <div class="stats_element">
                <div class="stats_left">${currentPokemon['stats'][2]['stat']['name']}</div>
                <div class="stats_right"><div id="progressBar" class="progress-bar" role="progressbar" style="width: ${currentPokemon['stats'][2]['base_stat']}%;">${currentPokemon['stats'][2]['base_stat']}%</div></div>
            </div>
            <div class="stats_element">
                <div class="stats_left">${currentPokemon['stats'][3]['stat']['name']}</div>
                <div class="stats_right"><div id="progressBar" class="progress-bar" role="progressbar" style="width: ${currentPokemon['stats'][3]['base_stat']}%;">${currentPokemon['stats'][3]['base_stat']}%</div></div>
            </div>
            <div class="stats_element">
                <div class="stats_left">${currentPokemon['stats'][4]['stat']['name']}</div>
                <div class="stats_right"><div id="progressBar" class="progress-bar" role="progressbar" style="width: ${currentPokemon['stats'][4]['base_stat']}%;">${currentPokemon['stats'][4]['base_stat']}%</div></div>
            </div>
            <div class="stats_element">
                <div class="stats_left">${currentPokemon['stats'][5]['stat']['name']}</div>
                <div class="stats_right"><div id="progressBar" class="progress-bar" role="progressbar" style="width: ${currentPokemon['stats'][5]['base_stat']}%;">${currentPokemon['stats'][5]['base_stat']}%</div></div>
            </div>
        </div>
    </div>
    `;
}

function showStats(i) {
    document.getElementById(`stats${i}`).classList.toggle('d-none');
    document.getElementById(`statsTop${i}`).classList.toggle('borders_bottom');
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function filterNames() {
    let input = document.getElementById('search');
    input = input.value.toLowerCase();

    for (let j = 0; j < pokemonNames.length; j++) {
        let element = pokemonNames[j];
        let name = element['name'];

        if (!name.includes(input)) {
            document.getElementById(name['id']).classList.add('d-none');
        }
    }
}