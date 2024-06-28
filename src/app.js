require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const fs = require("fs");
const YAML = require('yaml');
const path = require('path');

const file = fs.readFileSync('./swagger.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

const router = require('./routes');
app.use('/api', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 404 handler
app.use((req, res, next) => {
    res.status(404).json({
        status: false,
        message: `Sorry, can't find the route ${req.originalUrl}`,
        error: null,
        data: null
    });
});

// 500 handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: false,
        message: 'Something broke!',
        error: err.message,
        data: null
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('listening on port', PORT))

