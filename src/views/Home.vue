<template>
  <div class="col-full">
    <h1>Welcome to the Forum</h1>
    <ThreadList :threads="threads" />
  </div>
</template>

<script>
// @ is an alias to /src
import ThreadList from '@/components/ThreadList.vue';
import sourceData from '@/data/data.json';

export default {
  name: 'home',
  components: {
    ThreadList,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      threads: Object.values(sourceData.threads),
      posts: sourceData.posts,
      users: sourceData.users,
    };
  },
};
</script>
