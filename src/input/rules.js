export const ZERO_KEYCODE = 48;
export const A_KEYCODE = 65;

export function keyCode(kCode) {
  return e => e.keyCode === kCode;
}

export const rules = {
  backtick: keyCode(192),
  tab: keyCode(9),
  enter: keyCode(13),
  escape: keyCode(27),
  space: keyCode(32),

  left: keyCode(37),
  up: keyCode(38),
  right: keyCode(39),
  down: keyCode(40)
};

// Auto-populate modifier key rules
['shift', 'ctrl', 'alt', 'meta'].forEach(mod => {
  rules[mod] = e => e[`${mod}Key`] === true;
});

// Auto-populate number key rules
for(let i = ZERO_KEYCODE; i < ZERO_KEYCODE + 10; i++) {
  const number = i - ZERO_KEYCODE;
  rules[number] = keyCode(i);
}

// Auto-populate letter key rules
for(let i = A_KEYCODE; i < A_KEYCODE + 26; i++) {
  const upperLetter = String.fromCharCode(i);
  const lowerLetter = upperLetter.toLowerCase();

  rules[upperLetter] = keyCode(i);
  rules[lowerLetter] = rules[upperLetter];
}

// Aliases
rules.control = rules.ctrl;
rules.esc = rules.escape;
