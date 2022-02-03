let currentPokemon;

async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon/pikachu';
    let response = await fetch(url);
    currentPokemon = await response.json();

    console.log('Loaded Pokemon:', currentPokemon);

    renderPokemonInfo();
}

function renderPokemonInfo() {
    document.getElementById('pokemonName').innerHTML = currentPokemon['name'];
    renderPokemonImage();
}

function renderPokemonImage() {
    let image = document.createElement('img');
    image.src = currentPokemon['sprites']['front_shiny'];
    document.getElementById('img').appendChild(image);
}