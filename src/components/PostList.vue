<template>
  <div class="post-list">
    <Post v-for="post in posts"
          :post="post"
          :key="post.dotkey" />
  </div>
</template>

<script>
import Post from '@/components/Post.vue';

export default {
  name: 'PostList',
  components: {
    Post,
  },
  props: {
    posts: Array,
    required: true,
  },
};
</script>

<style scoped>

</style>
