<script setup>
    import {ref, onMounted} from 'vue'

    const PokemonsInfo = ref([])
    const Id = ref(0)
    const Tipus = ref("")
    const bCarregat = ref(false)

    //Recuperar informació dels pokemons
    PokemonsInfo.value = JSON.parse(localStorage.getItem("PokemonsInfo"))
    //Obtenir l' Id del pokemon de la URL
    const PokeId = window.location.href.split('/')[window.location.href.split('/').length - 1]
    //Obtenir l'index de l'array PokemonsInfo que coincideix amb la Id del pokemon de la URL
    for (let index = 0; index < PokemonsInfo.value.length; index++) {
        if(Number(PokemonsInfo.value[index].id) === Number(PokeId)){
            Id.value = index
            break   //Un cop s'ha trobat no cal continuar fent el bucle
        }
    }
    //Obtenir text amb tots els noms del tipus separats per comes del pokemon determinat
    for (let index = 0; index < PokemonsInfo.value[Id.value].tipus.length; index++) {
        if(index > 0) Tipus.value += ", "   //Afegim coma entre noms tipus
        Tipus.value += PokemonsInfo.value[Id.value].tipus[index].type.name;
    }
    //Flag per indicar que s'ha obtingut l'informació
    bCarregat.value = true

</script>

<template>
    <div>
        <section class="title">
            <h1>Pokedex</h1>
        </section>
        <div id="loading" v-if="!bCarregat">
            <img alt="loading" src="../assets/img/loading.gif" />
        </div>
        <section>
            <!-- Plantilla d'una carta Pokemon Extesa -->
            <div class="card_ext">
                <h2> {{ PokemonsInfo[Id].nom }} </h2>
                <div id="imatges">
                    <img alt="" v-bind:src="PokemonsInfo[Id].imatgeFront" />
                    <img alt="" v-bind:src="PokemonsInfo[Id].imatgeBack" />
                </div>
                <h3>Atac: {{ PokemonsInfo[Id].atac }} </h3>
                <h3>Defensa: {{ PokemonsInfo[Id].defensa }} </h3>
                <h3 class="card_ext-tipus">Tipus: {{ Tipus }} </h3>
            </div>
        </section>
        <div>
            <button id="back" v-on:click="$router.push({name:'home'})">Tornar</button> <!-- Enllaç per tornar enrera -->
        </div>    
    </div>
</template>
