const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

http.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('get-empty-board', () => socket.emit('Not yet !'));
});
