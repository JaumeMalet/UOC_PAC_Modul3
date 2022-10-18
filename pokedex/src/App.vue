<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <div>
        <RouterLink to="/">Index</RouterLink>
      </div>
      <div>
        <RouterLink to="/combat">Combat</RouterLink>
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
        <label for="buscar">Búsqueda:</label>
        <input type="text" id="buscar_pokemon" placeholder="Nom Pokémon" onkeyup="buscar(this);">  
      </div>    
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
</style>
