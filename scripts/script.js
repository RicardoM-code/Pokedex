const pokemonNumber = document.querySelector('.pokemon_number')
const pokemonName = document.querySelector('.pokemon_name')
const pokemonImg = document.querySelector('.pokemon_img')

const form = document.querySelector('.form')
const input = document.querySelector('.input_search')

const btnPrev = document.querySelector('.btn-prev')
const btnNext = document.querySelector('.btn-next')


let searchPokemom = 1

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
  if (APIResponse.status === 200){
    const data = await APIResponse.json()

    return data
  }
}

const renderPokemon = async (pokemon) =>{

    pokemonName.innerHTML ='Carregando...'

    const data = await fetchPokemon(pokemon)

    if(data){
        pokemonName.innerHTML = data.name
        pokemonNumber.innerHTML = data.id
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['front_default']
    
        input.value=''
        searchPokemom = data.id
    }else{
        pokemonName.innerHTML = 'Não encontrado'
        pokemonNumber.innerHTML = ''
        pokemonImg.src = './images/missingno.gif'
    }


}

form.addEventListener('submit', (event) =>{
    event.preventDefault()
    renderPokemon(input.value.toLowerCase())
})

btnPrev.addEventListener('click', () =>{
    if(searchPokemom > 1){
        searchPokemom -= 1
        renderPokemon(searchPokemom)
    }

})

btnNext.addEventListener('click', () =>{
    if(searchPokemom < 1017){
        searchPokemom += 1
        renderPokemon(searchPokemom)
    }
 
})

renderPokemon(searchPokemom)
