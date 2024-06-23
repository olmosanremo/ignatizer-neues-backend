

// **********************************************************************

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const synthDataRoutes = require('./src/routes/routesSynthData');
const projectsRoutes = require('./src/routes/routesProject');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
console.log("Body-Parser-Middleware aktiviert"); // Überprüfung der Middleware-Aktivierung

// MongoDB Verbindung
mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Routen
app.use('/api/synthdata', synthDataRoutes);
console.log("synthData-Router verwendet"); // Überprüfung der Router-Einbindung
app.use('/api/projects', projectsRoutes);
console.log("projects-Router verwendet"); // Überprüfung der Router-Einbindung

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});






