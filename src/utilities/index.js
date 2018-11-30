import Vue from 'vue';

const countObjectProperties = (obj) => {
  if (typeof obj === 'object') {
    return Object.keys(obj).length;
  }
  return 0;
};

const removeEmptyProperties = (obj) => {
  const objCopy = { ...obj };
  Object.keys(objCopy).forEach((key) => {
    if (!objCopy[key]) {
      delete objCopy[key];
    }
  });
  return objCopy;
};

const makeAppendChildToParentMutation = ({ child }) =>
  (state, { childId, parentId }) => {
    const resource = state.items[parentId];
    if (!resource[child]) {
      Vue.set(resource, child, {});
    }
    Vue.set(resource[child], childId, childId);
  };

// eslint-disable-next-line
export { countObjectProperties, removeEmptyProperties, makeAppendChildToParentMutation };
