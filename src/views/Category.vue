<template>
  <div class="col-full">
    <h1>{{ category.name }}</h1>
    <CategoryItem :category="category" />
  </div>
</template>

<script>
import CategoryItem from '@/components/CategoryItem.vue';
import sourceData from '@/data/data.json';

console.log('%c Line 11 -> ', 'color: #FFFF00 ;', sourceData);

export default {
  name: 'Category',
  components: { CategoryItem },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    category() {
      return sourceData.categories[this.id];
    },
  },
};
</script>
