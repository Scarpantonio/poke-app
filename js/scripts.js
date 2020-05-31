
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

pokemonList.forEach(function(pokemon) {
    if(pokemon.height > 1) {
        document.write('<p>' + 'Pockemon name: ' + pokemon.name +', (height: ' + pokemon.height + ')' + ' - that is so hight!' + '</p>');
    } else
        document.write('<p>' + 'Pockemon name: ' + pokemon.name +', (height: ' + pokemon.height + ')' + '</p>');
  });
