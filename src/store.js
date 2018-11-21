import Vue from 'vue';
import Vuex from 'vuex';
import getters from './storeParts/getters';
import mutations from './storeParts/mutations';
import actions from './storeParts/actions';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: {},
    forums: {},
    threads: {},
    posts: {},
    users: {},
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3',
  },
  getters,
  mutations,
  actions,
});
