<template>
  <div v-if="category"
       class="col-full">
    <h1>{{ category.name }}</h1>
    <CategoryItem :category="category" />
  </div>
</template>

<script>
import CategoryItem from '@/components/CategoryItem.vue';

export default {
  name: 'Category',
  components: { CategoryItem },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  created() {
    this.$store.dispatch('fetchCategory', { id: this.id })
      .then((category) => {
        this.$store.dispatch('fetchForums', { ids: category.forums });
      });
  },
  computed: {
    category() {
      return this.$store.state.categories[this.id];
    },
  },
};
</script>
