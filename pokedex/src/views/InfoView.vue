<script setup>
    import {ref, onMounted} from 'vue'
    import InfoCardComp from '@/components/InfoCardComp.vue'
</script>

<template>
    <div>
        <section class="title">
            <h1>Pokedex</h1>
        </section>
        <div id="loading">
            <!-- <img alt="loading" src="../assets/img/loading.gif" /> -->
        </div>
        <section>
            <div id="card-table">
            </div>
        </section>
        <section>
            <div id="card_ext"></div>
            <InfoCardComp />
        </section>    
    </div>
</template>
