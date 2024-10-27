const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();
const mongoose = require('mongoose');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const server = http.createServer(app); // Crear el servidor HTTP
const io = new Server(server); // Solo declaramos `io` una vez como servidor

io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');
    socket.on('mensaje', (data) => {
        console.log('Mensaje recibido:', data);
        socket.emit('respuesta', 'Mensaje recibido en el servidor');
    });
});


// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Error connecting to MongoDB:', error));

// Middleware para parsear JSON
app.use(express.json());

// Configurar Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Personajes',
            version: '1.0.0',
            description: 'API para gestionar personajes de One Piece',
        },
        servers: [{ url: 'http://localhost:3000' }],
    },
    apis: ['./routes/itemRoutes.js'],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.get('/', (req, res) => {
    res.send('API de One Piece está funcionando!');
});

// Configurar rutas
const itemRoutes = require('./routes/itemRoutes');
const testweb = require('./client');
app.use('/api/items', itemRoutes);
app.use('/api/websocket', test.h);

// No necesitas conectar como cliente Socket.IO aquí
// socket.on('connect', () => {
//     console.log('Conectado al servidor Socket.IO');
// });

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/api/items`);
    console.log(`Server DocSwagger on http://localhost:${PORT}/api-docs/`);
});
