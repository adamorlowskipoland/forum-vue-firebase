<template>
  <div id="app">
    <TheNavbar/>
    <div class="container">
      <router-view v-show="showPage" @ready="pageReady" />
      <Spinner v-if="!showPage" />
    </div>
  </div>
</template>
<script>
import TheNavbar from '@/components/TheNavbar.vue';
import Spinner from '@/components/AppSpinner.vue';
import NProgress from 'nprogress';

export default {
  name: 'app',
  components: { TheNavbar, Spinner },
  data() {
    return {
      showPage: false,
    };
  },
  methods: {
    pageReady() {
      this.showPage = true;
      NProgress.done();
    },
  },
  created() {
    NProgress.configure({
      speed: 200,
      showSpinner: false,
    });
    NProgress.start();
    this.$router.beforeEach((actionDo, from, next) => {
      this.showPage = false;
      NProgress.start();
      next();
    });
  },
};
</script>

<style lang="scss">
  @import "assets/css/style.css";
  @import "~nprogress/nprogress.css";
  #nprogress .bar {
    background-color: #57ad8d;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
