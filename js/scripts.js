var pokemonRepository = (() => {
    var pokemonList = [
        {
            name:'Bulbasaur',
            height: 0.7,
            type:['grass','poison']
        },
        {
            name:'Venusaur',
            height: 2,
            type:['grass','poison']
        },
        {
            name:'charizard',
            height: 1.7,
            type:['fire','flying']
        }
    ];

    var add = pokemon => {
        pokemonList.push(pokemon)  
    }

    var getAllPokemon = () => {
        return pokemonList;
    }

    return {
        add: add,
        getAllPokemon: getAllPokemon
    };
})();

console.log(pokemonRepository.getAllPokemon()); 
pokemonRepository.add({ name: 'Pikachu', height: 0.5 });
console.log(pokemonRepository.getAllPokemon()); 

pokemonRepository.getAllPokemon().forEach( pokemon => {
    if(pokemon.height > 1) {
        document.write('<p>' + 'Pockemon name: ' + pokemon.name +', (height : ' + pokemon.height + ')' + ' - that is so hight!' + '</p>');
    } else
        document.write('<p>' + 'Pockemon name: ' + pokemon.name +', (height: ' + pokemon.height + ')' + '</p>');
});










//Conclusions:
// Los metodos son los que que interactuan con la info protegia en pokemonList, y son los que hacen la informacion accesible fue de la funcion. asi evitamos las consecuencias de tener global functions.
// #1 !!! en la forma de abajo primero creamos la funcion en nuestra area protegida, luego de eso, la accemos accesible a todo lo demas llamando con return, alli creamos un objeto, que llama al metodo add, que ya hemos creado con anterioridad. IIFE 