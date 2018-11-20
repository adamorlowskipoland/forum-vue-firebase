<template>
  <div class="thread">
    <div>
      <p>
        <router-link :to="{name: 'ThreadShow', params: {id: thread.dotkey}}">
          {{ thread.title }}
        </router-link>
      </p>
      <p class="text-faded text-xsmall">
        By <a href="profile.html">{{ user.name }}</a>, <AppDate :timestamp="thread.publishedAt" />.
      </p>
    </div>

    <div class="activity">
      <p class="replies-count">
        {{ repliesCount }} replies
      </p>
    </div>

    <!--<img src="" alt="" class="avatar-medium">-->

    <!--<div>-->
      <!--<p class="text-xsmall">-->
        <!--<a href="">Bruce</a>-->
      <!--</p>-->
      <!--<p class="text-xsmall text-faded">2 hourse ago</p>-->
    <!--</div>-->
  </div>
</template>

<script>
export default {
  props: {
    thread: {
      type: Object,
      required: true,
    },
  },
  computed: {
    repliesCount() {
      return this.$store.getters.threadRepliesCount(this.thread['.key']);
    },
    user() {
      return this.$store.state.users[this.thread.userId];
    },
  },
};
</script>
