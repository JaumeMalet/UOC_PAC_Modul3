<script setup>
    //Imports
    import {ref} from 'vue'

    //Definició i inicialització de variables
    const ImatgeOk = ref(true)
    const nomSize = ref("")

    //Paràmetres d'entrada del component
    const props = defineProps({
        PInfo:{
        type: Object,
        required: true
        }
    })

    //No hi ha imatge per al pokemon >> mostrar imatge 'void.png'
    if(typeof props.PInfo.imatgeFront !== 'string') ImatgeOk.value = false

    //Si la longitud del nom del pokemon supera un límit, afegim la classe 'nom_' per reduïr la mida del text
    if(props.PInfo.nom.length > 9) nomSize.value="nomL"
    if(props.PInfo.nom.length > 14) nomSize.value="nomM"
    if(props.PInfo.nom.length > 23) nomSize.value="nomS"
</script>

<template>
    <section>
        <!-- Plantilla d'una carta Pokemon -->
        <div v-on:click="$router.push({name:'card',params:{Id:PInfo.id}})">
            <h2 v-bind:class="nomSize">{{ PInfo.nom }}</h2>
            <img v-if="ImatgeOk" alt="" v-bind:src="PInfo.imatgeFront" class="card-imatge" />
            <img v-else alt="" src="@/assets/img/void.png" class="card-imatge" />
            <h3 class="card-atac">Atac: {{ PInfo.atac }} </h3>
            <h3 class="card-defensa">Defensa: {{ PInfo.defensa }}</h3>
        </div>
    </section>
</template>

<style scoped>
</style>
