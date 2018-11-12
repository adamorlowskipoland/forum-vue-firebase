import Vue from 'vue';
import Vuex from 'vuex';
import sourceData from '@/data/data.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: sourceData,
  mutations: {
    setPost(state, { post, postId }) {
      Vue.set(state.posts, postId, post);
    },
    appendPostToThread(state, { postId, threadId }) {
      const thread = state.threads[threadId];
      Vue.set(thread.posts, postId, postId);
    },
    appendPostToUser(state, { postId, userId }) {
      const user = state.users[userId];
      Vue.set(user.posts, postId, postId);
    },
  },
  actions: {
    createPost(context, post) {
      const { '.key': postId } = post;
      context.commit('setPost', { post, postId });
      context.commit('appendPostToThread', { postId, threadId: post.threadId });
      context.commit('appendPostToUser', { postId, userId: post.userId });
    },
  },
});
