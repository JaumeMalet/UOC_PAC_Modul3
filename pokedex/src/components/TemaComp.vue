<script setup>
    import {ref} from 'vue'
    
    //Inicialitzar variables
    const Tema = ref(localStorage.getItem('Tema'))

    //Paràmetres de sortida del component
    const emit = defineEmits(['response'])
    
    //Definir funció a realitzar al fer click a qualsevol carta
    const CanviTema = () => {
        //Emetre un senyal amb l'informació de la carta a la que s'ha fet click
        emit('response', Tema.value)
    }
</script>

<template>
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
</template>

<style scoped>
</style>
