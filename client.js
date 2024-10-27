const WebSocket = require('ws');
const PORT = process.env.PORT || 8080; // Asegúrate de que PORT se obtiene de process.env

const server = require('http').createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Cliente conectado');
    ws.send('Conexión establecida con el servidor');
    
    ws.on('message', (message) => {
        console.log('Mensaje recibido:', message);
    });

    ws.on('close', () => {
        console.log('Cliente desconectado');
    });
});

server.listen(PORT, () => {
    console.log(`Servidor WebSocket escuchando en el puerto ${PORT}`);
});
