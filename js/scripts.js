var pokemonRepository = (() => {
    var pokemonList = [];
    var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    var add = pokemon => {
        pokemonList.push(pokemon)  
    }

    var getAllPokemon = () => {
        return pokemonList;
    }

    var addListItem = (pokemon) => {
        var pokemonList = document.querySelector('.pokemon-list');
        var listItem = document.createElement('li');
        var button = document.createElement('button');
        button.innerHTML = pokemon.name;
        button.classList.add('poke-btn');
        listItem.appendChild(button);
        pokemonList.appendChild(listItem)
        button.addEventListener('click',(e)=>{
            showDetails(pokemon);
        })   
    }

    //Function to load pokemon list from API

    var loadList = () => {
        return fetch(apiUrl).then(function (response) {
          return response.json(); 
        }).then(function (json) {
          json.results.forEach(function (item) {
            var pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
          });
        }).catch(function (e) {
          console.error(e);
        })
      }

    // Function to load details for each pokemon:

      var loadDetails = (item) => {
        var url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          // Now we add the details to the item
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        }).catch(function (e) {
          console.error(e);
        });
      }

      function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
        console.log(item)
        // console.log('Your pokemon name is: ' + item.name + ' ' +' height ' + item.height + ' Image urld: ' + item.imageUrl);
    });
}

    return {
        add: add,
        getAllPokemon: getAllPokemon,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails  
    };
})();

pokemonRepository.loadList().then(function() {
    // Data is loaded
    pokemonRepository.getAllPokemon().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
  });






















//Conclusions:
// Los metodos son los que que interactuan con la info protegia en pokemonList, y son los que hacen la informacion accesible fue de la funcion. asi evitamos las consecuencias de tener global functions.
// #1 !!! en la forma de abajo primero creamos la funcion en nuestra area protegida, luego de eso, la accemos accesible a todo lo demas llamando con return, alli creamos un objeto, que llama al metodo add, que ya hemos creado con anterioridad. IIFE 