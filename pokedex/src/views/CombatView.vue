<script setup>
    import {ref} from 'vue'
    import CardComp from '@/components/CardComp.vue'

    const PokemonsInfo = ref([])
    const bCarregat = ref(false)
    const Tema = ref(localStorage.getItem('Tema'))

    //Memoritzar el tema seleccionat al localStorage si es clicka sobre algun dels radio buttons per canviar el tema
    const CanviTema = (e) => {
        //console.log(e.target.value)
        localStorage.setItem("Tema", e.target.value)      
    }    
    
    //Recuperar informació dels pokemons guardada en localStorage
    PokemonsInfo.value = JSON.parse(localStorage.getItem("PokemonsInfo"))

    //Ataquem directament al tag 'body' afegint la classe segons el tema seleccionat
    //Serveix perquè es vegi tot el background-color del mateix color
    document.body.className = Tema.value
    
    //Flag per indicar que s'ha obtingut l'informació i deixar de mostrar el gif de 'carregant...'
    bCarregat.value = true

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
            <div class="card" v-for="PokeInfo in PokemonsInfo" v-bind:key="PokeInfo.Id"> 
                <CardComp v-bind:PInfo="PokeInfo" />
            </div>
            </div>
        </section>
    </main>
</template>

<style></style>
