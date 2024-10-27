const io = require('socket.io-client');
const socket = io('http://localhost:3000');

socket.on('connect', () => {
    console.log('Conectado al servidor');
    socket.emit('mensaje', 'Hola desde el cliente');
});

socket.on('respuesta', (data) => {
    console.log('Respuesta del servidor:', data);
    socket.disconnect();
});
