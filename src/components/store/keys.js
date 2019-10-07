import React, { useEffect, useState } from 'react';

import { build } from '../../kitsune';

export const Keys = () => {
  const keyboard = build('keyboard');

  const [keys, setKeys] = useState({ ...keyboard() });
  useEffect(() => keyboard.output.change(() => setKeys({ ...keyboard() })), []);

  const keyList = Object.entries(keys).filter(([_, value]) => value()).map(([code]) => code);
  const keyJSON = JSON.stringify(keyList, null, 2);

  return <pre>{keyJSON}</pre>;
};
