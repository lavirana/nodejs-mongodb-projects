import express from 'express';
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors';


//PORT
const PORT = 9090;

//rest object
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//Route
app.get('/test',(req, res) => {
    return res.status(200).send("<h2>Hello</h2>");
});

//listen    
app.listen(PORT, () => {
    console.log('Server Running Yo'.bgGreen.bgYellow);
});