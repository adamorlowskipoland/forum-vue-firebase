import { makeAppendChildToParentMutation } from '@/utilities';

export default {
  namespaced: true,
  state: {
    items: {},
  },
  mutations: {
    appendThreadToForum: makeAppendChildToParentMutation({ parent: 'forums', child: 'threads' }),
  },
  actions: {
    fetchForums: ({ dispatch }, { ids }) => dispatch('fetchItems', { ids, resource: 'forums' }, { root: true }),
    fetchForum: ({ dispatch }, { id }) => dispatch('fetchItem', { resource: 'forums', id }, { root: true }),
  },
};
