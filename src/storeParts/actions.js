import firebase from 'firebase';

export default {
  fetchItem({ state, commit }, { id, resource }) {
    return new Promise((resolve) => {
      firebase.database().ref(resource).child(id).once('value', (snapshot) => {
        commit('setItem', { resource, id: snapshot.key, item: snapshot.val() });
        resolve(state[resource].items[id]);
      });
    });
  },
  fetchItems({ dispatch }, { ids, resource }) {
    const idsArr = Array.isArray(ids) ? ids : Object.keys(ids);
    return Promise.all(idsArr.map(id => dispatch('fetchItem', { id, resource })));
  },
};
