let anterior = null
let siguiente = null
const lista_pokemones = document.querySelector('.lista-pokemones')
const boton_anterior = document.getElementById('anterior')
const boton_siguiente = document.getElementById('siguiente')

const buscar = async (url) => {
    lista_pokemones.innerHTML = ''
    const response = await fetch(url)
    const pokemones = await response.json()
    console.log(pokemones)
    anterior = pokemones.previous
    siguiente = pokemones.next
    habilitar_botones()
    pokemones.results.forEach(pokemon => {
        console.log(pokemon)
        mostrar_pokemon(pokemon)
    });
}
const habilitar_botones = () => {
    if (anterior === null) {
        boton_anterior.disabled = true
        boton_anterior.classList.add('disabled')
    } else {
        boton_anterior.disabled = false
        boton_anterior.classList.remove('disabled')

    }
    if (siguiente === null) {
        boton_siguiente.disabled = true
        boton_siguiente.classList.add('disabled')
    } else {
        boton_siguiente.disabled = false
        boton_siguiente.classList.remove('disabled')

    }
}
const mostrar_pokemon = async (pokemon) => {
    const url = pokemon.url
    const response = await fetch(url)
    const datos = await response.json()
    const imagen = document.createElement('img')
    imagen.setAttribute('src', datos.sprites.front_default)

    const card = document.createElement('div')
    card.classList.add('card')

    const h2 = document.createElement('h2')
    const texto = document.createTextNode(`${pokemon.name}`)
    h2.appendChild(texto)
    card.appendChild(imagen)
    card.appendChild(h2)
    lista_pokemones.appendChild(card)
}


buscar("Https://pokeapi.co/api/v2/pokemon")

boton_anterior.addEventListener('click',()=>{
buscar(anterior)

})
boton_siguiente.addEventListener('click',()=>{
    buscar(siguiente)
    
    })