import firebase from 'firebase';

export default {
  createPost({ commit, state }, basicPost) {
    const post = {
      ...basicPost,
      userId: state.authId,
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
        commit('setItem', { resource: 'posts', item: post, id: postId });
        commit('appendPostToThread', { childId: postId, parentId: post.threadId });
        commit('appendContributorToThread', { childId: post.userId, parentId: post.threadId });
        commit('appendPostToUser', { childId: postId, parentId: post.userId });
        return Promise.resolve(state.posts[postId]);
      });
  },
  createThread({ state, commit }, { text, title, forumId }) {
    return new Promise((resolve) => {
      const threadId = firebase.database().ref('threads').push().key;
      const postId = firebase.database().ref('postss').push().key;
      const userId = state.authId;
      const publishedAt = Math.floor(Date.now() / 1000);
      const thread = {
        title,
        forumId,
        publishedAt,
        userId,
        firstPostId: postId,
        posts: {},
      };
      thread.posts[postId] = postId;
      const post = {
        text,
        publishedAt,
        threadId,
        userId,
      };
      const updates = {};
      updates[`threads/${threadId}`] = thread;
      updates[`forums/${forumId}/threads/${threadId}`] = threadId;
      updates[`users/${userId}/threads/${threadId}`] = threadId;

      updates[`posts/${postId}`] = post;
      updates[`users/${userId}/posts/${postId}`] = postId;
      firebase.database().ref().update(updates)
        .then(() => {
          //  update thread
          commit('setItem', { resource: 'threads', id: threadId, item: thread });
          commit('appendThreadToForum', { parentId: forumId, childId: threadId });
          commit('appendThreadToUser', { parentId: userId, childId: threadId });
          //  update post
          commit('setItem', { resource: 'posts', item: post, id: postId });
          commit('appendPostToThread', { childId: postId, parentId: post.threadId });
          commit('appendPostToUser', { childId: postId, parentId: post.userId });

          resolve(state.threads[threadId]);
        });
    });
  },
  updateThread({ state, commit }, { title, text, id }) {
    return new Promise((resolve) => {
      const thread = state.threads[id];
      const post = state.posts[thread.firstPostId];
      const edited = {
        at: Math.floor(Date.now() / 1000),
        by: state.authId,
      };
      const updates = { text, edited };
      updates[`posts/${thread.firstPostId}/text`] = text;
      updates[`posts/${thread.firstPostId}/edited`] = edited;
      updates[`threads/${id}/title`] = title;
      firebase.database().ref().update(updates)
        .then(() => {
          commit('setThread', { thread: { ...thread, title }, threadId: id });
          commit('setPost', { postId: thread.firstPostId, post: { ...post, text, edited } });
          resolve(post);
        });
    });
  },
  updateUser({ commit }, user) {
    commit('setUser', { userId: user.dotkey, user });
  },
  updatePost({ state, commit }, { id, text }) {
    return new Promise((resolve) => {
      const post = state.posts[id];
      const edited = {
        at: Math.floor(Date.now() / 1000),
        by: state.authId,
      };
      const updates = { text, edited };
      firebase.database().ref('posts').child(id).update(updates)
        .then(() => {
          commit('setPost', { postId: id, post: { ...post, text, edited } });
          resolve(post);
        });
    });
  },
  fetchThread: ({ dispatch }, { id }) => dispatch('fetchItem', { resource: 'threads', id }),
  fetchThreads: ({ dispatch }, { ids }) => dispatch('fetchItems', { ids, resource: 'threads' }),
  fetchCategories: ({ dispatch }, { ids }) => dispatch('fetchItems', { ids, resource: 'categories' }),
  fetchUser: ({ dispatch }, { id }) => dispatch('fetchItem', { resource: 'users', id }),
  fetchForum: ({ dispatch }, { id }) => dispatch('fetchItem', { resource: 'forums', id }),
  fetchPost: ({ dispatch }, { id }) => dispatch('fetchItem', { resource: 'posts', id }),
  fetchCategory: ({ dispatch }, { id }) => dispatch('fetchItem', { resource: 'categories', id }),
  fetchPosts: ({ dispatch }, { ids }) => dispatch('fetchItems', { ids, resource: 'posts' }),
  fetchForums: ({ dispatch }, { ids }) => dispatch('fetchItems', { ids, resource: 'forums' }),
  fetchItem({ state, commit }, { id, resource }) {
    return new Promise((resolve) => {
      firebase.database().ref(resource).child(id).once('value', (snapshot) => {
        commit('setItem', { resource, id: snapshot.key, item: snapshot.val() });
        resolve(state[resource][id]);
      });
    });
  },
  fetchItems({ dispatch }, { ids, resource }) {
    const idsArr = Array.isArray(ids) ? ids : Object.keys(ids);
    return Promise.all(idsArr.map(id => dispatch('fetchItem', { id, resource })));
  },
  fetchAllCategories({ state, commit }) {
    return new Promise((resolve) => {
      firebase.database().ref('categories').once('value', (snapshot) => {
        const categoriesObject = snapshot.val();
        Object.keys(categoriesObject).forEach((categoryId) => {
          const category = categoriesObject[categoryId];
          commit('setItem', { resource: 'categories', id: categoryId, item: category });
        });
        resolve(Object.values(state.categories));
      });
    });
  },
};
