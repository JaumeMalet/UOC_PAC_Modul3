import axios from 'axios'

const pokeAPI = axios.create({
  baseURL: 'https://pokeapi.co/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  //Obtenir informació de un Pokemon
  getPokemon( id ) {
    return pokeAPI.get(`/api/v2/pokemon/${id}`);
  },
  
  //Obtenir total de cartes Pokemon
  getPokemonCount() {
    return pokeAPI.get(`/api/v2/pokemon?limit=100000&offset=0`);
  }
}