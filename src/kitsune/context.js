import React, { createContext, useContext, useEffect, useState } from 'react';

export const SystemContext = createContext();

export const Provider = ({ children, register }) => (
  // FIXME: Rename register
  <SystemContext.Provider value={register}>
    {children}
  </SystemContext.Provider>
);

export const connectOn = config => {
  // Config
  let systemIdPropName = 'systemId';
  let rename = {};

  if(typeof config === 'string') {
    systemIdPropName = config;
  } else if(typeof config === 'object') {
    systemIdPropName = config.systemIdPropName ? config.systemIdPropName : systemIdPropName;
    rename = config.rename ? config.rename : rename;
  }

  return Component => props => {
    const [values, setValues] = useState({});
    const update = delta => setValues(values => ({ ...values, ...delta }));

    const register = useContext(SystemContext);
    if(!register)
      throw Error('SystemContext not found. Make sure a SystemContext.Provider exists higher in the heirarchy.');

    const systemId = props[systemIdPropName];
    if(systemId) {
      useEffect(() => {
        return register({
          input: systemId,
          onOutput: values => {
            const namedValues = {};

            // Rename
            Object.entries(values).forEach(([name, value]) => {
              if(name in rename)
                name = rename[name];

              namedValues[name] = value;
            });

            update(namedValues);
          },
          onError: error => {
            throw new Error(`Register error: ${JSON.stringify(error)}`);
          },
        });
      }, [systemId, props]);
    }

    return <Component {...values} {...props}/>;
  };
};

export const connect = connectOn();
