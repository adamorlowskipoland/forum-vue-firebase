<template>
  <div class="col-full push-top">
    <h1>Welcome to the Forum</h1>
    <CategoryList :categories="categories" />
  </div>
</template>

<script>
// @ is an alias to /src
import CategoryList from '@/components/CategoryList.vue';

export default {
  name: 'home',
  components: {
    CategoryList,
  },
  props: {
    msg: String,
  },
  computed: {
    categories() {
      return Object.values(this.$store.state.categories);
    },
  },
};
</script>
