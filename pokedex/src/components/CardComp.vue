<script setup>
    import {ref, onMounted} from 'vue'

    //Paràmetres d'entrada del component
    const props = defineProps({
      PInfo:{
        type: Object,
        required: true
      }
    })
    //Paràmetres de sortida del component
    const emit = defineEmits(['response'])
    emit('response', 'Hola')
</script>

<template>
    <section>
      <!-- Plantilla d'una carta Pokemon -->
      <div v-on:click="$router.push({name:'card',params:{Id:PInfo.id}})">
        <h2>{{ PInfo.nom }}</h2>
        <img alt="" v-bind:src="PInfo.imatgeFront" class="card-imatge" />
        <h3 class="card-atac">Atac: {{ PInfo.atac }} </h3>
        <h3 class="card-defensa">Defensa: {{ PInfo.defensa }}</h3>
      </div>
    </section>
</template>

<style scoped>
</style>
