import debug from 'debug';
import http  from 'http';
import https from 'https';
import SocketIO from 'socket.io';
import * as fs from 'fs';
import app from './app';

/**
 * Get port from environment and store in Express.
 */
const port = parseInt(process.env.PORT) || 3000;
app.set('port', port);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/matchmaking.fer.hr/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/matchmaking.fer.hr/fullchain.pem'),
};

const server = http.createServer(
  function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
 }
);
const sServer = https.createServer(options, app);

// socket 
export const io = new SocketIO(sServer);
io.on('connection', () => {
  console.log('Client connected!');
});

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(80);
sServer.listen(443);
console.log('Server is running!');
server.on('error', onError);
server.on('listening', onListening);
