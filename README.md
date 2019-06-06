# wd-react-native-redux-i18n

基于 redux 的 react-native 国际化组件

## Example

``` shell
  cd example
  react-native run-ios
```

## i18nReducer

``` js
import { i18nReducer, i18nAction } from 'wd-react-native-redux-i18n';

const store = createStore(combineReducers({ i18n: i18nReducer }));

// 设置默认语言
store.dispatch(i18nAction.setLocale('zh-CN'));

// 设置默认语言包
store.dispatch(i18nAction.extend({
  namespace: 'common',
  lang: {
    'zh-CN':  {
      lang: '当前语言：'
    },
    'en-US': {
      lang: 'language：'
    }
  }
}));
```

``` jsx
<Provider store={this.store}>
  <Page />
</Provider>
```

## i18nConnect([Object or Arrary])

### 注意：组件里面没有处理 ref

``` js
// @i18nConnect()  // 不需要新增语言包可以不传参数
@i18nConnect({
  namespace: 'example',
  lang: {
    'zh-CN': {
      page: '页面',
    },
    'en-US': {
      page: 'page'
    }
  }
})
class Example extends Component {}

// or
exprot default i18nConnect()(Example)

```

### props

- i18nMap 当前语言包
- i18nAction { setLocale, extend }


## i18nAction

- setLocale 设置当前语言

``` js
setLocale('zh-CN')
```

- extend 扩展语言

``` js
const config = {
  namespace: 'common',
  lang: {
    'zh-CN': {
      lang: '当前语言：'
    },
    'en-US': {
      lang: 'language：'
    }
    // ...
  }
};
extend(config);
// 如果需要多个命名空间可以 extend([config, config2, ...]);
```

## Loc Component

### props
  - path 路径
  - value 模板
  - render 自定义输出方式

``` jsx
/*
example: {
  page: '页面',
  test: '测试',
  obj: {
    key: 'value'
  },
  template: '姓名：{name}，年龄：{age}',
  arr: ['一', '二', '三', '四', '五', '六', '日']
}
*/
// => value
<Loc path="example.obj.key" />

// => 姓名：wang，年龄：20
<Loc path="example.template" value={{ name: 'wang', age: 20 }} />

// => 姓名：wang，年龄：20
<Loc
  path="example.template"
  value={{ name: 'wang', age: 20 }}
  render={text => <Text style={{ color: '#f00' }}>{text}</Text>}
/>

// => 一
// => 二
// => 三
// => ...
<Loc
  path="example.arr"
  render={text => (
    <View>
      {
        text.map(item => <Text style={{ color: '#0f0' }}>{item}</Text>)
      }
    </View>
  )}
/>
```
