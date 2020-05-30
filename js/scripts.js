
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

for (var i = 0; i < pokemonList.length; i++) {
    if(pokemonList[i].height > 1) {
        document.write('Pockemon name: ' + pokemonList[i].name + ', height:  ' + pokemonList[i].height + '- that is so hight! ')    
    } else
        document.write('Pockemon name: ' + pokemonList[i].name + ',  height: ' + pokemonList[i].height + ' /' + ' ')
  }
