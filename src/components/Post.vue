<template>
  <div class="post">
    <div class="user-info">
      <a href="#" class="user-name">{{ user.name }}</a>
      <a href="#">
        <img :src="user.avatar"
             alt="User's avatar"
             class="avatar-large">
      </a>
      <p class="desktop-only text-small">{{ userPostsCount }} posts</p>
    </div>
    <div class="post-content">
      <div>
        {{ post.text }}
      </div>
    </div>
    <div class="post-date text-faded"
         :title="post.publishedAt | formatedDate">
      {{ post.publishedAt | timeFromNow }}
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import sourceData from '@/data/data.json';

export default {
  name: 'Post',
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  computed: {
    user() {
      return sourceData.users[this.post.userId];
    },
    userPostsCount() {
      return Object.keys(this.user.posts).length;
    },
  },
  filters: {
    formatedDate(date) {
      return moment.unix(date).format('MMMM Do YYYY, h:mm:ss a');
    },
    timeFromNow(date) {
      return moment.unix(date).fromNow();
    },
  },
};
</script>

<style scoped>

</style>
