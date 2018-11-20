<template>
  <div class="thread-list">
    <h2 class="list-title">Threads</h2>
    <Thread v-for="thread in threads"
            :thread="thread" :key="thread.dotkey" />
  </div>
</template>

<script>
import Thread from '@/components/Thread.vue';

export default {
  components: {
    Thread,
  },
  props: {
    threads: {
      type: Array,
      required: true,
    },
  },
};
</script>
