import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

// TODO: Try to remove these
import $ from 'jquery';

const Styles = styled.div`
  display: inline-block;

  pre, textarea {
    font-family: monospace, monospace;
    font-size: 1em;
    white-space: pre;
  }

  pre {
    display: none;
  }

  textarea {
    overflow: hidden;
  }
`;

export class TextRange extends React.Component {
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
    const value = this.getValue();
    const preValue = value
      .replace(/^$/, ' ')
      .replace(/\n$/, '\n ');

    return (
      <Styles>
        <textarea ref={el => (this.textArea = el)} className="text" {...this.props} value={value} onChange={e => this.onChange(e)}/>
        <pre ref={el => (this.pre = el)} className="text" {...this.props}>{preValue}</pre>
      </Styles>
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
