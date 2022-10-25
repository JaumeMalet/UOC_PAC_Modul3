<script setup>
    import {ref, onMounted} from 'vue'
    import pokeAPI from '@/services/services.js'
    import CardFlipComp from '@/components/CardFlipComp.vue'

    const PokemonsInfoComplet = ref([])
    const bCarregat = ref(false)
    const Tema = ref(localStorage.getItem('Tema'))
    
    let flipped_cards_index = 0
    let flipped_cards_array = new Array()

    //Ataquem directament al tag 'body' afegint la classe segons el tema seleccionat
    //Serveix perquè es vegi tot el background-color del mateix color
    document.body.className = Tema.value
   
    //Carregar l'informació de les cartes pokemon del localStorage
    if(localStorage.getItem("PokemonsInfo") !== null) {
        PokemonsInfoComplet.value = JSON.parse(localStorage.getItem("PokemonsInfo"))
    }

    onMounted( () => {
        //Si no tenim l'informació de les cartes pokemon >> n'obtenim de noves
        if(!(PokemonsInfoComplet.value.length > 0))
        {
            // PokemonsInfoComplet.value = new Array()
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
        }
        //Flag per indicar que s'ha obtingut l'informació i deixar de mostrar el gif de 'carregant...'
        bCarregat.value = true
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
    }

    //Memoritzar el tema seleccionat al localStorage si es clicka sobre algun dels radio buttons per canviar el tema
    const CanviTema = (e) => {
        // console.log(e.target.value)
        localStorage.setItem("Tema", e.target.value)      
    }    

    //Definició de la funció que es realitza cada cop que es fa click a una carta. Conté la funcionalitat del combat.
    const FlipCard = (PInfoCardClick) => {
        flipped_cards_index++; // Index de la carta girada
        flipped_cards_array[flipped_cards_index] = JSON.parse(PInfoCardClick); // Guardar valors carta girada
        // console.log(flipped_cards_array[flipped_cards_index])

        if(flipped_cards_index == 2) {
            // Tenim 2 cartes girades, començar el combat:
            setTimeout(function() { // Executar funció després d'un retard de 0.5s per deixar temps perquè es gira la segona carta.
                // Missatge resultat del combat:
                if(Number(flipped_cards_array[1].atac) > Number(flipped_cards_array[2].defensa)) {
                    alert("'" + flipped_cards_array[1].nom + "' ataca i guanya a '" + flipped_cards_array[2].nom + "'");
                }
                else {
                    alert("'" + flipped_cards_array[1].nom + "' ataca i perd contra '" + flipped_cards_array[2].nom + "'");
                }
                // Recarregar la pàgina de combat
                window.location.reload();
            }, 500)
        }
    }

    //Definició de la funció que es realitza al fer click en el botó de Barrejar!
    const Barreja = () => {
        //Reset a l'informació obtinguda de les cartes actuals >> al recarregar la pàgina s'obtindrà l'informació de noves cartes
        PokemonsInfoComplet.value = new Array()
        localStorage.removeItem("PokemonsInfo")
        //Tornar a carregar la pàgina
        window.location.reload();
    }    
</script>

<template>
    <main :class="Tema">
        <header>
            <nav>
                <div>
                    <!-- Botó per mostrar 10 cartes noves -->
                    <button id="barreja" v-on:click="Barreja">Barrejar!</button>
                    <!-- Botó per anar a la vista Home -->
                    <RouterLink to="/" id="home">Home</RouterLink>
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
                    <!-- <label for="buscar">Búsqueda:</label> -->
                    <!-- <input v-model="search" type="text" placeholder="Nom Pokémon">   -->
                </div>    
            </nav>
        </header>
        <section class="title">
            <h1>Combat Pokémon</h1>
        </section>
        <div id="loading" v-if="!bCarregat">
            <img alt="loading" src="@/assets/img/loading.gif" />
        </div>
        <section>
            <div id="card-table">
                <div v-for="PokeInfo in PokemonsInfoComplet" v-bind:key="PokeInfo.Id"> 
                    <CardFlipComp v-bind:PInfo="PokeInfo" @response="FlipCard" />
                </div>
            </div>
        </section>
    </main>
</template>

<style></style>
