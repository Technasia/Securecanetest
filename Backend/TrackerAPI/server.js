const express = require("express");
const bodyParser = require("body-parser");

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const cors = require("cors");
const dotenv = require('dotenv');
const app = express();

var swaggerOptions = {
    explorer: true
};
  

let corsOptions = {
    origin: "*"
};
dotenv.config();
app.use(cors(corsOptions));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.send("Welcome to the app.");
});
// set port, listen for requests
const PORT = process.env.PORT || 4000;

// routes
require("./routes/tracker.routes.js")(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
