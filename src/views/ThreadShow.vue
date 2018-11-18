<template>
  <div class="col-large push-top">
    <h1>
      {{ thread.title }}
      <router-link :to="{ name: 'ThreadEdit', id: this.id }"
                   class="btn-green btn-small"
                   tag="button">
        Edit Thread
      </router-link>
    </h1>
    <p>
      By <a href="#"
            class="link-unstyled">{{ user.name }}</a>, <AppDate :timestamp="thread.publishedAt" />.
      <span style="float: right; margin-top: 2px"
            class="hide-mobile text-faded text-small">
        {{ repliesCount }}
        {{ repliesCount === 1 ? 'reply' : 'replies' }}
        by
        {{ contributorsCount }} {{ contributorsCount === 1 ? 'contributor' : 'contributors' }}
      </span>
    </p>
    <PostList :posts="posts"/>
    <PostEditor :threadId="id" />
  </div>
</template>
<script>
import PostList from '@/components/PostList.vue';
import PostEditor from '@/components/PostEditor.vue';

export default {
  components: {
    PostList,
    PostEditor,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    thread() {
      return this.$store.state.threads[this.id];
    },
    posts() {
      const postIds = Object.values(this.thread.posts);
      return Object.values(this.$store.state.posts).filter(post => postIds.includes(post['.key']));
    },
    user() {
      return this.$store.state.users[this.thread.userId];
    },
    repliesCount() {
      return this.$store.getters.threadRepliesCount(this.thread['.key']);
    },
    contributorsCount() {
      //  find the replies
      const replies = Object.keys(this.thread.posts)
        .filter(postId => postId !== this.thread.firstPostId)
        .map(postId => this.$store.state.posts[postId]);
      //  get the useer ids
      const userIds = replies.map(post => post.userId);
      //  count the unique ids (we need to make sure users id is not counted 2 or more times)
      return userIds.filter((userId, index) => userIds.indexOf(userId) === index).length;
      //  the same can be achieve using Set()
      // return new Set(userIds).size;
    },
  },
};
</script>
