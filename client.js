const WebSocket = require('ws');
const ws = new WebSocket('wss://api-onepiece-6m7v.onrender.com');

ws.on('open', () => {
    console.log('Conexión WebSocket establecida');
    ws.send('Mensaje de prueba');
});

ws.on('message', (data) => {
    console.log('Mensaje recibido del servidor:', data);
});

ws.on('error', (error) => {
    console.error('Error en WebSocket:', error);
});

ws.on('close', () => {
    console.log('Conexión WebSocket cerrada');
});
