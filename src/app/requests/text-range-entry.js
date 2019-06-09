import React from 'react';
import styled from 'styled-components';

import TextRange from '../../components/text-range';
import { rules as keyRules } from '../../input/rules';

const Styles = styled.div`
  display: flex;
  align-items: center;

  & > * {
    margin: 2px;
  }

  .mode-label {
    position: relative;
    bottom: 3px;
    right: 3px;
    font-size: 24px;
  }

  .text-range {
    display: block;

    textarea {
      border: 1px solid white;
      background: #000000;
      color: white;
      padding: 5px;
    }
  }

  button {
    align-self: flex-end;
    margin-bottom: 8px;
  }
`;

class TextRangeEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  focus() {
    this.textRange.focus();
  }

  render() {
    const { keyCheck, onCancel, onConfirm, ...otherProps } = this.props;

    const keyCheckFn = keyCheck || (e => e.keyCode === 13); // ENTER

    const onKeyDown = e => {
      const { value } = e.target;
      this.setState({ value });

      const check = keyCheckFn(e);
      if(check)
        onConfirm(value, e);

      if(keyRules.escape(e))
        onCancel(value, e);
    };

    return (
      <Styles>
        <div className="mode-label">
          {this.props.children}
        </div>

        <TextRange
          ref={el => (this.textRange = el)}
          autoFocus
          value={this.state.value}
          onChange={e => this.setState({ value: e.target.value })}
          onKeyDown={onKeyDown}
          {...otherProps}
        />

        <button type="button" className="btn btn-primary" onClick={e => onConfirm(this.state.value, e)}>
          <i className="fa fa-check" aria-hidden="true"/>
        </button>
      </Styles>
    );
  }
}

export default TextRangeEntry;
