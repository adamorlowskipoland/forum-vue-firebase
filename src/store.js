import Vue from 'vue';
import Vuex from 'vuex';
import getters from './storeParts/getters';
import mutations from './storeParts/mutations';
import actions from './storeParts/actions';
import categories from './storeParts/modules/categories';
import forums from './storeParts/modules/forums';
import threads from './storeParts/modules/threads';
import posts from './storeParts/modules/posts';
import users from './storeParts/modules/users';
import auth from './storeParts/modules/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: {},
    authId: null,
    unsubscribeAuthObserver: null,
  },
  getters,
  mutations,
  actions,
  modules: {
    categories,
    forums,
    threads,
    posts,
    users,
    auth,
  },
});
