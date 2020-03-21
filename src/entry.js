import { Pipe } from '@kitsune-system/common';

export const Entry = () => {
  const [output, onOutput] = Pipe();

  let value = '';
  const input = ({ input, onOutput }) => {
    let handled = true;

    if(/Key./.test(input)) {
      const char = input.substr(3, 1);
      value += char;

      output(value);
    } else if(input === 'Space') {
      value += ' ';
      output(value);
    } else if(input === 'Backspace') {
      value = value.slice(0, value.length - 1);
      output(value);
    } else {
      handled = false;
    }

    onOutput(handled);
  };

  return { input, onOutput };
};
