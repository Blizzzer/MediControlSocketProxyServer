var express = require('express');
var socket = require('socket.io');
var clientIo = require('socket.io-client');
const port = 4200;
var app = express();

var server = app.listen(port, () => {
    console.log('Medicontrol Server is listening at port:', port);
})

app.use(express.static('public'));

var io = socket(server);
var clientSocket = clientIo.connect('http://localhost:3000');
var currentData = [];
var currentIds = [];
var counter = 0;

io.on('connection', (socket) => {
    console.log('Device number', socket.id, ' has successfully connected to the Medicontrol Server');
    currentIds[counter] = socket.id;
    counter++;

    socket.on('sending', function(data) {
        currentData[currentIds.indexOf(socket.id)] = data.data;
        console.log(currentIds, currentData);
        socket.emit('sending', data);
        clientSocket.emit('sending', data);
    });
});
