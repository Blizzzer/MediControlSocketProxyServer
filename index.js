var express = require('express');
var socket = require('socket.io');
const port = 3000;
var app = express();

var server = app.listen(port, () => {
    console.log('Medicontrol Server is listening at port:', port);
})

app.use(express.static('public'));

var io = socket(server);    


io.on('connection', (socket) => {
    console.log('Device number', socket.id, ' has successfully connected to the Medicontrol Server');

    socket.on('sending', function(data) {
        console.log(JSON.stringify(data));
        socket.emit('sending', data);
    });
});