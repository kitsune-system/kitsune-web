import React from 'react';
import PropTypes from 'prop-types';

import TextRange from '../../components/text-range/index';

export default function TextRangeEntry({ label, onKeyDown, onConfirm }) {
  const result = class extends React.Component {
    focus() {
      this.textRange.focus();
    }

    render() {
      const { value, onChange } = this.props;

      return (
        <div className="entry-box">
          <div className="mode-label">
            {label}
          </div>

          <TextRange ref={el => (this.textRange = el)} value={value} onChange={onChange} onKeyDown={onKeyDown}/>

          <button className="btn btn-primary" onClick={onConfirm}>
            <i className="fa fa-check" aria-hidden="true"/>
          </button>
        </div>
      );
    }
  };
  result.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  return result;
}
