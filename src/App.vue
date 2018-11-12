<template>
  <div id="app">
    <!--<div id="nav">-->
      <!--<router-link to="/">Home</router-link> |-->
      <!--<router-link to="/about">About</router-link>-->
    <!--</div>-->
    <TheNavbar/>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>
<script>
import TheNavbar from '@/components/TheNavbar.vue';

export default {
  name: 'app',
  components: { TheNavbar },
};
</script>

<style lang="scss">
  @import "assets/css/style.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
