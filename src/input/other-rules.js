import { Rules, rules as coreRules } from '../core/rules';
import { A_KEYCODE, rules as keyRules, ZERO_KEYCODE } from '../input/rules';

const simpleKeyCodes = {};

for(let i = ZERO_KEYCODE; i < ZERO_KEYCODE + 10; i++) // 0 to 9
  simpleKeyCodes[i] = true;
for(let i = A_KEYCODE; i < A_KEYCODE + 26; i++) // A to Z
  simpleKeyCodes[i] = true;

export const appRules = {
  bodyFocus: e => e.target === document.body,
  simpleKey: e => e.keyCode in simpleKeyCodes
};

export const rules = Rules({
  ...coreRules,
  ...keyRules,
  ...appRules
});
rules.union('left up right down', 'arrow');
