<template>
  <div class="col-large push-top">
    <h1>{{ thread.title }}</h1>
    <PostList :posts="posts"/>
  </div>
</template>
<script>
import sourceData from '@/data/data.json';
import PostList from '@/components/PostList.vue';

export default {
  components: {
    PostList,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      thread: sourceData.threads[this.id],

    };
  },
  computed: {
    posts() {
      const postIds = Object.values(this.thread.posts);
      return Object.values(sourceData.posts).filter(post => postIds.includes(post['.key']));
    },
  },
};
</script>
