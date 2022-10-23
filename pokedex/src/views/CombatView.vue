<script setup>
    import {ref} from 'vue'
    import CardFlipComp from '@/components/CardFlipComp.vue'

    const PokemonsInfo = ref([])
    const bCarregat = ref(false)
    const Tema = ref(localStorage.getItem('Tema'))
    
    let flipped_cards_index = 0
    let flipped_cards_array = new Array()

    //Memoritzar el tema seleccionat al localStorage si es clicka sobre algun dels radio buttons per canviar el tema
    const CanviTema = (e) => {
        // console.log(e.target.value)
        localStorage.setItem("Tema", e.target.value)      
    }    
    
    //Recuperar informació dels pokemons guardada en localStorage
    PokemonsInfo.value = JSON.parse(localStorage.getItem("PokemonsInfo"))

    //Ataquem directament al tag 'body' afegint la classe segons el tema seleccionat
    //Serveix perquè es vegi tot el background-color del mateix color
    document.body.className = Tema.value
    
    //Flag per indicar que s'ha obtingut l'informació i deixar de mostrar el gif de 'carregant...'
    bCarregat.value = true

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
</script>

<template>
    <main :class="Tema">
        <header>
            <nav>
                <div>
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
                <div v-for="PokeInfo in PokemonsInfo" v-bind:key="PokeInfo.Id"> 
                    <CardFlipComp v-bind:PInfo="PokeInfo" @response="FlipCard" />
                </div>
            </div>
        </section>
    </main>
</template>

<style></style>
