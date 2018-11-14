<template>
  <div class="thread">
    <div>
      <p>
        <router-link :to="{name: 'ThreadShow', params: {id: thread['.key']}}">
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
import { countObjectProperties } from '@/utilities/index';

export default {
  props: {
    thread: {
      type: Object,
      required: true,
    },
  },
  computed: {
    repliesCount() {
      return countObjectProperties(this.thread.posts) - 1;
    },
    user() {
      return this.$store.state.users[this.thread.userId];
    },
  },
};
</script>
