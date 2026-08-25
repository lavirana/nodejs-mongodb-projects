const express = require('express');
const urlRoute = require('./routes/url');
const { connectToMongoDB } = require("./connect");
const URL = require('./models/url');
const staticRoute = require('./routes/staticRouter'); 
const userRoute = require('./routes/user');
const path = require('path');
const cookieParser = require('cookie-parser');
const {checkForAuthentication , restrictTo} = require('./middlewares/auth');

const app = express();
const PORT =  8001;


connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
.then(() => console.log('Mongo DB Connected')
);

app.set("view engine", "ejs");
app.set('views', path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded( {extended : false}));
app.use(cookieParser());
app.use(checkForAuthentication);

app.get("/test", async (req, res) => {
    const allUrls = await URL.find({});
    return res.render('home', {
        urls: allUrls,
    });
});

app.use("/url", restrictTo(['NORMAL']), urlRoute);
app.use("/", staticRoute);
app.use("/user", userRoute);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, { $push : {
        visitHistory:  { 
            timestamp: Date.now(),
        },
    },  
  }
);
res.redirect(entry.redirectURL);
});



app.listen(PORT, () => console.log(`Server Started at PORT : ${PORT}`));


/*
sudo mkdir -p /usr/local/mongodb/data/db
sudo chown -R $(whoami) /usr/local/mongodb/data
mongod --dbpath /usr/local/mongodb/data/db
*/