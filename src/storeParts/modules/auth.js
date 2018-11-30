import firebase from 'firebase';

export default {
  namespaced: true,
  state: {
    authId: null,
    unsubscribeAuthObserver: null,
  },
  getters: {
    authUser(state, getters, rootState) {
      return state.authId ? rootState.users.items[state.authId] : null;
    },
  },
  mutations: {
    setAuthId(state, id) {
      // eslint-disable-next-line
      state.authId = id;
    },
    setUnsubscibeAuthObserver(state, unsubscribe) {
      // eslint-disable-next-line
      state.unsubscribeAuthObserver = unsubscribe;
    },
  },
  actions: {
    initAuthentication({ dispatch, commit, state }) {
      return new Promise((resolve) => {
        if (state.unsubscribeAuthObserver) {
          state.unsubscribeAuthObserver();
        }
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            dispatch('fetchAuthUser')
              .then(dbUser => resolve(dbUser));
          } else {
            resolve(null);
          }
        });
        commit('setUnsubscibeAuthObserver', unsubscribe);
      });
    },
    registerUserWithEmailAndPassword({ dispatch }, {
      email,
      password,
      name,
      username,
      avatar = null,
    }) {
      return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(({ user }) => {
          dispatch('users/createUser', {
            id: user.uid,
            email,
            name,
            username,
            password,
            avatar,
          }, { root: true });
        })
        .then(() => dispatch('fetchAuthUser'));
    },
    signInWithEmailAndPassword(context, { email, password }) {
      return firebase.auth().signInWithEmailAndPassword(email, password);
    },
    signInWithGoogle({ dispatch }) {
      const provider = new firebase.auth.GoogleAuthProvider();
      return firebase.auth().signInWithPopup(provider)
        .then(({ user }) => {
          firebase.database().ref('users').child(user.uid).once('value', (snapshot) => {
            if (!snapshot.exists()) {
              return dispatch('users/createUser', {
                id: user.uid,
                name: user.displayName,
                email: user.email,
                username: user.email,
                avatar: user.photoURL,
              }, { root: true })
                .then(() => dispatch('fetchAuthUser'));
            }
            return false;
          });
        });
    },
    signOut({ commit }) {
      return firebase.auth().signOut()
        .then(() => {
          commit('setAuthId', null);
        });
    },
    fetchAuthUser({ dispatch, commit }) {
      const userId = firebase.auth().currentUser.uid;
      return new Promise((resolve) => {
        // eslint-disable-next-line
        firebase.database().ref('users').child(userId).once('value', (snapshot) => {
          if (snapshot.exists()) {
            return dispatch('users/fetchUser', { id: userId }, { root: true })
              .then((user) => {
                commit('setAuthId', userId);
                resolve(user);
              });
          }
          resolve(null);
        });
      });
    },
  },
};
