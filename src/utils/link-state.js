import { useState } from 'react';

const linkState = initState => {
  // TODO: Resove this
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [value, setter] = useState(initState);
  return val => val === undefined ? value : setter(val);
};

export default linkState;
