import './text-range-entry.scss';

import React from 'react';
import TextRange from '../../components/text-range/index';
import { rules as keyRules } from '../../input/rules';

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
      <div className="text-range-entry">
        <div className="mode-label">
          {this.props.children}
        </div>

        <TextRange
          ref={el => (this.textRange = el)}
          {...otherProps}
          onChange={e => this.setState({ value: e.target.value })}
          onKeyDown={onKeyDown}
          value={this.state.value}
          autoFocus
        />

        <button className="btn btn-primary" onClick={e => onConfirm(this.state.value, e)}>
          <i className="fa fa-check" aria-hidden="true"/>
        </button>
      </div>
    );
  }
}

export default TextRangeEntry;
