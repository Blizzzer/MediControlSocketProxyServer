var socket = io.connect('http://localhost:4200');

var start = document.getElementById('start');
var stop = document.getElementById('stop');
var stateVariable = false;

start.addEventListener('click', async () => {
    var data = document.getElementById('input').value;
    stateVariable = true;
    while (stateVariable) {
        socket.emit('sending', {
            data: data
        });
        await sleep(200);
    }
});

socket.on('sending', (data) => {
    document.getElementById('data').innerHTML += '<p>' + data.data + '</p>';
});

stop.addEventListener('click', () => {
    stateVariable = false;
})

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}