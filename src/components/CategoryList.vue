<template>
  <div>
    <Category v-for="category in categories"
              :key="category['.key']"
              :category="category" />
  </div>
</template>

<script>
import Category from './CategoryItem.vue';

export default {
  name: 'CategoryList',
  components: { Category },
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
};
</script>
