import React, { createContext } from 'react';

const defaultContext = 'NO CONTEXT!!';

export const SystemContext = createContext(defaultContext);

export const bindSystem = (Component, name = 'system') => props => (
  <SystemContext.Consumer>
    {system => <Component {...{ [name]: system }} {...props}/>}
  </SystemContext.Consumer>
);
