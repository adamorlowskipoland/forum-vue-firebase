<template>
  <div class="col-full" :class="$style.centered">
    <h1 :class="$style.headingLarge">Page Not Found</h1>
    <p :class="$style.textLarge">
      Oops, we couldn't find what you are looking for. Go to
      <router-link :to="{name: 'Home'}">
        Home page
      </router-link>
    </p>
  </div>
</template>
<script>
export default {
  created() {
    this.$emit('ready');
  },
};
</script>
<style module>
  .headingLarge {
    font-size: 100px;
  }
  .textLarge {
    font-size: 50px;
    font-weight: 100;
  }
  .centered {
    text-align: center;
  }
</style>
