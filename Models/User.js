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
  warehouseNo : {
    type : Number
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
      },
      stockOwner : {
        type : String
      }
    }
  ]
});

module.exports = mongoose.model("user", userSchema);
