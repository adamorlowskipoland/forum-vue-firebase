<template>
  <div class="col-full push-top">
    <h1>Welcome to the Forum</h1>
    <CategoryList :categories="categories" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
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
  created() {
    this.fetchAllCategories()
      .then((categories) => {
        categories.forEach((category) => {
          this.fetchForums({ ids: Object.keys(category.forums) });
        });
      });
  },
  computed: {
    categories() {
      return Object.values(this.$store.state.categories);
    },
  },
  methods: {
    ...mapActions(['fetchAllCategories', 'fetchForums']),
  },
};
</script>
