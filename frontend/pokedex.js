//gives the count for how many Pokemon we are going to display
const pokemonCount = 151;
//object used to store about Pokemon from the PokeAPI
let pokedex = {};

//onload is what happens when the entire page finishes loading
window.onload = async function () {

//we are retrieving the data for each pokemon and updating the pokedex   
for (let i = 1; i <= pokemonCount; i++) {
    //we need to wait for the data from getPokemon in order to proceed
    await getPokemon(i)
    
    //create a div for each pokemon being created
    let pokemon = document.createElement("div");
    //give each pokemon an id property assigned to their #
    pokemon.id = i;
    //display the text to be their # and name
    pokemon.innerText = i.toString() + ". " + pokedex[i]["name"].toUpperCase();
    // if you click on a different pokemon name it re-renders the screen
    pokemon.addEventListener("click", updatePokemon);
    //give each new pokemon this class name
    pokemon.classList.add("pokemon-name");
    //append each of these pokemon as a child onto the pokemon list
    document.getElementById("pokemon-list").append(pokemon);
}
    // console.log(pokedex)
}

//this function retrieves the data thats requested for each pokemon
async function getPokemon(num) {
    //this is the URL that has the data for each pokemon
    //you need to attach the # or id to the end so that it gives you the pokemon that you want
    let url = 'https://pokeapi.co/api/v2/pokemon/' + num.toString();
    //fetch the actual data by using fetch
    //use await here because you need wait for the data in order to proceed
    let res = await fetch(url);
    //need to parse the data once it's received back into readable javascript
    //this is now your pokemon object
    let pokemon = await res.json();
    // console.log(pokemon)

    //get the specific properties needed and place them in variables
    let pokemonName = pokemon["name"]
    let pokemonType = pokemon["types"] //will return array
    let pokemonImg = pokemon["sprites"]["front_default"] //this is a pic

    res = await fetch (pokemon["species"]["url"]) //this is the desc.
    //you need to  use fetch and await here because it's another url
    let pokemonDesc = await res.json()
    // console.log(pokemonDesc)

    //pokemonDesc is now an object. access the properties that you need
    pokemonDesc = pokemonDesc["flavor_text_entries"][9]["flavor_text"]

    //add this pokemon that was just created to the pokedex
    pokedex[num] = {"name" : pokemonName, "img": pokemonImg, "types": pokemonType, "desc": pokemonDesc}
}

//functionality for when you click on a different pokemon
function updatePokemon () {
    //change the image to the image associated with the pokemon you are clicking
     document.getElementById("pokemon-img").src = pokedex[this.id]["img"]
    //assign the current pokemon-types to typeDiv
    let typeDiv = document.getElementById("pokemon-types")
    //as long as something exists in the firstchild of typediv then we delete it
    while (typeDiv.firstChild) {
        typeDiv.firstChild.remove();
    }
    //update after the previous type has been cleared out
    let types = pokedex[this.id]["types"]; //this will return an array
    for (let i = 0; i < types.length; i++) {
        //create a span for each type
        let type = document.createElement("span");
        //this is how to access the name of the type
        type.innerText = types[i]["type"]["name"].toUpperCase();
        //add a class called type-box to each type
        type.classList.add("type-box");
        //add a class for each type so you can style the background depending on what type it is
        type.classList.add (types[i]["type"]["name"]) //adds background color and font color
        //now append that type to the typeDiv which is the pokemonTypes element
        typeDiv.append(type);

    //update the description
    document.getElementById("pokemon-description").innerText = pokedex[this.id]["desc"]
    }
}

// document.getElementById('fileInput').addEventListener('change', function(event) {
//     const file = event.target.files[0];
//     const reader = new FileReader();
//     console.log("Uploading is working!")
//     reader.onload = function() {
//         const img = document.createElement('img');
//         img.src = reader.result;
//         img.classList.add('uploaded-image');
//         document.getElementById('imageContainer').appendChild(img);
//     };

//     reader.readAsDataURL(file);
// });

//on each submission all of the following must be done
document.getElementById('pokemonForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    //the value that you are retrieving is what you are typing into the text field and submitting
    const file = document.getElementById('fileInput').files[0];
    const type = document.getElementById('pokemonType').value;
    const desc = document.getElementById('pokemonDescription').value;
    const name = document.getElementById('pokemonName').value;

    // Perform card creation logic here
    createPokemonCard(file, type, desc, name);
            // Save the Pokémon card to the database
            savePokemonCardToDatabase(file, type, desc, name);
});

function createPokemonCard(file, type, desc, name) {
    const reader = new FileReader();
    console.log('displayPokemonCard works!')
    reader.onload = function() {
        const imgData = reader.result;
        // Create a Pokemon card using the uploaded image and other attributes
        displayPokemonCard(imgData, type, desc, name);

    };

    reader.readAsDataURL(file);
}



function displayPokemonCard(imgData, type, desc, name) {
    // Create a card element
    const card = document.createElement('div');
    card.classList.add('pokemon-card');
    

    // Set card content including the uploaded image, type, description, and name
    card.innerHTML = `
        <img src="${imgData}" alt="${name}">
        <h2>${name}</h2>
        <p>Type: ${type}</p>
        <p>Description: ${desc}</p>
    `;

    // Append the card to a container element
    document.getElementById('pokemonCardContainer').appendChild(card);
}

async function savePokemonCardToDatabase(file, type, desc, name) {
    console.log("Save Pokemon cards is working!")
    try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('type', type);
        formData.append('desc', desc);

        const response = await fetch('/pokemon', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to save Pokémon card to database');
        }

        const responseData = await response.json();
        console.log(responseData.message); // Log success message
    } catch (error) {
        console.error('Error saving Pokémon card to database:', error);
    }
}