function reducerCreator(reducerMapWithNs, initialState) {
  // 返回reducer函数
  return (state, action) => {
    if (!state) {
      return initialState;
    }

    // reducer不存在type时返回原值
    if (!reducerMapWithNs[action.type]) {
      return state;
    }
    return reducerMapWithNs[action.type](state, action);
  };
}

function appendNs(namespace, reducerMap, initialState) {
  const reducerMapWithNs = Object.keys(reducerMap).reduce((result, key) => {
    const reducer = reducerMap[key];
    result[`${namespace}/${key}`] = reducer;
    return result;
  }, {});
  return reducerCreator(reducerMapWithNs, initialState);
}

export default namespace => (...args) => (appendNs(namespace, ...args));
