// 转为驼峰
const camelCase = str => str.toLowerCase().replace(/_[\w]/g, s => s.slice(1).toUpperCase());

// 构造action函数
const actionCreator = (namespace, args) => args.reduce((partialObject, element) => ({
  ...partialObject,
  [camelCase(element)]: (...actionArgs) => {
    const [actionArg] = actionArgs;
    const type = element;
    const action = {
      type
    };
    action.payload = actionArg;
    action.type = `${namespace}/${element}`;
    return action;
  }
}), {});

function appendNs(namespace, ...args) {
  const actions = actionCreator(namespace, args);
  args.forEach(name => {
    actions[name] = `${namespace}/${name}`;
  });
  return actions;
}

export default namespace => (...args) => (appendNs(namespace, ...args));
