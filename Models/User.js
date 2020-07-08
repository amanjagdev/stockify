const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  stockData : [
    {
      name : {
        type : String
      },
      quantity : {
        type : Number
      },
      price : {
        type : Number
      }
    }
  ]
});

module.exports = mongoose.model("user", userSchema);
