const keyCodes = [];

for(let i = 65; i < 91; i++)
  keyCodes.push(`Key${String.fromCharCode(i)}`);
for(let i = 0; i < 10; i++)
  keyCodes.push(`Digit${i}`);
for(let i = 0; i < 10; i++)
  keyCodes.push(`Numpad${i}`);

export default keyCodes;
