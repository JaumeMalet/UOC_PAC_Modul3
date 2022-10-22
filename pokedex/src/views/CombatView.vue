<script setup>
    import {ref, onMounted} from 'vue'
    import CardComp from '@/components/CardComp.vue'

    const PokemonsInfo = ref([])
    const bCarregat = ref(false)

    //Recuperar informació dels pokemons
    PokemonsInfo.value = JSON.parse(localStorage.getItem("PokemonsInfo"))

    //Flag per indicar que s'ha obtingut l'informació
    bCarregat.value = true
</script>

<template>
  <div>
    <header>
        <nav>
            <div>
                <RouterLink to="/">Home</RouterLink>
            </div>
            <div>
                <fieldset onchange="set_tema();">
                <!-- mode visualització: clar (per defecte), fosc, sistema. (Utilitzar Local Storage per memoritzar la selecció). -->
                <legend>Tema</legend>
                <input type="radio" name="radio_tema" id="radio_clar" value="clar" checked>
                <label for="radio_clar">Clar</label>
                
                <input type="radio" name="radio_tema" id="radio_fosc" value="fosc">
                <label for="radio_fosc">Fosc</label>
                
                <input type="radio" name="radio_tema" id="radio_sistema" value="sistema">
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
  </div>
</template>

<style></style>
