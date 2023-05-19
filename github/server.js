if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index.js");

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser : true, useUnifiedTopology: true })
.then(() => {
    console.log('Connected to MongoDB');
    // Rest of your server setup and code goes here
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
app.use("/", indexRouter);

const port = 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});