import _ from 'lodash';
import { Reducer } from '../store/redux-utils';

const reducer = Reducer({
  SET_ACTIVE_VIEW: (state, action) => {
    const { activeView } = action;
    return { ...state, activeView };
  },
  SWITCH_FOCUS: state => {
    const activeView = state.children.vsplit.activeView === 'left' ? 'right' : 'left';
    return _.merge({}, state, { children: { vsplit: { activeView } } });
  }
}, {
  activeView: null,
  children: {
    vsplit: {
      activeView: 'left',
      children: { left: 'test', right: 'test2' }
    }
  }
});
export default reducer;

