const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const userRoutes = require('./routes/user');
app.use('/api/auth', userRoutes);

const { cors } = require('./middleware/cors');
app.use(cors);

mongoose.connect('mongodb+srv://adrien:Crucified62@laegh.plnxqpb.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


module.exports = app;