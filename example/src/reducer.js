import nsReducers from './utils/namespace-reducers';

const handleActions = nsReducers('i18n');

const initState = {
  // 当前语言
  lang: '',
  map: {
    // 'zh-CN': {
    //   common: {}
    // },
    // ...
  }
};

const i18n = handleActions({
  EXTEND: (state, action) => {
    const { map } = state;
    const set = config => {
      const { lang = {}, namespace = 'common' } = config;
      Object.keys(lang).forEach(l => {
        if (!map[l]) {
          map[l] = {};
        }
        map[l][namespace] = Object.assign({}, map[l][namespace], lang[l]);
      });
    };
    const argType = Object.prototype.toString.call(action.payload);
    if (argType === '[object Array]') {
      action.payload.forEach(config => {
        set(config);
      });
    } else if (argType === '[object Object]') {
      set(action.payload);
    }
    return { ...state, map };
  },
  SET_LOCALE: (state, action) => ({
    ...state,
    lang: action.payload
  })
}, initState);

export default i18n;
