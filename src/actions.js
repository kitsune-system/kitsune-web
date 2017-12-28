import KitsuneService from './app/kitsune-service';
import { COMMAND_MODE, STRING_MODE, TEXT_MODE } from './app/entry-box/entry-box';

const kitsuneService = KitsuneService('http://localhost:9292/');

const build = store => {
  const addNode = node => ({ type: 'ADD_NODE', node });

  const writeString = string => {
    kitsuneService.writeString(string).then(hash => {
      console.log(`Hash for "${string}": ${hash}`);
      store.dispatch(addNode({ id: hash, string }));
    });
  };

  const confirmFnMap = {};
  confirmFnMap[COMMAND_MODE] = command => console.log('EXECUTE:', command);
  confirmFnMap[STRING_MODE] = text => writeString(text);
  confirmFnMap[TEXT_MODE] = text => writeString(text);

  const setMode = (mode, text) => {
    const action = { type: 'SET_MODE', mode };

    if(text)
      action.text = text;

    return action;
  };

  const confirmEntry = () => {
    const { mode, entry } = store.getState();
    const confirmFn = confirmFnMap[mode];
    confirmFn(entry);

    return setMode(null);
  };

  const setEntry = entry => ({ type: 'SET_ENTRY', entry });

  return { confirmEntry, setEntry, setMode };
};

export default build;

