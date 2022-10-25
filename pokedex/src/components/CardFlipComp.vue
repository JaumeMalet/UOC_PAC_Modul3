<script setup>
    //Imports
    import {ref} from 'vue'
    
    //Definició i inicialització de variables
    const flip = ref(false)
    const ImatgeOk = ref(true)
    const nomSize = ref("")

    //Paràmetres d'entrada del component
    const props = defineProps({
        PInfo:{
        type: Object,
        required: true
        }
    })
    //Paràmetres de sortida del component
    const emit = defineEmits(['response'])
    
    //Definir funció a realitzar al fer click a qualsevol carta
    const FlipCard = () => {
        //Emetre un senyal amb l'informació de la carta a la que s'ha fet click
        emit('response', JSON.stringify(props.PInfo))
        //Afegir la classe '.flipped' al div que te la classe '.flip-card'
        flip.value = true
    }

    //No hi ha imatge per al pokemon >> mostrar imatge 'void.png'
    if(typeof props.PInfo.imatgeFront !== 'string') ImatgeOk.value = false

    //Si la longitud del nom del pokemon supera un límit, afegim la classe per reduïr la mida del text
    if(props.PInfo.nom.length > 9) nomSize.value="nomL"
    if(props.PInfo.nom.length > 14) nomSize.value="nomM"
    if(props.PInfo.nom.length > 23) nomSize.value="nomS"
</script>

<template>
    <section>
        <!-- Plantilla d'una carta Pokemon amb dues cares (Efecte Flip) -->
        <div class="flip-card" v-bind:class="{flipped:flip}"> 
            <div class="flip-card-inner">
                <div class="flip-card-front" v-on:click="FlipCard">
                    <img alt="Carta Pokémon" src="@/assets/img/flip-card-front.png" class="flip-card-front" />
                </div>
                <div class="flip-card-back">
                    <h2 v-bind:class="nomSize">{{ PInfo.nom }}</h2>
                    <img v-if="ImatgeOk" alt="" v-bind:src="PInfo.imatgeFront" class="card-imatge" />
                    <img v-else alt="" src="@/assets/img/void.png" class="card-imatge" />
                    <h3 class="card-atac">Atac: {{ PInfo.atac }} </h3>
                    <h3 class="card-defensa">Defensa: {{ PInfo.defensa }}</h3>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
</style>
