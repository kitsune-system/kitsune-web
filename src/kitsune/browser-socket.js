import { Split } from '@gamedevfox/katana';

export const BrowserSocket = socketUrl => {
  const pending = [];
  let send = msg => pending.push(msg);

  const [input, output] = Split();

  const webSocket = new WebSocket(socketUrl);

  const socket = msg => {
    const msgStr = JSON.stringify(msg);
    send(msgStr);
  };

  webSocket.addEventListener('open', () => {
    console.log('[[ Connected to WebSocket server ]]');

    send = msg => webSocket.send(msg);
    pending.forEach(msg => send(msg));
  });
  webSocket.addEventListener('message', ({ data }) => {
    const msg = JSON.parse(data);
    input(msg);
  });

  socket.output = output;

  return socket;
};
