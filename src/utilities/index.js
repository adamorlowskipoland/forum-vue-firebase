const countObjectProperties = (obj) => {
  if (typeof obj === 'object') {
    return Object.keys(obj).length;
  }
  return 0;
};

// eslint-disable-next-line
export { countObjectProperties };
