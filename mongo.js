const mongoose = require('mongoose');
require('dotenv').config();

const mongoUri = process.env.MONGO_URI;

// Intenta conectar sin `useNewUrlParser` ni `useUnifiedTopology`
mongoose.connect(mongoUri)
  .then(() => console.log('Conectado a MongoDB'))
  .catch((error) => console.error('Error conectando a MongoDB:', error));

module.exports = mongoose;
