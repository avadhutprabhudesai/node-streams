const net = require('net');

const clientSocket = net.createConnection({ port: 9000 });

clientSocket.write('A client trying to connect to server on port 9000');

clientSocket.on('data', (data) => {
  console.log('\n\n=====Data received');
  console.log(data.toString());
});
