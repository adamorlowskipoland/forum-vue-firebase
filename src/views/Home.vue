<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">
    <h1>Welcome to the Forum</h1>
    <CategoryList :categories="categories" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
// @ is an alias to /src
import CategoryList from '@/components/CategoryList.vue';
import asyncDataStatus from '@/mixins/asyncDataStatus';

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
      .then(categories => Promise.all(categories.map(category => (
        this.fetchForums({ ids: Object.keys(category.forums) })
      )))
        .then(() => {
          this.asyncDataStatus_fetched();
        }));
  },
  computed: {
    categories() {
      return Object.values(this.$store.state.categories.items);
    },
  },
  methods: {
    ...mapActions('categories', ['fetchAllCategories']),
    ...mapActions('forums', ['fetchForums']),
  },
  mixins: [asyncDataStatus],
};
</script>
