<template>
  <div>
    <h1>Welcome to the Forum</h1>
    <div v-for="(thread, index) in threads"
         v-bind:key="thread.userId + index"
         class="col-large push-top">
      <h1>{{ thread.title }}</h1>
      <div class="post-list">
        <div v-for="postId in thread.posts"
             v-bind:key="postId"
             class="post">
          <div class="user-info">
            <a href="#" class="user-name">{{ users[posts[postId].userId].name }}</a>
            <a href="#">
              <img :src="users[posts[postId].userId].avatar"
                   alt="User's avatar"
                   class="avatar-large">
            </a>
            <p class="desktop-only text-small">107 posts</p>
          </div>
          <div class="post-content">
            <div>
              {{ posts[postId].text }}
            </div>
          </div>
          <div class="post-date text-faded">
            {{ posts[postId].publishedAt }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sourceData from '@/data/data.json';

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data() {
    return {
      threads: sourceData.threads,
      posts: sourceData.posts,
      users: sourceData.users,
    };
  },
};
</script>
