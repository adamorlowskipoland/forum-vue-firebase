import Vue from 'vue';
import firebase from 'firebase';

export default {
  namespaced: true,
  state: {
    items: {},
  },
  mutations: {
    setPost(state, { post, postId }) {
      Vue.set(state.items, postId, post);
    },
  },
  actions: {
    createPost({ commit, state, rootState }, basicPost) {
      const post = {
        ...basicPost,
        userId: rootState.auth.authId,
        dotkey: firebase.database().ref('posts').push().key,
        publishedAt: Math.floor(Date.now() / 1000),
      };
      const { dotkey: postId } = post;

      const updates = {};
      updates[`posts/${postId}`] = post;
      updates[`threads/${post.threadId}/posts/${postId}`] = postId;
      updates[`threads/${post.threadId}/contributors/${post.userId}`] = post.userId;
      updates[`users/${post.userId}/posts/${postId}`] = postId;
      firebase.database().ref().update(updates)
        .then(() => {
          commit('setItem', { resource: 'posts', item: post, id: postId }, { root: true });
          commit('threads/appendPostToThread', { childId: postId, parentId: post.threadId }, { root: true });
          commit('threads/appendContributorToThread', { childId: post.userId, parentId: post.threadId }, { root: true });
          commit('users/appendPostToUser', { childId: postId, parentId: post.userId }, { root: true });
          return Promise.resolve(state.items[postId]);
        });
    },
    updatePost({ state, commit, rootState }, { id, text }) {
      return new Promise((resolve) => {
        const post = state.items[id];
        const edited = {
          at: Math.floor(Date.now() / 1000),
          by: rootState.auth.authId,
        };
        const updates = { text, edited };
        firebase.database().ref('posts').child(id).update(updates)
          .then(() => {
            commit('setPost', { postId: id, post: { ...post, text, edited } });
            resolve(post);
          });
      });
    },
    fetchPost: ({ dispatch }, { id }) => dispatch('fetchItem', { resource: 'posts', id }, { root: true }),
    fetchPosts: ({ dispatch }, { ids }) => dispatch('fetchItems', { ids, resource: 'posts' }, { root: true }),
  },
};
