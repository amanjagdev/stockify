const express = require("express");
const app = express();
const path = require('path')
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

var port = process.env.PORT || 8000;

// CONNECTION OF DATABASE WITH MONGOOSE
mongoose.connect(
  process.env.DATABASE,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  function (error) {
    if (error) throw error; // Handle failed connection
    console.log("Database connected  " + mongoose.connection.readyState);
  }
);

// ROUTES AS MIDDLEWARES
app.use("/api", require("./Routes/user"));
app.use("/stocks", require("./Routes/stocks"));

//Serving react
app.use(express.static(path.join(__dirname,'client', 'build')))
app.get('*',(req,res) => {
  res.sendFile(path.join(__dirname,'client', 'build', 'index.html'))
})

// LISTENING TO PORT
app.listen(port, (req, res) => {
  console.log(`Server has started at port ${port}`);
});

