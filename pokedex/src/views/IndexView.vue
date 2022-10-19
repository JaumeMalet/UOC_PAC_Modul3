<script setup>
    import {ref, onMounted} from 'vue'
    import pokeAPI from '@/services/services.js'
    import SingleCardComp from '@/components/SingleCardComp.vue'
    
    const aPokemonIds = ref([])

    onMounted(() => {
        console.log("IndexView Mounted")
        // Obtenir el número de cartes pokemon existents a l'API
        pokeAPI.getPokemonCount().then((response) => {
            const PokemonCount = response.data.count
            // obtenir 10 números a l'atzar i no repetits
            do {
                let PokemonId = Math.floor(Math.random() * PokemonCount)
                if(!(aPokemonIds.value.includes(PokemonId))){
                    aPokemonIds.value.push(PokemonId)
                } 
            } while (aPokemonIds.value.length < 10);
            console.log(aPokemonIds.value)
        })
    })
</script>

<template>
    <div>
        <section class="title">
            <h1>Pokedex</h1>
        </section>
        <div id="loading">
            <!-- <img alt="loading" src="../assets/img/loading.gif" /> -->
        </div>
        <section>
            <div id="card-table">
                <div v-for="Id in aPokemonIds" :key="Id">
                    <SingleCardComp :pokemonId="Id" />
                </div>
            </div>
        </section>
        <section>
            <div id="card_ext"></div>
        </section>    
    </div>
</template>
