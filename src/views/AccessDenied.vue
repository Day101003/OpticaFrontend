<template>
  <div class="access-denied">
    <h1>Acceso Denegado</h1>
    <p>Lo siento, no tienes permisos para acceder a esta página.</p>
    <router-link to="/">Regresar al inicio</router-link>
  </div>
</template>

<script>
export default {
  name: "AccessDenied",
};
</script>

<style scoped>
.access-denied {
  text-align: center;
  margin-top: 50px;
}

h1 {
  font-size: 2em;
  color: red;
}

p {
  font-size: 1.2em;
}

a {
  display: inline-block;
  margin-top: 20px;
  font-size: 1.1em;
  color: blue;
}
</style>
