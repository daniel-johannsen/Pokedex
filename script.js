let currentPokemon;
let allPokemon = [];
let pokemonNumber;

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
        pokemonNumber = allPokemon[i];
        let newUrl = pokemonNumber['url'];
        let response = await fetch(newUrl);
        currentPokemon = await response.json();
        createInfoBox(currentPokemon);
    }
}

function createInfoBox(currentPokemon) {
    document.getElementById('pokedex').innerHTML += `
    <div id="box${pokemonNumber}" onclick="showStats(${currentPokemon})">
        <div class="name">${currentPokemon['name']}</div>
        <div class="type"></div>
        <div class="img">${currentPokemon['sprites']['front_shiny']}</div>
        <div class="stats_top">Stats</div>
        <div class="stats d-none" id="stats"></div>
    </div>
    `;
}

function showStats(currentPokemon) {
    document.getElementById('stats').innerHTML += `
    <div class="stats_element">
        <div class="stats_left"></div>
        <div class="stats_right"></div>
    </div>
    <div class="stats_element">
        <div class="stats_left"></div>
        <div class="stats_right"></div>
    </div>
    <div class="stats_element">
        <div class="stats_left"></div>
        <div class="stats_right"></div>
    </div>
    <div class="stats_element">
        <div class="stats_left"></div>
        <div class="stats_right"></div>
    </div>
    <div class="stats_element">
        <div class="stats_left"></div>
        <div class="stats_right"></div>
    </div>
    <div class="stats_element">
        <div class="stats_left"></div>
        <div class="stats_right"></div>
    </div>
    `;
}