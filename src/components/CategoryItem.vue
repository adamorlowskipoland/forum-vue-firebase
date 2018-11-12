<template>
  <div class="forum-list">
    <h2 class="list-title">
      <router-link :to="{name: 'Category', params: {id: category['.key']}}">
        {{ category.name }}
      </router-link>
    </h2>

    <ForumList :forums="categoryForums" />
  </div>
</template>

<script>
import sourceData from '@/data/data.json';
import ForumList from './ForumList.vue';

export default {
  name: 'Category',
  components: { ForumList },
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
  computed: {
    categoryForums() {
      return Object.values(sourceData.forums)
        .filter(forum => forum.categoryId === this.category['.key']);
    },
  },
};
</script>
