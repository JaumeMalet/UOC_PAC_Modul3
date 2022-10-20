<script setup>
    import {ref, onMounted} from 'vue'
    import pokeAPI from '@/services/services.js'
    import MultipleCardsComp from '@/components/MultipleCardsComp.vue'

    onMounted(() => {
        // Obtenir el número de cartes pokemon existents a l'API
        pokeAPI.getPokemonsTotalCount().then((response) => {
            //Restem 10 al valor total per evitar que surti un id massa alt i es mostrin menys de 10 cartes
            const Count = response.data.count - 10
            // obtenir 1 número a l'atzar per obtenir 10 cartes pokemon
            const Id = Math.floor(Math.random() * Count)
            // Obtenir informació bàsica de les 10 cartes
            pokeAPI.get10PokemonsBasic( Id ).then((response) => {
                // console.log(response.data.results)
                const PokesBasic = response.data.results
                let PokesInfoComplet = new Array()
                // Obtenir informació completa de totes les cartes
                for (let index = 0; index < PokesBasic.length; index++) {
                    pokeAPI.getPokemonInfoComplet( PokesBasic[index].name ).then((response) => {
                        PokesInfoComplet.push({
                            "id": response.data.id,
                            "nom": response.data.name,
                            "imatgeFront": response.data.sprites.front_default,
                            "imatgeBack": response.data.sprites.back_default,
                            "atac": response.data.stats[1].base_stat,
                            "defensa": response.data.stats[2].base_stat,
                            "tipus": response.data.types
                        })
                        //Memoritzar la informació en el localStorage
                        localStorage.setItem("PokemonsInfo", JSON.stringify(PokesInfoComplet));
                    })
                }
            })
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
                <MultipleCardsComp />
            </div>
        </section>
        <section>
            <div id="card_ext"></div>
        </section>    
    </div>
</template>
