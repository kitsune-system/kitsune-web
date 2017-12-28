import './entry-box.scss';

import React from 'react';
import PropTypes from 'prop-types';

import TextRange from '../text-range/text-range';

const COMMAND_MODE = 'command';
const STRING_MODE = 'string';
const TEXT_MODE = 'text';

const handleConfirm = (self, e, requireShift = false) => {
  const shiftCheck = !requireShift || e.shiftKey;
  if(e.keyCode === 13 && shiftCheck) { // ENTER
    e.preventDefault();
    self.props.onConfirm();
  }
};

const handleCancel = (self, e) => {
  if(e.keyCode === 27) { // ESCAPE
    e.preventDefault();
    self.props.onModeChange(null);
  }
};

const handleToggle = (self, e) => {
  if(e.keyCode === 32 && self.props.value.length === 0) { // SPACE
    e.preventDefault();

    const mode = (self.props.mode === STRING_MODE ? TEXT_MODE : STRING_MODE);
    self.props.onModeChange(mode);
  }
};

const modes = {};
modes[COMMAND_MODE] = {
  label: <i className="fa fa-terminal" aria-hidden="true"/>,
  onKeyDown: (self, e) => {
    handleConfirm(self, e);
    handleCancel(self, e);
  }
};
modes[STRING_MODE] = {
  label: <i className="fa fa-quote-right" aria-hidden="true"/>,
  onKeyDown: (self, e) => {
    handleConfirm(self, e);
    handleCancel(self, e);

    handleToggle(self, e);
  }
};
modes[TEXT_MODE] = {
  label: <i className="fa fa-file-text-o" aria-hidden="true"/>,
  onKeyDown: (self, e) => {
    handleConfirm(self, e, true);
    handleCancel(self, e);

    handleToggle(self, e);
  }
};

class EntryBox extends React.Component {
  focus() {
    this.textRange.focus();
  }

  render() {
    const { mode, value } = this.props;
    const { label, onKeyDown } = modes[mode];

    return (
      <div className="entry-box">
        <div className="mode-label">{label}</div>

        <TextRange ref={el => this.textRange = el}
          value={value} onChange={e => this.props.onChange(e)}
          onKeyDown={e => onKeyDown(this, e)}/>

        <button className="btn btn-primary" onClick={() => this.props.onConfirm()}>
          <i className="fa fa-check" aria-hidden="true"/>
        </button>
      </div>
    );
  }
}

EntryBox.propTypes = {
  mode: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,

  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
};

export default EntryBox;
export { COMMAND_MODE, STRING_MODE, TEXT_MODE };
