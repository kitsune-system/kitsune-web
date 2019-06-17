import React, { useRef } from 'react';
import { Button, Input } from 'semantic-ui-react';

const CopyInput = props => {
  const inputEl = useRef(null);

  const copy = () => {
    inputEl.current.select();
    document.execCommand('copy');
  };

  const action = <Button icon="copy outline" onClick={copy}/>;
  return <Input ref={inputEl} action={action} {...props}/>;
};

export default CopyInput;
