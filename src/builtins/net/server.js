const net = require('net');
const { Transform } = require('stream');

const server = net.createServer();

server.on('connection', (socket) => {
  console.log('\n\n=======Client connected========');
  console.log('\nClient address: ', socket.remoteAddress);
  console.log('\nClient port: ', socket.remotePort);

  socket.write('\nWelcome to the server\n');
  const toUpper = new Transform({
    transform(chunk, enc, callback) {
      this.push(chunk.toString().toUpperCase());
      callback();
    },
  });
  socket.pipe(toUpper).pipe(socket);
});

server.listen('9000', () => {
  console.log('Server listening on: ', server.address());
});
