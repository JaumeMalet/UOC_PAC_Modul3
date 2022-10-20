<script setup>
    import {ref, onMounted} from 'vue'

    const PokemonsInfo = ref([])
    
    PokemonsInfo.value = JSON.parse(localStorage.getItem("PokemonsInfo"))
</script>

<template>
    <section>
      <!-- Plantilla d'una carta Pokemon -->
      <div class="card" @click="$router.push({name:'info',params:{Id:PokeInfo.id}})" v-for="PokeInfo in PokemonsInfo" :key="PokeInfo.Id">
        <h2>{{ PokeInfo.nom }}</h2>
        <img alt="" :src="PokeInfo.imatgeFront" class="card-imatge" />
        <h3 class="card-atac">Atac: {{ PokeInfo.atac }} </h3>
        <h3 class="card-defensa">Defensa: {{ PokeInfo.defensa }}</h3>
      </div>
    </section>
</template>

<style scoped>
</style>
