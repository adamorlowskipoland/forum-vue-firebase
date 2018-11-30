<template>
  <div v-if="asyncDataStatus_ready"
       class="col-full">
    <h1>{{ category.name }}</h1>
    <CategoryItem :category="category" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import CategoryItem from '@/components/CategoryItem.vue';
import asyncDataStatus from '@/mixins/asyncDataStatus';

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
      .then(category => this.fetchForums({ ids: category.forums }))
      .then(() => { this.asyncDataStatus_fetched(); });
  },
  computed: {
    category() {
      return this.$store.state.categories.items[this.id];
    },
  },
  methods: {
    ...mapActions('categories', ['fetchCategory']),
    ...mapActions('forums', ['fetchForums']),
  },
  mixins: [asyncDataStatus],
};
</script>
