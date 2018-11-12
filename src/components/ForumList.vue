<template>
  <div>
    <ForumItem v-for="forum in forums"
               :forum="forum"
               :key="forum['.key']" />
  </div>
</template>

<script>
import ForumItem from './ForumItem.vue';

export default {
  name: 'ForumList',
  components: { ForumItem },
  props: {
    forums: {
      type: Array,
      required: true,
    },
  },
};
</script>
