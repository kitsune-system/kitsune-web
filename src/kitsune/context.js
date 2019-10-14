import React, { createContext } from 'react';

const defaultContext = 'NO CONTEXT!!';

export const SystemContext = createContext(defaultContext);
export const Provider = ({ children, system }) => (
  <SystemContext.Provider value={system}>
    {children}
  </SystemContext.Provider>
);

export const bind = (Component, bind = {}) => props => {
  const bindSystems = system => {
    const systems = {};

    Object.entries(bind).forEach(([name, systemId]) => {
      systems[name] = (input, output) => {
        system(systemId, sys => sys(input, output));
      };
    });

    return systems;
  };

  return (
    <SystemContext.Consumer>
      {system => <Component {...bindSystems(system)} {...props}/>}
    </SystemContext.Consumer>
  );
};
