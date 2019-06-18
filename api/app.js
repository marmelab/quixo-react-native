const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const { PORT } = require('./constants/api');
const createNewGame = require('./app/createNewGame');

const listenerSocketIO = (socket) => {
  socket.on('new-game', () => createNewGame().then(game => socket.emit('new-game-reply', game)));
};

app.get('/', (req, res) => {
  res.send('Hello World!');
});

http.listen(PORT, () => {});

io.on('connection', socket => listenerSocketIO(socket));
