import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { i18nConnect, Loc } from './src/index';

@i18nConnect({
  namespace: 'example',
  lang: {
    'zh-CN': {
      page: '页面',
      test: '测试',
      obj: {
        key: 'value'
      },
      template: '姓名：{name}，年龄：{age}',
      arr: ['一', '二', '三', '四', '五', '六', '日']
    },
    'en-US': {
      page: 'page',
      test: 'test',
      obj: {
        key: 'value'
      },
      template: 'name:{name}, age:{age}',
      arr: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  }
})
class Example extends Component {
  componentDidMount() {
  }

  render() {
    const {
      i18nAction,
      i18n: { lang },
      i18nMap
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.btn, lang === 'zh-CN' ? styles.btnActive : {}]}
            onPress={() => {
              i18nAction.setLocale('zh-CN');
            }}
          >
            <Text>简体中文</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, lang === 'en-US' ? styles.btnActive : {}]}
            onPress={() => {
              i18nAction.setLocale('en-US');
            }}
          >
            <Text>English</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text>{i18nMap.common.lang} {lang}</Text>
          <Text>{i18nMap.example.page} : {i18nMap.example.test}</Text>
          <Loc path="common.lang" />
          <Loc path="example.obj.key" />
          <Loc path="example.template" value={{ name: 'wang', age: 20 }} />
          <Loc
            path="example.template"
            value={{ name: 'wang', age: 20 }}
            render={text => <Text style={{ color: '#f00' }}>{text}</Text>}
          />
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
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  buttons: {
    flexDirection: 'row'
  },
  btn: {
    padding: 10,
    borderRadius: 5,
    borderColor: '#666',
    borderWidth: 1,
    marginRight: 10
  },
  btnActive: {
    backgroundColor: '#e0e0e0'
  },
  content: {
    marginTop: 10
  }
});

export default Example;
