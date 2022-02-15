const poke_container = document.getElementById('poke_container');
const pokemons_number = 898;
const colors = {
    fire: '#ffcb7d',
    grass: '#abffb0',
    electric: '#fff1a8',
    water: '#a8e3ff',
    ground: '#d1bfae',
    rock: '#adadaa',
    fairy: '#f7c7ff',
    poison: '#98D7A5',
    bug: '#b9e32d',
    dragon: '#2066e6',
    psychic: '#fc35a6',
    flying: '#00f0d0',
    fighting: '#ff7088',
    normal: '#F5F5F5'
};

const main_types = Object.keys(colors);

console.log(main_types);

const fetchPokemons = async () => {
    for(let i=1; i<=pokemons_number; i++) {
        await getPokemon(i);
    }
}

const getPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    createPokemonCard(pokemon);
}

fetchPokemons();

function createPokemonCard(pokemon) {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');

    const poke_types = pokemon.types.map(el => el.type.name);
    const type = main_types.find(
        type => poke_types.indexOf(type) > -1
        );
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const color = colors[type];

    pokemonEl.style.backgroundColor = color;

    const pokeInnerHTML = `
        <div class="img-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemon.id}.png" />
        </div>
        <div class="info">
            <span class="number">N°${pokemon.id.toString().padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Tipo: <span>${type}</span></small>
            
        </div>   
    `;

    pokemonEl.innerHTML = pokeInnerHTML;

    poke_container.appendChild(pokemonEl);
}