/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { i18nReducer, i18nAction } from './src/index';
import Example from './example';

export default class MyApp extends Component {
  constructor(props) {
    super(props);
    this.store = createStore(combineReducers({ i18n: i18nReducer }));
    this.store.dispatch(i18nAction.setLocale('zh-CN'));
    this.store.dispatch(i18nAction.extend({
      namespace: 'common',
      lang: {
        'zh-CN': {
          lang: '当前语言：'
        },
        'en-US': {
          lang: 'language：'
        }
      }
    }));
  }

  render() {
    return (
      <Provider store={this.store}>
        <Example />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('MyApp', () => MyApp);
