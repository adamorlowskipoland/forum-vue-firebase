<template>
  <div v-if="thread && user" class="col-large push-top">
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
import firebase from 'firebase';
import PostList from '@/components/PostList.vue';
import PostEditor from '@/components/PostEditor.vue';
import { countObjectProperties } from '@/utilities/index';

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
      return countObjectProperties(this.thread.contributors);
    },
  },
  created() {
    console.log('%c Line 44 -> ', 'color: #FFFF00 ;', 'created');
    //  fetch thread
    firebase.database().ref('threads').child(this.id).on('value', (snapshot) => {
      console.log('%c Line 65 -> ', 'color: #FFFF00 ;', snapshot);
      const thread = snapshot;
      console.log('%c Line 66 -> ', 'color: #FFFF00 ;', thread);
      this.$store.commit('setThread', { threadId: snapshot.key, thread: { ...thread, '.key': snapshot.key } });
      //  fetch user
      firebase.database().ref('users').child(thread.userId).once('value', (userSnapshot) => {
        console.log('%c Line 44 -> ', 'color: #FFFF00 ;', 'in firebase');
        const user = userSnapshot;
        this.$store.commit('setUser', { userId: userSnapshot.key, user: { ...user, '.key': userSnapshot.key } });
      });
      Object.keys(thread.posts).forEach((postId) => {
        //  fetch post
        firebase.database().ref('posts').child(postId).once('value', (postSnapshot) => {
          const post = postSnapshot;
          this.$store.commit('setPost', { postId: postSnapshot.key, post: { ...post, '.key': postSnapshot.key } });
          //  fetch user
          firebase.database().ref('users').child(post.userId).once('value', (postUserSnapshot) => {
            const user = postUserSnapshot;
            this.$store.commit('setUser', { userId: postUserSnapshot.key, user: { ...user, '.key': postUserSnapshot.key } });
          });
        });
      });
    });
  },
};
</script>
