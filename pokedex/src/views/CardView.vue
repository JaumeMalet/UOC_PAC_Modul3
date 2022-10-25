<script setup>
    import {ref, computed} from 'vue'

    const PokemonsInfo = ref([])
    const Id = ref(0)
    const Tipus = ref("")
    const bCarregat = ref(false)
    const Tema = ref(localStorage.getItem('Tema'))
    const ImatgeFrontOk = ref(true)
    const ImatgeBackOk = ref(true)

    //Ataquem directament al tag 'body' afegint la classe segons el tema seleccionat
    //Serveix perquè es vegi tot el background-color del mateix color
    document.body.className = Tema.value

    //Recuperar informació dels pokemons guardada en localStorage
    PokemonsInfo.value = JSON.parse(localStorage.getItem("PokemonsInfo"))
    //Obtenir l'Id del pokemon de la URL
    const PokeId = window.location.href.split('/')[window.location.href.split('/').length - 1]
    //Obtenir l'index de l'array PokemonsInfo que coincideix amb la Id del pokemon de la URL
    for (let index = 0; index < PokemonsInfo.value.length; index++) {
        if(Number(PokemonsInfo.value[index].id) === Number(PokeId)){
            Id.value = index
            //No hi ha imatges per al pokemon >> mostrar imatge 'void.png'
            if(typeof PokemonsInfo.value[index].imatgeFront !== 'string') ImatgeFrontOk.value = false
            if(typeof PokemonsInfo.value[index].imatgeBack !== 'string') ImatgeBackOk.value = false
            break   //Un cop s'ha trobat no cal continuar fent el bucle
        }
    }
    //Obtenir text amb tots els noms del tipus separats per comes del pokemon determinat per l'Id
    for (let index = 0; index < PokemonsInfo.value[Id.value].tipus.length; index++) {
        if(index > 0) Tipus.value += ", "   //Afegim coma entre noms tipus
        Tipus.value += PokemonsInfo.value[Id.value].tipus[index].type.name
    }

    //Flag per indicar que s'ha obtingut l'informació i deixar de mostrar el gif de 'carregant...'
    bCarregat.value = true

    //Memoritzar el tema seleccionat al localStorage si canvia el valor de la variable 'Tema'
    const SetTema = computed (() => {
        localStorage.setItem("Tema", Tema.value)      
    })

</script>

<template>
    <main :class="Tema">
        <header>
            <nav>
                <div>
                    <!-- <RouterLink to="/combat">Combat</RouterLink> -->
                </div>
                <div>
                    <fieldset>
                        <!-- mode visualització: clar (per defecte), fosc, sistema. (Utilitzar Local Storage per memoritzar la selecció). -->
                        <legend>Tema</legend>
                        <input type="radio" name="radio_tema" id="radio_clar" value="clar" v-model="Tema" checked>
                        <label for="radio_clar">Clar</label>
                        
                        <input type="radio" name="radio_tema" id="radio_fosc" value="fosc" v-model="Tema">
                        <label for="radio_fosc">Fosc</label>
                        
                        <input type="radio" name="radio_tema" id="radio_sistema" value="sistema" v-model="Tema">
                        <label for="radio_sistema">Sistema</label>
                        <!-- El següent span és necessari perquè realitzi el 'computed' de la variable 'Tema' -->
                        <span>{{ SetTema }}</span>
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
                    <img v-if="ImatgeFrontOk" alt="" v-bind:src="PokemonsInfo[Id].imatgeFront" />
                    <img v-if="ImatgeBackOk" alt="" v-bind:src="PokemonsInfo[Id].imatgeBack" />
                    <img v-if="!ImatgeFrontOk && !ImatgeBackOk" alt="" src="@/assets/img/void.png" />
                </div>
                <h3>Atac: {{ PokemonsInfo[Id].atac }} </h3>
                <h3>Defensa: {{ PokemonsInfo[Id].defensa }} </h3>
                <h3 class="card_ext-tipus">Tipus: {{ Tipus }} </h3>
            </div>
        </section>
        <div>
            <!-- Botó amb l'enllaç per tornar enrera a la pàgina de 'Home' -->
            <button id="back" v-on:click="$router.push({name:'home'})">Tornar</button> 
        </div>    
    </main>
</template>
