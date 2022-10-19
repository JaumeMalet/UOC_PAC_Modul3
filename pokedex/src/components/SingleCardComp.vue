<script setup>
    import {ref, onMounted} from 'vue' 
    import pokeAPI from '@/services/services.js'
    
    const props = defineProps(['pokemonId'])
    const pokeInfo = ref({})
    const pokeNom = ref("")
    const pokeImatgeFront = ref("")
    const pokeAtac = ref("")
    const pokeDefensa = ref("")
    
    //props.pokemonId
    pokeAPI.getPokemon( props.pokemonId ).then( (response) => {
        console.log(response.data)
        pokeInfo.value = response.data
        pokeNom.value = pokeInfo.value.name
        pokeImatgeFront.value = pokeInfo.value.sprites.front_default
        pokeAtac.value = pokeInfo.value.stats[1].base_stat
        pokeDefensa.value = pokeInfo.value.stats[2].base_stat
        })
</script>

<template>
  <!-- Plantilla d'una carta Pokemon -->
  <div class="card">
    <h2>{{ pokeNom }}</h2>
    <img alt="" :src="pokeImatgeFront" class="card-imatge" />
    <h3 class="card-atac">Atac: {{ pokeAtac }} </h3>
    <h3 class="card-defensa">Defensa: {{ pokeDefensa }}</h3>
  </div>
</template>

<style scoped>
</style>
