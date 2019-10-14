import React, { useEffect, useState } from 'react';

export const Keys = ({ keyboard }) => {
  const [keys, setKeys] = useState({ ...keyboard() });
  useEffect(() => keyboard.output.change(() => setKeys({ ...keyboard() })), []);

  const keyList = Object.entries(keys).filter(([_, value]) => value()).map(([code]) => code);
  const keyJSON = JSON.stringify(keyList, null, 2);

  return <pre>{keyJSON}</pre>;
};
