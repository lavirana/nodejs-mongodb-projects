const express = require('express');
const colors = require('colors');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');


//dot env configuration
dotenv.config();

//rest object
 const app = express();

 //middlewares
 app.use(cors());
 app.use(express.json());
 app.use(morgan('dev'));


//route
//http://localhost:8000
app.use('/api/v1/test', require('./routes/testRoutes'));


app.get('/', (req, res) => {
    return res.status(200).send("<h2>Welcome to Food Server</h2>");
});

//PORT
const PORT = process.env.PORT || 8000;

//listen
app.listen(PORT, () => {
    console.log('Server Running'.bgMagenta.bgCyan);
})