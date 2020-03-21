import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';
import styled from 'styled-components';

import { connectOn } from './context';

const Styles = styled.div`
  h2 {
    color: red;
    font-family: monospace;
  }
`;

export const Console = props => {
  // console.log('P', props);
  const { count, entry, increment } = props;

  const [input, setInput] = useState('100');

  const onClick = () => {
    const incCount = parseInt(input, 10);
    if(!Number.isNaN(incCount))
      increment(incCount);
  };

  return (
    <Styles>
      <h1>Count: {count}</h1>
      <h2>Entry: &lt;{entry}&gt; </h2>
      <input type="text" value={input} onChange={e => setInput(e.currentTarget.value)}/>
      <button type="button" onClick={onClick}>Bump</button>
    </Styles>
  );
};

export default hot(connectOn({
  rename: {
    bump: 'increment',
    onCount: 'count',
    onEntry: 'entry',
  },
})(Console));
