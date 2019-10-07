import { useState } from 'react';

const linkState = initState => {
  const [value, setter] = useState(initState);
  return val => val === undefined ? value : setter(val);
};

export default linkState;
