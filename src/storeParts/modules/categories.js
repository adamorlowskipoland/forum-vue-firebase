import firebase from 'firebase';

export default {
  namespaced: true,
  state: {
    items: {},
  },
  actions: {
    fetchAllCategories({ state, commit }) {
      return new Promise((resolve) => {
        firebase.database().ref('categories').once('value', (snapshot) => {
          const categoriesObject = snapshot.val();
          Object.keys(categoriesObject).forEach((categoryId) => {
            const category = categoriesObject[categoryId];
            commit('setItem', { resource: 'categories', id: categoryId, item: category }, { root: true });
          });
          resolve(Object.values(state.items));
        });
      });
    },
    fetchCategories: ({ dispatch }, { ids }) => dispatch('fetchItems', { ids, resource: 'categories' }, { root: true }),
    fetchCategory: ({ dispatch }, { id }) => dispatch('fetchItem', { resource: 'categories', id }, { root: true }),
  },
};
