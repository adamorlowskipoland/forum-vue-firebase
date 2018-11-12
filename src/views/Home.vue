<template>
  <div class="col-full">
    <h1>Welcome to the Forum</h1>
    <CategoryList :categories="categories" />
  </div>
</template>

<script>
// @ is an alias to /src
import CategoryList from '@/components/CategoryList.vue';
import sourceData from '@/data/data.json';

export default {
  name: 'home',
  components: {
    CategoryList,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      categories: Object.values(sourceData.categories),
    };
  },
};
</script>
