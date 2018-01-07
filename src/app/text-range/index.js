import './text-range.scss';

import React from 'react';
import PropTypes from 'prop-types';

import $ from 'jquery';

export default class TextRange extends React.Component {
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

  render() {
    const preText = this.props.value
      .replace(/^$/, ' ')
      .replace(/\n$/, '\n ');

    return (
      <span className="text-range">
        <textarea ref={el => (this.textArea = el)} className="text" {...this.props}/>
        <pre ref={el => (this.pre = el)} className="text">{preText}</pre>
      </span>
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
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
