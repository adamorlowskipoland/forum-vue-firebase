import firebase from 'firebase';

export default {
  createPost({ commit, state }, basicPost) {
    const post = {
      ...basicPost,
      userId: state.authId,
      dotkey: `newPost${Math.random()}`,
      publishedAt: Math.floor(Date.now() / 1000),
    };
    const { dotkey: postId } = post;
    commit('setPost', { post, postId });
    commit('appendPostToThread', { childId: postId, parentId: post.threadId });
    commit('appendPostToUser', { childId: postId, parentId: post.userId });
    return Promise.resolve(state.posts[postId]);
  },
  createThread({ state, commit, dispatch }, { text, title, forumId }) {
    return new Promise((resolve) => {
      const threadId = `newThread${Math.random()}`;
      const userId = state.authId;
      const publishedAt = Math.floor(Date.now() / 1000);
      const thread = {
        dotkey: threadId,
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
          commit('setThread', { threadId, thread: { ...thread, firstPostId: post.dotkey } });
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
    commit('setUser', { userId: user.dotkey, user });
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
