var pokemonRepository = (() => {
    var pokemonList = [];
    var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    var add = pokemon => {
        pokemonList.push(pokemon)  
    }

    var getAllPokemon = () => {
        return pokemonList;
    }

    // Hide modal
    function hideModal() {
        var modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }

    // to close modal - ESC key
    window.addEventListener('keydown', (e) => {
        var modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();  
        }
    });

    // Open modal
    var showModal = (item) => {
        var modalContainer = document.querySelector('#modal-container');
      
        // Clear all existing modal content
        modalContainer.innerHTML = '';
        modalContainer.classList.add('is-visible');
      
        var modal = document.createElement('div');
        modal.classList.add('modal');
      
        // Add the new modal content
        var closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'X';
        closeButtonElement.addEventListener('click', hideModal);

        // creating title in modal content
        var titleElement = document.createElement('h1');
        titleElement.classList.add('poke-name-title');
        titleElement.innerText = item.name;
      
        // creating height in modal content
        var contentElement = document.createElement('p');
        contentElement.innerText = 'Pokemon height: ' + item.height;

        // creating img in modal content
        var renderImg = document.createElement('img');
        renderImg.src = item.imageUrl

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(renderImg);
        modalContainer.appendChild(modal);
      }
    
    var addListItem = (pokemon) => {
        var pokemonList = document.querySelector('.pokemon-list');
        var listItem = document.createElement('li');
        var button = document.createElement('button');
        button.innerHTML = pokemon.name;
        button.classList.add('poke-btn');
        listItem.appendChild(button);
        pokemonList.appendChild(listItem)
        button.addEventListener('click',(e) => {
            showDetails(pokemon);
            // showModal()
        })   
    }


    var loadList = () => {
        return fetch(apiUrl).then(function (response) {
          return response.json(); 
        }).then(function (json) {
          json.results.forEach(function (item) {
        // Ahora de aqui viene el nombre, q agarra el argumento de pokemon que ya esta arriba declarado como pokemon.  
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
    
    // This function takes each pokemon as a item. 
      var loadDetails = (item) => {
        var url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          // Now we add the details to the item
          // Aqui podemos empezar a desglozar porque item. porque sabemos los nombre de los keys que posee el objeto.  
          item.imageUrl = details.sprites.front_default; // analizar este
          item.height = details.height;   // entender bien de donde salen estos. item.height etc. 
          item.types = details.types;
        }).catch(function (e) {
          console.error(e);
        });
      }

      function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
        console.log(item)
        showModal(item)
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