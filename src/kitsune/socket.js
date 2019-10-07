import { Split } from '@gamedevfox/katana';

export const Socket = socketUrl => {
  const pending = [];
  let send = msg => pending.push(msg);

  const [input, output] = Split();

  const webSocket = new WebSocket(socketUrl);

  const socket = (action, data) => {
    const actionStr = JSON.stringify([action, data]);
    send(actionStr);
  };

  webSocket.addEventListener('open', () => {
    console.log('[Connected to WebSocket server]');

    send = msg => webSocket.send(msg);
    pending.forEach(msg => send(msg));
  });
  webSocket.addEventListener('message', event => {
    const msg = JSON.parse(event.data);
    input(msg);
  });

  socket.output = output;

  return socket;
};
