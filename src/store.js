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
    setThread(state, { thread, threadId }) {
      Vue.set(state.threads, threadId, thread);
    },
    appendPostToThread(state, { postId, threadId }) {
      const thread = state.threads[threadId];
      if (!thread.posts) {
        Vue.set(thread, 'posts', {});
      }
      Vue.set(thread.posts, postId, postId);
    },
    appendPostToUser(state, { postId, userId }) {
      const user = state.users[userId];
      if (!user.posts) {
        Vue.set(user, 'posts', {});
      }
      Vue.set(user.posts, postId, postId);
    },
    appendThreadToForum(state, { forumId, threadId }) {
      const forum = state.forums[forumId];
      if (!forum.threads) {
        Vue.set(forum, 'threads', {});
      }
      Vue.set(forum.threads, threadId, threadId);
    },
    appendThreadToUser(state, { userId, threadId }) {
      const user = state.users[userId];
      if (!user.threads) {
        Vue.set(user, 'threads', {});
      }
      Vue.set(user.threads, threadId, threadId);
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
      return Promise.resolve(context.state.posts[postId]);
    },
    createThread({ state, commit, dispatch }, { text, title, forumId }) {
      return new Promise((resolve) => {
        const threadId = `newThread${Math.random()}`;
        const userId = state.authId;
        const publishedAt = Math.floor(Date.now() / 1000);
        const thread = {
          '.key': threadId,
          title,
          forumId,
          publishedAt,
          userId,
        };
        commit('setThread', { threadId, thread });
        commit('appendThreadToForum', { forumId, threadId });
        commit('appendThreadToUser', { userId, threadId });
        dispatch('createPost', { text, threadId })
          .then((post) => {
            commit('setThread', { threadId, thread: { ...thread, firstPostId: post['.key'] } });
          });
        resolve(state.threads[threadId]);
      });
    },
    updateThread({ state, commit }, { title, text, id }) {
      return new Promise((resolve) => {
        const thread = state.threads[id];
        const post = state.posts[thread.firstPostId];
        const updatedThread = { ...thread, title };
        const updatedPost = { ...post, text };
        commit('setThread', { thread: updatedThread, threadId: id });
        commit('setPost', { post: updatedPost, postId: thread.firstPostId });
        resolve(updatedThread);
      });
    },
    updateUser({ commit }, user) {
      commit('setUser', { userId: user['.key'], user });
    },
    updatePost({ state, commit }, { id, text }) {
      return new Promise((resolve) => {
        const post = state.posts[id];
        commit('setPost', { postId: id, post: { ...post, text } });
        resolve(post);
      });
    },
  },
});
