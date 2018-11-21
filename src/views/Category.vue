<template>
  <div v-if="category"
       class="col-full">
    <h1>{{ category.name }}</h1>
    <CategoryItem :category="category" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
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
    this.fetchCategory({ id: this.id })
      .then((category) => {
        this.fetchForums({ ids: category.forums });
      });
  },
  computed: {
    category() {
      return this.$store.state.categories[this.id];
    },
  },
  methods: {
    ...mapActions(['fetchCategory', 'fetchForums']),
  },
};
</script>
