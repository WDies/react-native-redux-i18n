import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import i18nAction from './actions';

/**
 * i18nConnect
 * @param {Object} config
 *  config = {
 *    namespace: 'login',
 *     config: {
 *       'en-US': us,
 *       ...
 *     }
 *  }
 *  or [config, config]
 *
 *  this.props.i18n
 *  this.props.i18nAction = { extend, setLang }
 *
 *  ref 未处理
 */
export default config => WrappedComponent => {
  @connect(state => ({ i18n: state.i18n }))
  class I18n extends Component {
    constructor(props) {
      super(props);
      const { dispatch, i18n: { lang } } = props;
      if (!dispatch) {
        throw new Error('No redux dispatch is provided to I18n!');
      }
      if (!lang) {
        throw new Error('I18n lang undefined');
      }
      this.i18nAction = bindActionCreators(i18nAction, dispatch);
      if (config) {
        this.i18nAction.extend(config);
      }
    }

    setLocale(lang) {
      this.i18nAction.setLocale(lang);
    }

    render() {
      const { i18n } = this.props;
      const { lang, map } = i18n;
      return (
        <WrappedComponent i18nMap={map[lang]} i18nAction={this.i18nAction} {...this.props} />
      );
    }
  }

  return I18n;
};
