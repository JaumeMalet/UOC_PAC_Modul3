<script setup>
    import {ref} from 'vue'
    
    //Inicialitzar variables
    const flip = ref(false)

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
                    <h2>{{ PInfo.nom }}</h2>
                    <img alt="" v-bind:src="PInfo.imatgeFront" class="card-imatge" />
                    <h3 class="card-atac">Atac: {{ PInfo.atac }} </h3>
                    <h3 class="card-defensa">Defensa: {{ PInfo.defensa }}</h3>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
</style>
