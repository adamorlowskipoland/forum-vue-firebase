import Vue from 'vue';

export default {
  setItem(state, { item, id, resource }) {
    const newItem = { ...item, dotkey: id };
    Vue.set(state[resource].items, id, newItem);
  },
};
