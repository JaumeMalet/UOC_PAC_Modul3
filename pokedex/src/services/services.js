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
  //Obtenir informació bàsica de 10 pokemons a partir del 'id' del paràmetre
  get10PokemonsBasic( id ) {
    return pokeAPI.get(`/api/v2/pokemon?limit=10&offset=${id}`);
  },

  //Obtenir informació completa de 1 pokemon a partir del 'name'
  getPokemonInfoComplet( name ) {
    return pokeAPI.get(`/api/v2/pokemon/${name}`);
  },

  //Obtenir el número total de cartes Pokemon.
  getPokemonsTotalCount() {
    return pokeAPI.get(`/api/v2/pokemon?limit=100000&offset=0`);
  }
}