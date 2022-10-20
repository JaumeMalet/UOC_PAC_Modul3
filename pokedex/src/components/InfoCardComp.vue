<script setup>
    import {ref} from 'vue'

    const PokemonsInfo = ref([])
    const Id = ref(0)
    const Tipus = ref("")

    //Recuperar informació dels pokemons
    PokemonsInfo.value = JSON.parse(localStorage.getItem("PokemonsInfo"))
    //Obtenir el Id del pokemon de la URL
    const PokeId = window.location.href.split('/')[window.location.href.split('/').length - 1]
    console.log(PokeId)
    //Obtenir l'index de l'array PokemonsInfo que coincideix amb la Id del pokemon de la URL
    for (let index = 0; index < PokemonsInfo.value.length; index++) {
      console.log(PokemonsInfo.value[index].id)
      if(PokemonsInfo.value[index].id === PokeId){
        Id.value = index
        break
      }
    }

    //Obtenir text amb tots els noms del tipus separats per comes
    for (let index = 0; index < PokemonsInfo.value[Id.value].tipus.length; index++) {
        if(index > 0) tipus += ", "
        Tipus.value += PokemonsInfo.value[Id.value].tipus[index].type.name;
    }
</script>

<template>
  <section>
    <!-- Plantilla d'una carta Pokemon Extesa -->
    <div class="card_ext">
        <h2> {{ PokemonsInfo[Id].nom }} </h2>
        <div id="imatges">
            <img alt="" :src="PokemonsInfo[Id].imatgeFront" />
            <img alt="" :src="PokemonsInfo[Id].imatgeBack" />
        </div>
        <h3>Atac: {{ PokemonsInfo[Id].atac }} </h3>
        <h3>Defensa: {{ PokemonsInfo[Id].defensa }} </h3>
        <h3 class="card_ext-tipus">Tipus: {{ Tipus }} </h3>
    </div>
    <div>
        <button id="back" @click="$router.push({name:'index'})">Tornar</button> <!-- Enllaç per tornar enrera -->
    </div>
  </section>
</template>

<style scoped>
</style>
