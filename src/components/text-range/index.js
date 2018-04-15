import './text-range.scss';

import React from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';
import $ from 'jquery';

export default class TextRange extends React.Component {
  constructor() {
    super();
    this.state = { value: '' };
  }

  getValue() {
    return (this.props && this.props.value) || this.state.value;
  }

  focus() {
    this.textArea.focus();
  }

  resize() {
    // Resize text field
    const pre = $(this.pre);
    const textWidth = pre.width();
    const textHeight = pre.height();

    const textArea = $(this.textArea);
    textArea.width(textWidth);
    textArea.height(textHeight);
  }

  onChange(e) {
    this.setState({ value: e.target.value });

    const { onChange } = this.props;
    if(onChange)
      onChange(e);
  }

  render() {
    const otherProps = _.omit(this.props, 'value', 'onChange');

    const value = this.getValue();
    const preValue = value
      .replace(/^$/, ' ')
      .replace(/\n$/, '\n ');

    return (
      <div className="text-range">
        <textarea ref={el => (this.textArea = el)} className="text" value={value} onChange={e => this.onChange(e)} {...otherProps}/>
        <pre ref={el => (this.pre = el)} className="text">{preValue}</pre>
      </div>
    );
  }

  componentDidMount() {
    this.resize();
  }

  componentDidUpdate() {
    this.resize();
  }
}
TextRange.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
};
TextRange.defaultProps = {
  value: null,
  onChange: null
};
