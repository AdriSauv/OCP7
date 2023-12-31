const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/user');
const bookRoutes = require('./routes/book');
const path = require('path');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');



mongoose.connect('mongodb+srv://adrien:Crucified62@laegh.plnxqpb.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
    
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use(mongoSanitize());
app.use(helmet());
app.use(helmet({ crossOriginResourcePolicy: { policy: "same-site" } }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api/auth/', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;