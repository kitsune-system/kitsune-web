import _ from 'lodash';

const A = 65;
const letterModules = {};

for(let i = A; i < A + 26; i++) {
  const letter = String.fromCharCode(i).toLowerCase();
  letterModules[letter] = keyCode(i);
}

export const defaultModules = {
  ...letterModules,

  tab: keyCode(9),
  enter: keyCode(13),
  escape: keyCode(27),
  space: keyCode(32),

  left: keyCode(37),
  up: keyCode(38),
  right: keyCode(39),
  down: keyCode(40),

  '+shift': e => e.shiftKey,
  '-shift': e => !e.shiftKey,
  '+ctrl': e => e.ctrlKey,
  '-ctrl': e => !e.ctrlKey,
  '+alt': e => e.altKey,
  '-alt': e => !e.altKey,
  '+meta': e => e.metaKey,
  '-meta': e => !e.metaKey,

  '!prevent': e => {
    e.preventDefault();
    return true;
  }
};

export function keyCode(kCode) {
  return e => e.keyCode === kCode;
}

export default function KeySwitch(m) {
  const modules = m || defaultModules;

  let handerIdCount = 0;
  const handlers = {};

  const on = (modStr, handler) => {
    const modList = modStr.split(' ');
    const mods = modList.map(modName => {
      const mod = modules[modName];

      if(mod === undefined)
        throw new Error(`Invalid module name: ${modName}`);

      return mod;
    });

    const h = e => {
      const check = _.every(mods, mod => mod(e));
      if(check)
        handler(e);
    };

    const handlerId = ++handerIdCount;
    handlers[handlerId] = h;

    return () => delete handlers[handlerId];
  };

  const handle = e => _.each(handlers, handler => handler(e));

  return { on, handle };
}
