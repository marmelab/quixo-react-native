const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const { PORT } = require('./constants/api');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

http.listen(PORT, () => {
  console.log('Example app listening on port 3000!');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('get-empty-board', () => socket.emit('Not yet !'));
});
