import { removeChildren } from "../utils/index.js";

const getAPIData = async (url) => {
  try {
    const result = await fetch(url);
    return await result.json();
  } catch (error) {
    console.error(error);
  }
};

class Pokemon {
  constructor(name, height, weight, abilities, types) {
    (this.id = 2022),
      (this.name = name),
      (this.height = height),
      (this.weight = weight),
      (this.abilities = abilities),
      (this.types = types);
  }
}

const pokeHeader = document.querySelector("header");
const pokeGrid = document.querySelector(".pokeGrid");
const newButton = document.createElement("button");
newButton.textContent = "New Pokemon";
pokeHeader.appendChild(newButton);
newButton.addEventListener("click", () => {
  const pokeName = prompt("Name your new Pokemon!", "Pokey McPokeface");
  const pokeHeight = prompt("How tall is your new Pokemon?", 100);
  const pokeWeight = prompt("What is the weight of your new Pokemon?", 1000);
  const pokeAbilities = prompt(
    "What moves does your new pokemone have? (use a comma to separate moves)"
  );
  const pokeTypes = prompt(
    "Pick two types for your new Pokemon! (up to two types separated by a space)"
  );

  const newPokemon = new Pokemon(
    pokeName,
    pokeHeight,
    pokeWeight,
    makeAbilitiesArray(pokeAbilities),
    makeTypesArray(pokeTypes)
  );
  console.log(newPokemon);
  populatePokeCard(newPokemon);
});

function makeAbilitiesArray(commaString) {
  return commaString.split(",").map((abilityName) => {
    return { ability: { name: abilityName } };
  });
}

function makeTypesArray(spacedString) {
  return spacedString.split(" ").map((typeName) => {
    return { type: { name: typeName } };
  });
}

const loadedPokemon = [];

async function loadPokemon(offset = 0, limit = 25) {
  const data = await getAPIData(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  );
  for (const nameAndUrl of data.results) {
    const singlePokemon = await getAPIData(nameAndUrl.url);
    const simplifiedPokemon = {
      id: singlePokemon.id,
      height: singlePokemon.height,
      weight: singlePokemon.weight,
      name: singlePokemon.name,
      abilities: singlePokemon.abilities,
      types: singlePokemon.types,
      moves: singlePokemon.moves.slice(0, 3),
    };
    loadedPokemon.push(simplifiedPokemon);
    populatePokeCard(singlePokemon);
  }
}

function populatePokeCard(pokemon) {
  const pokeScene = document.createElement("div");
  pokeScene.className = "scene";
  const pokeCard = document.createElement("div");
  pokeCard.className = "card";
  pokeCard.addEventListener("click", () =>
    pokeCard.classList.toggle("is-flipped")
  );
  // populate front of card
  pokeCard.appendChild(populateCardFront(pokemon));
  pokeCard.appendChild(populateCardBack(pokemon));
  pokeScene.appendChild(pokeCard);
  pokeGrid.appendChild(pokeScene);
}

function populateCardFront(pokemon) {
  const pokeFront = document.createElement("figure");
  pokeFront.className = "cardFace front";
  const pokeType = pokemon.types[0].type.name;
  const pokeType2 = pokemon.types[1]?.type.name;
  console.log(pokeType);
  pokeFront.style.setProperty("background", getPokeTypeColor(pokeType));

  if (pokeType2) {
    pokeFront.style.setProperty(
      "background",
      `linear-gradient(${getPokeTypeColor(pokeType)}, ${getPokeTypeColor(
        pokeType2
      )})`
    );
  }

  const pokeImg = document.createElement("img");
  if (pokemon.id === 2022) {
    pokeImg.src = "../images/masterBall.png";
  } else {
    pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  }
  const pokeCaption = document.createElement("figcaption");
  pokeCaption.textContent = pokemon.name;

  pokeFront.appendChild(pokeImg);
  pokeFront.appendChild(pokeCaption);
  return pokeFront;
}

function populateCardBack(pokemon) {
  const pokeBack = document.createElement("div");
  pokeBack.className = "cardFace back";
  const label = document.createElement("h4");
  label.textContent = "Abilities";
  pokeBack.appendChild(label);

  const abilityList = document.createElement("ul");
  pokemon.abilities.forEach((abliityItem) => {
    const listItem = document.createElement("li");
    listItem.textContent = abliityItem.ability.name;
    abilityList.appendChild(listItem);
  });
  const typeslist = document.createElement("ol");
  pokemon.types.forEach((pokeType) => {
    let typeItem = document.createElement("li");
    typeItem.textContent = pokeType.type.name;
    typeslist.appendChild(typeItem);
  });
  pokeBack.appendChild(abilityList);
  pokeBack.appendChild(typeslist);

  return pokeBack;

  
}

function getPokeTypeColor(pokeType) {
  let color;
  switch (pokeType) {
    case "grass":
      color = "#7AC74C";
      break;
    case "water":
      color = "#6390F0";
      break;
    case "bug":
      color = "#A6B91A";
      break;
    case "normal":
      color = "#A8A77A";
      break;
    case "fire":
      color = "#EE8130";
      break;
    case "flying":
      color = "#A98FF3";
      break;
    case "poison":
      color = "#A33EA1";
      break;
    case "electric":
      color = "#F7D02C";
      break;
    case "psychic":
      color = "#F95587";
      break;
    case "ground":
      color = "#E2BF65";
      break;
    case "fairy":
      color = "#D685AD";
      break;
    case "fighting":
      color = "#C22E28";
      break;
    case "rock":
      color = "#B6A136";
      break;
    case "ghost":
      color = "#735797";
      break;
    case "ice":
      color = "#96D9D6";
      break;
    case "dragon":
      color = "#6F35FC";
      break;
    case "dark":
      color = "#705746";
      break;
    case "steel":
      color = "#B7B7CE";
      break;
    default:
      color = "#888888";
  }
  return color;
}

function filterPokemonByType(type) {
  return loadedPokemon.filter((pokemon) => pokemon.types[0].type.name === type);
}

await loadPokemon(0, 151);

const typeSelect = document.querySelector('.typeSelect')
typeSelect.addEventListener('change', (event) => {
  const usersTypeChoice = event.target.value.toLowerCase()
  const pokemonByType = filterPokemonByType(usersTypeChoice)
  removeChildren(pokeGrid)
  pokemonByType.forEach((singlePokemon) => populatePokeCard(singlePokemon))
})
