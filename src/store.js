import Vue from 'vue';
import Vuex from 'vuex';
import { countObjectProperties } from '@/utilities';

Vue.use(Vuex);

const makeAppendChildToParentMutation = ({ parent, child }) =>
  (state, { childId, parentId }) => {
    const resource = state[parent][parentId];
    if (!resource[child]) {
      Vue.set(resource, child, {});
    }
    Vue.set(resource[child], childId, childId);
  };

export default new Vuex.Store({
  state: {
    categories: {},
    forums: {},
    threads: {},
    posts: {},
    users: {},
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3',
  },
  getters: {
    authUser(state) {
      // return state.users[state.authId];
      return {};
    },
    userPostsCount: state => id => countObjectProperties(state.users[id].posts),
    userThreadsCount: state => id => countObjectProperties(state.users[id].threads),
    threadRepliesCount: state => id => countObjectProperties(state.threads[id].posts) - 1,
  },
  mutations: {
    setPost(state, { post, postId }) {
      Vue.set(state.posts, postId, post);
    },
    setThread(state, { thread, threadId }) {
      Vue.set(state.threads, threadId, thread);
    },
    setUser(state, { user, userId }) {
      Vue.set(state.users, userId, user);
    },
    appendPostToThread: makeAppendChildToParentMutation({ parent: 'threads', child: 'posts' }),
    appendPostToUser: makeAppendChildToParentMutation({ parent: 'users', child: 'posts' }),
    appendThreadToForum: makeAppendChildToParentMutation({ parent: 'forums', child: 'threads' }),
    appendThreadToUser: makeAppendChildToParentMutation({ parent: 'users', child: 'threads' }),
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
      context.commit('appendPostToThread', { childId: postId, parentId: post.threadId });
      context.commit('appendPostToUser', { childId: postId, parentId: post.userId });
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
        commit('appendThreadToForum', { parentId: forumId, childId: threadId });
        commit('appendThreadToUser', { parentId: userId, childId: threadId });
        dispatch('createPost', { text, threadId })
          .then((post) => {
            commit('setThread', { threadId, thread: { ...thread, firstPostId: post['.key'] } });
          });
        resolve(state.threads[threadId]);
      });
    },
    updateThread({ state, commit, dispatch }, { title, text, id }) {
      return new Promise((resolve) => {
        const thread = state.threads[id];
        const updatedThread = { ...thread, title };
        commit('setThread', { thread: updatedThread, threadId: id });
        dispatch('updatePost', { id: thread.firstPostId, text })
          .then(() => resolve(updatedThread));
      });
    },
    updateUser({ commit }, user) {
      commit('setUser', { userId: user['.key'], user });
    },
    updatePost({ state, commit }, { id, text }) {
      return new Promise((resolve) => {
        const post = state.posts[id];
        commit('setPost', {
          postId: id,
          post: {
            ...post,
            text,
            edited: {
              at: Math.floor(Date.now() / 1000),
              by: state.authId,
            },
          },
        });
        resolve(post);
      });
    },
  },
});
