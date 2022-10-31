<script setup>
    //Imports
    import {ref} from 'vue'
    import TemaComp from '@/components/TemaComp.vue'
    import { useRoute } from 'vue-router'

    //Definició i inicialització de variables
    const PokemonsInfo = ref([])
    const Id = ref(0)
    const Tipus = ref("")
    const bCarregat = ref(false)
    const Tema = ref(localStorage.getItem('Tema'))
    const ImatgeFrontOk = ref(true)
    const ImatgeBackOk = ref(true)
    const route = useRoute();

    console.log(route.params)

    //Ataquem directament al tag 'body' afegint la classe segons el tema seleccionat
    //Serveix perquè es vegi tot el 'background-color' del mateix color
    document.body.className = Tema.value

    //Recuperar informació dels pokemons guardada en localStorage
    PokemonsInfo.value = JSON.parse(localStorage.getItem("PokemonsInfo"))

    //Obtenir l'Id del pokemon de la URL
    // const PokeId = window.location.href.split('/')[window.location.href.split('/').length - 1]
    const pokeId = route.params.id
     // para Obtener los parametros pasados por la URL, vue tiene un hook llamando useRoute, no cal hacer este código hacker
     // 1.- linea 5 importamos useRoute de vue-router
     // 2.- linea 15 creamos una constante route y usamos el hook , esta función no devuelve un objeto route que tiene un atributo
     //     con todos los parametros pasados por la URL.
     // 3.- linea 28 obtenemos el id de params
     // Pd.- Las variables deben ser en camelCase.

    //Obtenir l'index de l'array PokemonsInfo que coincideix amb la Id del pokemon de la URL
    for (let index = 0; index < PokemonsInfo.value.length; index++) {
        if(Number(PokemonsInfo.value[index].id) === Number(pokeId)){
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

    //Indicador que s'ha obtingut l'informació i deixar de mostrar el gif de 'carregant...'
    bCarregat.value = true

    //Senyal generat per un canvi en els radio buttons del Tema
    //Memoritzar el tema seleccionat al localStorage si es clicka sobre algun dels radio buttons per canviar el tema
    const CanviTema = (tema) => {
        // console.log(tema)
        localStorage.setItem("Tema", tema)
        //Ataquem directament al tag 'body' afegint la classe segons el tema seleccionat
        //Serveix perquè es vegi tot el background-color del mateix color
        document.body.className = tema
        //Actualitzem la variable 'Tema' d'aquesta vista
        Tema.value = tema
    }
</script>

<template>
    <main :class="Tema">
        <header>
            <nav>
                <div>
                    <!-- Botons >> NO -->
                </div>
                <div>
                    <!-- Selecció del tema -->
                    <TemaComp @response="CanviTema" />
                </div>
                <div>
                    <!-- buscar >> NO -->
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
