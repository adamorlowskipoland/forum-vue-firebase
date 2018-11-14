import Vue from 'vue';
import Vuex from 'vuex';
import sourceData from '@/data/data.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ...sourceData,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3',
  },
  getters: {
    authUser(state) {
      return state.users[state.authId];
    },
  },
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
    setUser(state, { user, userId }) {
      Vue.set(state.users, userId, user);
    },
  },
  actions: {
    createPost(context, basicPost) {
      const post = {
        ...basicPost,
        userId: context.state.authId,
        '.key': `newPost${Math.random()}`,
        publishedAt: Math.floor(Date.now() / 1000),
      };
      const { '.key': postId } = post;
      context.commit('setPost', { post, postId });
      context.commit('appendPostToThread', { postId, threadId: post.threadId });
      context.commit('appendPostToUser', { postId, userId: post.userId });
    },
    updateUser({ commit }, user) {
      commit('setUser', { userId: user['.key'], user });
    },
  },
});
