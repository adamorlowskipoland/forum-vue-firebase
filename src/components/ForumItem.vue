<template>
  <div class="forum-listing">
    <div class="forum-details">
      <router-link :to="{name: 'Forum', params: {id: forum['.key']}}"
                   class="text-xlarge">
        {{ forum.name }}
      </router-link>
      <p>{{ forum.description }}</p>
    </div>

    <div class="threads-count">
      <p class="count">{{ threadsCount }}</p> {{ threadsCount === 1 ? 'thread' : 'threads' }}
    </div>

    <!-- TODO: implement -->
    <!--<div class="last-thread">-->
      <!--<img src="#" alt="" class="avatar">-->
      <!--<div class="last-thread-details">-->
        <!--<a href="#">Where is the sign in button?</a>-->
        <!--<p class="text-xsmall">By <a href="#">Joseph Kerr</a>, three hours ago</p>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
export default {
  name: 'ForumItem',
  props: {
    forum: {
      type: Object,
      required: true,
    },
  },
  computed: {
    threadsCount() {
      return this.forum.threads
        ? Object.values(this.forum.threads).length
        : 0;
    },
  },
};
</script>
