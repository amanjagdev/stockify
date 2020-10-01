require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

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
  error => {
    if (error) throw error; // Handle failed connection
    console.log('Database connected  ' + mongoose.connection.readyState);
  },
);

// LISTENING TO PORT
app.listen(port, (req, res) => {
  console.log(`Server has started at port ${port}`);
});
