<script setup>
    import {ref, onMounted, computed} from 'vue'
    import pokeAPI from '@/services/services.js'
    import CardComp from '@/components/CardComp.vue'

    const PokemonsInfoComplet = ref([])
    const bCarregat = ref(false)
    const BuscarPokemon = ref("")
    const Tema = ref(localStorage.getItem('Tema'))

    //Ataquem directament al tag 'body' afegint la classe segons el tema seleccionat
    //Serveix perquè es vegi tot el background-color del mateix color
    document.body.className = Tema.value

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
        localStorage.setItem("PokemonsInfo", JSON.stringify(PokemonsInfoComplet.value))
        //Flag per indicar que s'ha obtingut l'informació i deixar de mostrar el gif de 'carregant...'
        bCarregat.value = true
    }

    //Declaració funció de filtre entre els noms de les cartes visibles segons variable 'BuscarPokemon'
    //Utilitzem 'computed' perquè volem que sigui reactiu a qualsevol canvi a la variable
    const FiltrarPokemons = computed (() => {
        //Retornar en l'array 'PokemonsInfoComplet' només els pokemon que el seu nom contingui el text
        //de la variable 'BuscarPokemon'
        // console.log(BuscarPokemon.value)
        // return PokemonsInfoComplet.value
        return PokemonsInfoComplet.value.filter((PokemonInfoComplet) => {
            return PokemonInfoComplet.nom.toLowerCase().includes(BuscarPokemon.value.toLowerCase())
        })
    })
        
    //Memoritzar el tema seleccionat al localStorage si es clicka sobre algun dels radio buttons per canviar el tema
    const CanviTema = (e) => {
        //console.log(e.target.value)
        localStorage.setItem("Tema", e.target.value)
        //Ataquem directament al tag 'body' afegint la classe segons el tema seleccionat
        //Serveix perquè es vegi tot el background-color del mateix color
        document.body.className = e.target.value
    }
</script>

<template>
    <main :class="Tema">
        <header>
            <nav>
                <div>
                    <RouterLink to="/combat" id="combat">Combat</RouterLink>
                </div>
                <div>
                    <fieldset>
                        <!-- mode visualització: clar (per defecte), fosc, sistema. (Utilitzar Local Storage per memoritzar la selecció). -->
                        <legend>Tema</legend>
                        <input type="radio" name="radio_tema" id="radio_clar" value="clar" v-model="Tema" v-on:change="CanviTema" checked>
                        <label for="radio_clar">Clar</label>
                        
                        <input type="radio" name="radio_tema" id="radio_fosc" value="fosc" v-model="Tema" v-on:change="CanviTema">
                        <label for="radio_fosc">Fosc</label>
                        
                        <input type="radio" name="radio_tema" id="radio_sistema" value="sistema" v-model="Tema" v-on:change="CanviTema">
                        <label for="radio_sistema">Sistema</label>
                    </fieldset>
                </div>
                <div id="buscar">
                    <!-- buscar text entre les 10 cartes carregades i que es veuen en la pàgina. -->
                    <label for="buscar">Búsqueda:</label>
                    <input v-model="BuscarPokemon" type="text" placeholder="Nom Pokémon">
                </div>    
            </nav>
        </header>
        <section class="title">
            <h1>Pokedex</h1>
        </section>
        <div id="loading" v-if="!bCarregat">
            <img alt="loading" src="@/assets/img/loading.gif" />
        </div>
        <section>
            <div id="card-table">
                <div class="card" v-for="PokeInfo in FiltrarPokemons" v-bind:key="PokeInfo.Id"> 
                    <CardComp v-bind:PInfo = "PokeInfo" v-on:response="CardComponentReturn" />
                </div>
            </div>
        </section>  
    </main>
</template>