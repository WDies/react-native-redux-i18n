import React, { Component, Children } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';

@connect(state => ({ i18n: state.i18n }))
class Loc extends Component {
  getTemplate() {
    const { path, i18n: { lang, map } } = this.props;
    let text = map[lang];
    path.split('.').forEach(key => {
      if (text[key] === undefined) {
        throw new Error(`Loc.path[${path}] undefined`);
      }
      text = text[key];
    });
    return text;
  }

  format(text, value) {
    Object.keys(value).forEach(key => {
      const reg = new RegExp(`({${key}})`, 'g');
      text = text.replace(reg, value[key]);
    });
    return text;
  }

  render() {
    let text = this.getTemplate();
    const { value, render } = this.props;
    if (value) {
      text = this.format(text, value);
    }
    if (render) {
      return Children.only(render(text));
    }
    return (
      <Text>{text}</Text>
    );
  }
}

export default Loc;
