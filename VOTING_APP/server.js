const express = require('express');
const app = express();
//require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;




app.get('/', (req, res) => {
    res.send('Hello World');
});

const userRoutes = require('./routes/userRoutes');

//use the routers
app.use('./user',userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});