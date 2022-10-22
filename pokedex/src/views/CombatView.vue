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
