<script setup>
    import {ref, onMounted} from 'vue'
    import pokeAPI from '@/services/services.js'
    import CardComp from '@/components/CardComp.vue'

    const PokemonsInfoComplet = ref([])
    const bCarregat = ref(false)

    onMounted( () => {
        // Obtenir el número de cartes pokemon existents a l'API
        pokeAPI.getPokemonsTotalCount().then((response) => {
            //Restem 10 al valor total per evitar que surti un id massa alt i es mostrin menys de 10 cartes
            const Count = response.data.count - 10
            //Obtenir 1 número a l'atzar com ID inicial per obtenir 10 cartes pokemon
            const Id = Math.floor(Math.random() * Count)
            //Obtenir informació bàsica de les 10 cartes
            pokeAPI.get10PokemonsBasic( Id ).then((response) => {
                //Obtenir informació completa de les 10 cartes
                getPokemonsComplet(response.data.results)
            })
        })    
    })

    //Declaració funció per obtenir l'informació completa de totes les cartes
    const getPokemonsComplet = async (PokemonsBasic) => {
        for (let index = 0; index < PokemonsBasic.length; index++) {
            //Obtenir informació completa de cada carta
            await pokeAPI.getPokemonInfoComplet( PokemonsBasic[index].name ).then((response) => {
                //Omplir array amb l'informació completa de la carta
                PokemonsInfoComplet.value.push({
                    "id": response.data.id,
                    "nom": response.data.name,
                    "imatgeFront": response.data.sprites.front_default,
                    "imatgeBack": response.data.sprites.back_default,
                    "atac": response.data.stats[1].base_stat,
                    "defensa": response.data.stats[2].base_stat,
                    "tipus": response.data.types
                })
            })
        }
        //Memoritzar la informació en el localStorage
        localStorage.setItem("PokemonsInfo", JSON.stringify(PokemonsInfoComplet.value));
        //Flag per indicar que s'ha obtingut l'informació
        bCarregat.value = true
    }

   //Declaració funció de l'emit del component CardComponent
   const CardComponentReturn = (text) => {
        // console.log(text)
    }

</script>

<template>
    <div>
        <section class="title">
            <h1>Pokedex</h1>
        </section>
        <div id="loading" v-if="!bCarregat">
            <img alt="loading" src="@/assets/img/loading.gif" />
        </div>
        <section>
            <div id="card-table">
                <div class="card" v-for="PokeInfo in PokemonsInfoComplet" v-bind:key="PokeInfo.Id"> 
                    <CardComp v-bind:PInfo = "PokeInfo" v-on:response="CardComponentReturn" />
                </div>
            </div>
        </section>  
    </div>
</template>